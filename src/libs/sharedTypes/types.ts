
/*
    { "ssid":"Vergafone",
      "ap_ssid":"desk",
      "human_name":"Desk",
      "announce_topic":"announce",
      "device_id":"Aurora_4a3f53",
      "broker":"10.10.1.46",
      "topic":"desk",
      "build":"v0.1.189 - 2022-12-08 02:04:55.060429",
      "use_mqtt":true,
      "strip_size":80,
      "ip":"10.10.1.11"
*/
export type deviceInfoPayload = {
  ssid: string;
  ap_ssid: string;
  human_name: string;
  announce_topic: string;
  device_id: string;
  broker: string;
  topic: string;
  build: string;
  use_mqtt: boolean;
  strip_size: number;
  ip: string;
}

export type device = deviceInfoPayload & {
  id: string;
  name: string;
  state: deviceStateData;
  stateString?: string;
  infoString?: string;
};

export enum deviceMode {
  'OFF' = 0,
  'PAUSED' = 1,
  'PLAYING' = 2
};

/*
From aurora firmware
will
  doc["ev"] = "death";
  doc["id"] = getDeviceId();
  doc["ip"] = WiFi.localIP().toString();

birth /announcement
  doc["ev"] = "birth";
  doc["id"] = getDeviceId();
  doc["ip"] = WiFi.localIP().toString();

infojson
  doc["ssid"] = ssid;
  doc["ap_ssid"] = ap_ssid;
  doc["human_name"] = human_name;
  doc["announce_topic"] = announce_topic;
  doc["device_id"] = getDeviceId();
  doc["broker"] = broker;
  doc["topic"] = topic;
  doc["build"] = VERSION;
  doc["use_mqtt"] = use_mqtt;
  doc["strip_size"] = strip_size;
  doc["ip"] = WiFi.localIP().toString();
*/

//{"br":6,"spd":65,"fx":2,"mode":0,"size":88}
export type deviceStateData = {
  spd: number;
  fx: number;
  br: number;
  size: number;
  mode: deviceMode;
};

export type birthAnouncementPayload = {
  ev: "birth";
  id: string;
  ip: string;
};

export type deathAnouncementPayload = {
  ev: "death";
  id: string;
  ip: string;
};

export type stateChangeAnnouncementPayload = {
  ev: "stateChange";
  id: string;
} & deviceStateData;

export type announcementPayload = stateChangeAnnouncementPayload | birthAnouncementPayload | deathAnouncementPayload;

export type groupData = {
  id: string;
  name: string;
  deviceIds: string[];
};

type aggregatedData = {
  min: number | null;
  max: number | null;
  avg: number | null;
  median: number | null;
  last: number | null;
}

export type sensorData = { key: string, series: timeSeriesSubset[] }[];

export type sensor = {
  id: string;
  name: string;
  data: sensorData;
  last_seen: number;
}

export type groupDataWithDevices = groupData & {
  devices: device[];
}

export type timeSeriesSubsetKey = 'Immediate' | 'Day' | 'Week' | 'Month' | 'Year';
export type timeSeriesDataPoint = [timestamp: number, value: number];

export type timeSeriesSubset = {
  key: timeSeriesSubsetKey;
  series: timeSeriesDataPoint[];
  timeWindow: number;
  extras: aggregatedData;
};

export type scheduleData = {
  hour: string;
  minute: string;
  day: string;
  month: string;
}

export type ruleActionData = [deviceId: string, payload: string];

export type ruleData = {
  id: string;
  name: string;
  schedule: string;
  actions: ruleActionData[]
}