import { deviceStateData, sensorData } from "@dash/sharedTypes";
const colors = ['#007bff', '#e83e8c', '#28a745', '#ffc107'];

export type sensorChannel = {
  icon: string;
  key: string;
  color: string;
  unit: string;
}

export type devicePayloadType = {
  cmd: "fx" | "spd" | "br" | "pause" | "play" | "off";
  payload: string;
};

interface baseControl {
  type: "BUTTON" | "RANGE" | "LABEL" | "SENSOR";
  label?: string | ((s: deviceStateData) => string);
  style?: string | ((s: deviceStateData) => string);
}

interface rangeControl extends baseControl {
  min: string;
  max: string;
  val: string | ((s: deviceStateData) => string);
  payload: devicePayloadType | ((s: deviceStateData) => devicePayloadType);
}

interface buttonControl extends baseControl {
  type: 'BUTTON';
  payload: devicePayloadType | ((s: deviceStateData) => devicePayloadType);
}

interface labelControl extends baseControl {
  type: 'LABEL';
};

interface sensorControl extends baseControl {
  type: 'SENSOR';
  channels: sensorChannel[];
  data: (d: unknown & { data: sensorData }) => sensorData;
  lastSeen: (n: unknown & { last_seen: number }) => number;
}

export type control = rangeControl | buttonControl | labelControl | sensorControl;
export type controlsList = control[][];

export const DeviceControls: controlsList = [
  [{
    label: 'Off',
    type: 'BUTTON',
    style: 'outline-warning',
    payload: { cmd: 'off', payload: '' },
  }],
  [{
    label: ({ mode }) => (mode === 2) ? 'Pause' : 'Play',
    type: 'BUTTON',
    style: ({ mode }) => (mode === 2) ? 'outline-light' : 'outline-success',
    payload: ({ mode }) => (mode === 2) ? { cmd: 'pause', payload: '' } : { cmd: 'play', payload: '' },
  }],
  [
    {
      label: 'Rainbow',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 1) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '1' },
    },
    {
      label: 'Opposites',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 4) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '4' },
    },
  ],
  [
    {
      label: 'Wavebow',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 2) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '2' },
    },
    {
      label: 'Chaser',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 6) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '6' },
    },
  ],
  [
    {
      label: 'Hue split',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 5) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '5' },
    },
    {
      label: 'White aurora',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 7) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '7' },
    },
  ],
  [
    {
      label: 'Aurora',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 3) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '3' },
    },
    {
      label: 'White chaser',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 8) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '8' },
    },
  ],
  [
    {
      label: 'Trippy',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 9) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '9' },
    },
  ],
  [
    {
      label: 'Transition Speed',
      type: 'RANGE',
      payload: { "cmd": "spd", "payload": "$1" },
      min: '0',
      max: '255',
      val: ({ spd }) => `${spd}`
    },
  ],
  [
    {
      label: 'Brightness',
      type: 'RANGE',
      payload: { "cmd": "br", "payload": "$1" },
      min: '0',
      max: '250',
      val: ({ br }) => `${br}`
    },
  ],
];

export const GroupControls: controlsList = [
  [{
    label: 'Off',
    type: 'BUTTON',
    style: 'outline-warning',
    payload: { cmd: 'off', payload: '' },
  }],
  [{
    label: ({ mode }) => (mode === 2) ? 'Pause' : 'Play',
    type: 'BUTTON',
    style: ({ mode }) => (mode === 2) ? 'outline-light' : 'outline-success',
    payload: ({ mode }) => (mode === 2) ? { cmd: 'pause', payload: '' } : { cmd: 'play', payload: '' },
  }],
  [
    {
      label: 'Rainbow',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 1) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '1' },
    },
    {
      label: 'Opposites',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 4) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '4' },
    },
  ],
  [
    {
      label: 'Wavebow',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 2) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '2' },
    },
    {
      label: 'Chaser',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 6) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '6' },
    },
  ],
  [
    {
      label: 'Hue split',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 5) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '5' },
    },
    {
      label: 'White aurora',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 7) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '7' },
    },
  ],
  [
    {
      label: 'Aurora',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 3) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '3' },
    },
    {
      label: 'White chaser',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 8) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '8' },
    },
  ],
  [
    {
      label: 'Trippy',
      type: 'BUTTON',
      style: ({ fx }) => (fx === 9) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '9' },
    },
  ],
  [
    {
      label: 'Transition Speed',
      type: 'RANGE',
      payload: { "cmd": "spd", "payload": "$1" },
      min: '0',
      max: '255',
      val: ({ spd }) => `${spd}`
    },
    {
      label: 'Brightness',
      type: 'RANGE',
      payload: { "cmd": "br", "payload": "$1" },
      min: '0',
      max: '250',
      val: ({ br }) => `${br}`
    },
  ],
];

export const SensorControls: controlsList = [
  [
    {
      type: 'SENSOR',
      channels: [
        {
          icon: 'TEMP',
          key: 't',
          color: colors[0],
          unit: 'C'
        },
        {
          icon: 'HUMID',
          key: 'h',
          color: colors[1],
          unit: '%'
        },
        {
          icon: 'PRES',
          key: 'p',
          color: colors[2],
          unit: 'hPa'
        }
      ],
      data: ({ data }) => data,
      lastSeen: ({ last_seen }) => (last_seen)
    }
  ]
];