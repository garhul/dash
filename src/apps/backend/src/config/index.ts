import path from 'path';
export type Option = number | string | boolean;

const configDefaults = new Map<string, Option>([

  // server 
  ['server.port', parseInt(process.env.DASH_SV_PORT) || 1984],
  ['server.ws', parseInt(process.env.DASH_WS_PORT) || 3030],
  ['server.client_folder', process.env.DASH_CLIENT_FOLDER || './public'],

  // logger
  ['logger.level', process.env.DASH_LOG_LEVEL || 'debug'],
  ['logger.destination', process.env.DASH_LOG_PATH || 1], //defaults to stdout

  // storage
  ['store.groups', process.env.DASH_GROUPS_FILE || './data/controlGroups.json'],
  ['store.devices', process.env.DASH_DEVICES_FILE || './data/devices.json'],
  ['store.sensors', process.env.DASH_SENSORS_FILE || './data/sensors.json'],
  ['store.scheduler', process.env.DASH_SCHEDULER_FILE || './data/scheduler.json'],

  // MQTT
  ['mqtt.broker', process.env.DASH_MQTT_BROKER || 'mqtt://10.10.1.37',],
  ['mqtt.announce_topic', process.env.DASH_MQTT_ANNOUNCE_T || 'announce'],
  ['mqtt.sensors_topic', process.env.DASH_MQTT_SENSORS_T || 'sensors'],

  // sensors
  ['sensors.data_path', process.env.DASH_SENSORS_DATA_PATH || path.resolve(__dirname, '../data')],
  ['sensors.persist', process.env.DASH_SENSORS_PERSIST || true],
  ['sensors.recover_on_start', process.env.DASH_SENSORS_RECOVER || true],

  /* 
    Sets the window size to store timeseries data in mem, defaults to 144:
    
    144 points in 24 hours -> 10 min resolution
    144 points in 7 days -> 70 min resolution 
    144 points in 31 days ~> 5.1 hr resolution
    144 points in 1 Yr -> 2.5 days resolution 
  */
  ['sensors.timeseries_depth', parseInt(process.env.DASH_SENSORS_DEPTH) || 144],

  // misc
  ['scan_on_start', process.env.DASH_SCAN_ON_START || true], // scan for devices at startup
  ['mock_devices', parseInt(process.env.DASH_MOCK_DEVICES) || 3], // use 3 mocked devices for dev
  ['mock_sensors', parseInt(process.env.DASH_MOCK_SENSORS) || 2],
  ['base_scan_addr', process.env.DASH_BASE_SCAN_ADDR || '10.10.1.'],
  ['scan_batch_size', parseInt(process.env.DASH_SCAN_BATCH_SIZE) || 24],
  ['scan_timeout', parseInt(process.env.DASH_SCAN_TOUT) || 5000],
  ['env', process.env.DASH_ENV || 'dev'],
]);


export function getConfig(key: string): Option {
  //throw if key doesn't exist.
  const normalized_key = key.toLowerCase();
  if (!configDefaults.has(normalized_key)) throw new Error(`Invalid config key requested [${key}]`);

  return configDefaults.get(normalized_key);
}
