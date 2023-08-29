import { device, groupDataWithDevices, sensor } from "@dash/sharedTypes";

export enum controlWidgetTypes {
  SENSOR,
  DEVICE,
  GROUP
};

export type p = device | groupDataWithDevices | sensor;

export interface controlWidgetProps {
  type: keyof typeof controlWidgetTypes;
  data: groupDataWithDevices | device | sensor;
};

export interface groupControlWidget extends controlWidgetProps {
  type: 'GROUP';
  data: groupDataWithDevices;
};

export interface deviceControlWidget extends controlWidgetProps {
  type: 'DEVICE';
  data: device;
};

export interface sensorControlWidget extends controlWidgetProps {
  type: 'SENSOR';
  data: sensor;
};