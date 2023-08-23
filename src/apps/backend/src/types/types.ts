export type deviceData = {
  device_id: string;
  strip_size: number;
  topic: string;
  human_name: string;
  ip: string;
  build: string;
  state: deviceStateData;
  announce_topic?: string;
  ap_ssid?: string;
  broker?: string;
  use_mqtt?: boolean;
  ssid?: string;
  stateString?: string;
  infoString?: string;
};

export enum deviceMode {
  'OFF' = 0,
  'PAUSED' = 1,
  'PLAYING' = 2
};

/*
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

export type sensorData = {
  id: string;
  name: string;
  data: { key: string, series: timeSeriesSubset[] }[];
  last_seen: number;
}

export type expandedGroupData = groupData & {
  devices: deviceData[];
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