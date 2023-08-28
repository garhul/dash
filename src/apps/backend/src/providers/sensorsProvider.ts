import { getTaggedLogger } from "../services/logger";
import { Sensors, processSensorData } from "../services/store";
import TimeSeries from "../services/store/timeSeries";
import { sensor } from "@dash/sharedTypes";

const logger = getTaggedLogger('PROVIDERS::Sensors');

export function addData(payload: string) {
  try {
    const { data, id, name } = JSON.parse(payload as string);
    const parsedData = processSensorData(id, Object.keys(data).map(k => [k, data[k]]));
    Sensors.set(id, {
      id,
      name,
      data: parsedData.map(([key, timeSeries]: [string, TimeSeries]) => ({ key, series: timeSeries.getData() })),
      last_seen: Date.now()
    });
  } catch (err) {
    logger.error(err);
  }
};

export function getAll(): sensor[] {
  return Sensors.getAll().map(s => s[1]).sort((a, b) => {
    if (a > b) return 1;
    if (b === a) return 0;
    return -1;
  });
}