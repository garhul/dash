import { deviceStateData, sensorData } from "@dash/sharedTypes";
const colors = ['#007bff', '#e83e8c', '#28a745', '#ffc107'];

export type sensorChannel = {
  icon: string;
  key: string;
  color: string;
  unit: string;
}

export enum deviceCommands {
  fx,
  spd,
  br,
  pause,
  play,
  off
}

export enum controlType {
  BUTTON,
  RANGE,
  LABEL,
  SENSOR
}

export type commandPayload = {
  cmd: keyof typeof deviceCommands;
  payload: string;
};


export interface baseControl {
  type: keyof typeof controlType;
  label?: string | ((s: deviceStateData) => string);
  variant?: string | ((s: deviceStateData) => string);
}

export type rangeControl = baseControl & {
  min: string;
  max: string;
  val: number | ((s: deviceStateData) => number);
  payload: commandPayload | ((s: deviceStateData) => commandPayload);
}
export type buttonControl = baseControl & {
  type: 'BUTTON';
  payload: commandPayload | ((s: deviceStateData) => commandPayload);
}

export type labelControl = baseControl & {
  type: 'LABEL';
};

export type sensorControl = baseControl & {
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
    variant: 'outline-warning',
    payload: { cmd: 'off', payload: '' },
  }],
  [{
    label: ({ mode }) => (mode === 2) ? 'Pause' : 'Play',
    type: 'BUTTON',
    variant: ({ mode }) => (mode === 2) ? 'outline-light' : 'outline-success',
    payload: ({ mode }) => (mode === 2) ? { cmd: 'pause', payload: '' } : { cmd: 'play', payload: '' },
  }],
  [
    {
      label: 'Rainbow',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 1) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '1' },
    },
    {
      label: 'Opposites',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 4) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '4' },
    },
  ],
  [
    {
      label: 'Wavebow',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 2) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '2' },
    },
    {
      label: 'Chaser',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 6) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '6' },
    },
  ],
  [
    {
      label: 'Hue split',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 5) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '5' },
    },
    {
      label: 'White aurora',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 7) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '7' },
    },
  ],
  [
    {
      label: 'Aurora',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 3) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '3' },
    },
    {
      label: 'White chaser',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 8) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '8' },
    },
  ],
  [
    {
      label: 'Trippy',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 9) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '9' },
    },
  ],
  [
    {
      label: 'Transition Speed',
      type: 'RANGE',
      payload: { cmd: 'spd', payload: "" },
      min: '0',
      max: '255',
      val: ({ spd }) => spd
    },
  ],
  [
    {
      label: 'Brightness',
      type: 'RANGE',
      payload: { cmd: 'br', payload: "" },
      min: '0',
      max: '250',
      val: ({ br }) => br
    },
  ],
];

export const GroupControls: controlsList = [
  [{
    label: 'Off',
    type: 'BUTTON',
    variant: 'outline-warning',
    payload: { cmd: 'off', payload: '' },
  }],
  [{
    label: ({ mode }) => (mode === 2) ? 'Pause' : 'Play',
    type: 'BUTTON',
    variant: ({ mode }) => (mode === 2) ? 'outline-light' : 'outline-success',
    payload: ({ mode }) => (mode === 2) ? { cmd: 'pause', payload: '' } : { cmd: 'play', payload: '' },
  }],
  [
    {
      label: 'Rainbow',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 1) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '1' },
    },
    {
      label: 'Opposites',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 4) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '4' },
    },
  ],
  [
    {
      label: 'Wavebow',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 2) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '2' },
    },
    {
      label: 'Chaser',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 6) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '6' },
    },
  ],
  [
    {
      label: 'Hue split',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 5) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '5' },
    },
    {
      label: 'White aurora',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 7) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '7' },
    },
  ],
  [
    {
      label: 'Aurora',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 3) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '3' },
    },
    {
      label: 'White chaser',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 8) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '8' },
    },
  ],
  [
    {
      label: 'Trippy',
      type: 'BUTTON',
      variant: ({ fx }) => (fx === 9) ? 'outline-success' : 'outline-secondary',
      payload: { cmd: 'fx', payload: '9' },
    },
  ],
  [
    {
      label: 'Transition Speed',
      type: 'RANGE',
      payload: { cmd: 'spd', payload: "" },
      min: '0',
      max: '255',
      val: ({ spd }) => spd
    },
    {
      label: 'Brightness',
      type: 'RANGE',
      payload: { cmd: 'br', payload: "" },
      min: '0',
      max: '250',
      val: ({ br }) => br
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