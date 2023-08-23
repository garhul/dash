import { getConfig } from './config';
import { getClient, MQTTHandler } from './services/mqtt';
import { timedPromise } from './utils/';
import { DevicesProvider, SensorsProvider } from './providers';
import * as WebSocketServer from './services/ws';
import { Devices, Sensors } from './services/store';
// import { getTaggedLogger } from './services/logger';

// const logger = getTaggedLogger('MAIN:EventDispatcher');
/*** Unify websockets and MQTT events to interact with entities */

const handlers: MQTTHandler[] = [
  {
    topic: getConfig('mqtt.announce_topic') as string,
    fn: (_topic: string, payload: string) => {
      DevicesProvider.handleAnnouncement(payload);
    }
  },
  {
    topic: getConfig('mqtt.sensors_topic') as string,
    fn: (_toppic: string, payload: string) => {
      SensorsProvider.addData(payload);
    },
  }
];

const mqttClient = getClient(handlers);

WebSocketServer.init();

Devices.onChange((devices) => {
  WebSocketServer.send(null, { ev: 'DEVICES_UPDATE', data: devices.map(d => d[1]) });
});

Sensors.onChange((sensors) => {
  WebSocketServer.send(null, { ev: 'SENSORS_UPDATE', data: sensors.map(s => s[1]) });
});

export async function closeConnections() {
  return timedPromise(new Promise((res, _rej) => {
    WebSocketServer.close();

    mqttClient.end(false, res);
  }), 5000);
}

setInterval(() => {
  const randVal = () => (Math.random() * 100).toFixed(2);
  mqttClient.publish('sensors', JSON.stringify({ "data": { "t": randVal(), "h": randVal(), "p": randVal(), "vbat": randVal() }, "id": "Mockstation", "name": "Living Sensor" }));
}, 5000);