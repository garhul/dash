import { v4 as uuid } from 'uuid';
import { Devices } from '../services/store';
import { timedPromise } from '../utils';
import { getTaggedLogger } from '../services/logger';
import { getClient as getMQTTClient } from '../services/mqtt'
import { announcementPayload, birthAnouncementPayload, deathAnouncementPayload, deviceData, stateChangeAnnouncementPayload } from '../types/types';
import { getConfig } from '../config';

import { send } from '../services/ws';

const logger = getTaggedLogger('PROVIDERS::Devices');

let _scanning = false;

export function isScanning(): boolean {
  return _scanning;
}

function isDeviceInfoValid(info: deviceData): boolean {
  return (
    info.topic !== undefined
    && info.human_name !== undefined
    && info.device_id !== undefined
  );
};

/** 
 * Updates the state of a registered device
 */
function updateState(payload: stateChangeAnnouncementPayload) {
  try {
    const dev = Devices.get(payload.id);
    if (dev === null) throw new Error(`Device with id ${payload.id} not found`);
    dev.state = {
      spd: payload.spd,
      br: payload.br,
      size: payload.size,
      fx: payload.fx,
      mode: payload.mode
    };
    Devices.set(payload.id, dev);
  } catch (e) {
    logger.error(`Error updating state of device ${payload.id} payload:`, payload);
    logger.error(e);
  }
}

//Handler for when a device goes down (last will)
function handleDeath(payload: deathAnouncementPayload) {
  logger.info(`Device will executed for device_id [${payload.id}]`);
  Devices.del(payload.id);
}

//Handler for when a device comes online
async function handleBirth(payload: birthAnouncementPayload) {
  const data = await queryDevice(payload.ip);
  if (data !== null) Devices.set(data.device_id, data);
}

/**
 * Handles a devices announcement message
 * 
 */
export async function handleAnnouncement(msg: string) {
  logger.debug(`announcement broadcast received: [${msg}]`);
  try {
    const payload: announcementPayload = JSON.parse(msg);
    const event = payload.ev;
    switch (event) {
      case 'stateChange':
        updateState(payload);
        break;
      case 'birth':
        await handleBirth(payload);
        break;
      case 'death':
        handleDeath(payload);
        break;

      default:
        throw new Error(`Unexpected message event ${event}`);
    }
  } catch (e) {
    logger.error(e);
  }
}

export async function scan() {

  if (isScanning()) {
    logger.warn('scanning already in progress');
    return;
  }
  _scanning = true;

  // TODO:: send a state update on devices being scanned to all clients
  // send('DEVICES.') //

  const baseScanAddress = getConfig('base_scan_addr') as string;
  const scanBatchSize = getConfig('scan_batch_size') as number;
  const scanTimeout = getConfig('scan_timeout') as number;

  let spawnedFuncs = 0;
  const queries = [];

  for (let i = 1; i < 255; i++) {
    const ip = `${baseScanAddress}${i}`;

    const fn = async () => {
      try {
        const d = await queryDevice(ip);
        return d as deviceData;
      } catch (ex) {
        logger.warn(ex);
        return null;
      }
    };

    queries.push(
      timedPromise<deviceData | null>(fn(), scanTimeout)
        .catch(ex => { if (ex.message !== 'Timed out') logger.warn(ex.message) })
        .finally(() => spawnedFuncs--)
    );

    spawnedFuncs++;

    if (spawnedFuncs >= scanBatchSize)
      await Promise.any(queries);

  }

  const data = (await Promise.all(queries)).filter(d => d !== null && d !== undefined);

  Devices.addBatch(data.map(v => [v!.device_id, v!]));

  _scanning = false;
}

async function queryDevice(ipAddr: string): Promise<deviceData | null> {
  try {
    const infoAddr = `http://${ipAddr}/info`;
    const stateAddr = `http://${ipAddr}/state`;

    const res = await fetch(infoAddr);
    const data = await res.json();

    if (isDeviceInfoValid(data)) {
      const state = await (await fetch(stateAddr)).json();
      logger.info(`Found device at ip ${ipAddr}`);
      return {
        ...data,
        ...{ state: await state },
        stateString: JSON.stringify(state),
        infoString: JSON.stringify(res)
      } as deviceData;

    } else {
      logger.warn(`Found device at ip ${ipAddr} with invalid info json`);
    }
  } catch (err) {
    if (err.code && [
      'EHOSTUNREACH',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'UND_ERR_CONNECT_TIMEOUT'
    ].includes(err.code) || err.type === 'invalid-json') {
      logger.warn(err);
    }
  }

  return null;
}

function getMockDevice(): deviceData {
  const br = 5 + Math.ceil(Math.random() * 80);
  const spd = 5 + Math.ceil(Math.random() * 80);
  const length = 5 + Math.ceil(Math.random() * 100);

  return {
    ssid: '_mock ssid_',
    ap_ssid: '_mock_ap_ssid_${uuid()}',
    human_name: `Mock device ${uuid()}}`,
    announce_topic: getConfig('mqtt.announce_topic') as string,
    device_id: `mok_dev${uuid()}`,
    broker: '192.168.1.10',
    topic: 'mock/topic',
    build: 'v0.1.42 - 2020-10-31 19:36:47.426951',
    use_mqtt: true,
    strip_size: length,
    ip: `192.168.1.${10 + Math.ceil(Math.random() * 50)}`,
    state: { "br": br, "spd": spd, "fx": 2, "mode": 2, "size": length }
  }
}

if (getConfig('scan_on_start')) scan();

if ((getConfig('mock_devices') as number) > 0) {
  setTimeout(() => {
    logger.info(`Adding ${getConfig('mock_devices')} mock devices`);
    const mockdevs: [string, deviceData][] = [];

    for (let i = 0; i < (getConfig('mock_devices') as number); i++) {
      const d = getMockDevice();
      mockdevs.push([d.device_id, d]);
    }

    Devices.addBatch(mockdevs);
  }, 3000);
}

export async function issueCommand(deviceIds: string[], payload: string): Promise<void> {
  deviceIds.map(id => Devices.get(id).topic).forEach(topic => {
    logger.info(`Emitting ${payload} to ${topic}`);
    getMQTTClient().publish(topic, payload);
  });
}

export function del(deviceId: string): boolean {
  return Devices.del(deviceId);
}

export function get(deviceId: string) {
  return Devices.get(deviceId);
}

export function getAll() {
  return Devices.getAll();
}