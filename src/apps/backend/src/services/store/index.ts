import { deviceData, groupData, ruleData, sensorData } from '@dash/sharedTypes';
import { getTaggedLogger } from '../logger';
import { getConfig } from '../../config';
import fs from 'fs';
import ObservableCollection from './observableCollection';
import TimeSeries from './timeSeries';

const logger = getTaggedLogger('STORE');

function loadFromFile<T>(file: string): Array<[id: string, value: T]> {
  try {
    const retval = JSON.parse(fs.readFileSync(file).toString());
    return retval;
  } catch (err: unknown) {
    logger.error(`Unable to load file: ${file} ${err}`);
    return []
  }
}

function persistToFile<T>(data: Array<[id: string, value: T]>, filePath: string) {
  try {
    const parseableData = Array.from(data);
    fs.writeFileSync(filePath, JSON.stringify(parseableData));
  } catch (err) {
    logger.error(`Unable to persist o ${filePath} ${err}`);
  }
}

export const Devices = new ObservableCollection<deviceData>('Devices', loadFromFile<deviceData>(getConfig('store.devices') as string));
// Devices.onChange((d) => persistToFile<deviceData>(d, getConfig('store.devices') as string));

export const Groups = new ObservableCollection<groupData>('Groups', loadFromFile<groupData>(getConfig('store.groups') as string));
Groups.onChange((d) => persistToFile<groupData>(d, getConfig('store.groups') as string));

export const SchedulerRules = new ObservableCollection<ruleData>('SchedulerRules', loadFromFile<ruleData>(getConfig('store.scheduler') as string));
SchedulerRules.onChange((d) => persistToFile<ruleData>(d, getConfig('store.scheduler') as string));

export const Sensors = new ObservableCollection<sensorData>('Sensors', null);
//TODO :: Implement persistence for sensor data


const Series = new Map<string, TimeSeries>();

export function processSensorData(sensorId: string, dataPointCollection: [key: string, value: number][]) {
  const sensorTs = dataPointCollection.map(([key, value]: [string, number]): [string, TimeSeries] => {
    const normalizedVal = Math.ceil(value * 1000);
    const tsKey = `${sensorId}#${key}`;

    const timeSeries = (Series.has(tsKey)) ? Series.get(tsKey) : new TimeSeries(getConfig('sensors.timeseries_depth') as number);

    timeSeries.addSample(normalizedVal);

    Series.set(tsKey, timeSeries);
    return [key, timeSeries];
  });

  return sensorTs;
}