import { device, groupDataWithDevices, sensor } from "@dash/sharedTypes";

export enum controlWidgetTypes {
  SENSOR,
  DEVICE,
  GROUP
};

export type p = device | groupDataWithDevices | sensor;

export type controlWidgetProps<T typeof p>) > = {
  type: keyof typeof controlWidgetTypes;
  data: T;
};

// export type groupControlWidget = controlWidgetBase & {
//   type: 'GROUP';
//   data: groupDataWithDevices;
// };

// export type deviceControlWidget = controlWidgetBase & {
//   type: 'DEVICE';
//   data: device;
// };

// export type sensorControlWidget = controlWidgetBase & {
//   type: 'SENSOR';
//   data: sensor;
// };