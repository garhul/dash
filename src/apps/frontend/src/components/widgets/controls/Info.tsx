import { expandedGroupData, sensorData } from "@dash/sharedTypes";

export type widgetInfoProps = Record<string, string>;
export function WidgetInfo(props: widgetInfoProps) {

  // const items = props.map

  return (
    <ul className="info">
      <li >device id: <span>{props.device_id}</span></li>
      <li >ip: <span>{props.ip}</span></li>
      <li >topic: <span>{props.topic}</span></li>
      <li >state: <span>{JSON.stringify(props.state)}</span></li>
    </ul>
  )
}

export function GroupInfo(props: expandedGroupData) {
  return (
    <ul className="info">
      <li >id: <span>{props.id}</span></li>
      <li >name: <span>{props.name}</span></li>
      <li >device_ids: <span>{props.deviceIds.join(', ')}</span></li>
      <li >devices: <span>{props.devices.map(d => `${d.human_name} [${d.device_id}]`).join(', ')}</span></li>
      {props.devices.map((d, k) => (<li>{d.stateString}</li>))}
    </ul>
  )
}


// function WidgetInfo(props: deviceData) {
//   return (
//     <ul className="info">
//       <li >device id: <span>{props.device_id}</span></li>
//       <li >ip: <span>{props.ip}</span></li>
//       <li >topic: <span>{props.topic}</span></li>
//       <li >state: <span>{JSON.stringify(props.state)}</span></li>
//     </ul>
//   )
// }

export function SensorInfo(props: sensorData) {
  return (
    <ul className="info">
      <li>device id: <span>{props.id}</span></li>
      <li>name: <span>{props.name}</span></li>
      <li>last seen: <span>{(new Date(props.last_seen)).toISOString()}</span></li>
    </ul>
  )
}