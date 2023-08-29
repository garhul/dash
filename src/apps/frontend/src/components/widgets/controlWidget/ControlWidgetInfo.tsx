import { device, groupDataWithDevices, sensor } from "@dash/sharedTypes";
import { controlWidgetProps } from "./types";

export type widgetInfoProps = Record<string, string>;
export function ControlWidgetInfo<T extends controlWidgetProps>({ data, type }: T) {

  const items: { label: string, value: string }[] = [];
  items.push(
    { label: 'Name:', value: data.name },
    { label: 'ID:', value: data.id }
  );

  switch (type) {
    case 'DEVICE':
      items.push(
        { label: 'IP address:', value: (data as device).ip },
        { label: 'Topic:', value: (data as device).topic },
        { label: 'State string:', value: (data as device).infoString || '' }
      );
      break;

    case 'SENSOR':
      items.push(
        { label: 'Last seen:', value: new Date((data as sensor).last_seen).toISOString() },
        { label: 'Data keys:', value: (data as sensor).data.map(d => d.key).join(' ,') }
      );
      break;


    case 'GROUP':
      items.push(
        { label: 'Device Ids:', value: (data as groupDataWithDevices).deviceIds.join(', ') },
        { label: 'Devices:', value: (data as groupDataWithDevices).devices.map(d => `${d.human_name} [${d.device_id}]`).join(', ') }
      );
      break;
  }

  return (
    <ul className="info">
      {items.map((i, k) => (<li key={`info_item_${k}`}>{i.label}<span>{i.value}</span></li>))}
    </ul>
  );
}