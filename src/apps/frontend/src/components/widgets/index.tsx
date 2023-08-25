// import { useState } from 'react';
// import { Badge, Container, Row, Col } from 'react-bootstrap';
// import { AiOutlineInfoCircle } from 'react-icons/ai';

// import useStore from '../../store';
// import DeviceControls from './controls';
// import { GroupControls } from './controlDefinitions';
// import { deviceData, expandedGroupData, sensorData } from '@dash/sharedTypes';


// //TODO:: make use of proper data types
// type WidgetProps = {
//   controls: any;
//   data: deviceData | expandedGroupData | sensorData;
//   type: 'aurora' | 'sensor' | 'group';
// }




// type commandIssuingWidgetProps = WidgetProps;

// function CommandIssuingWidget<T extends baseControls>(props: commandIssuingWidgetProps) {
//   const [viewInfo, setViewInfo] = useState(false);
//   const issueCMD = useStore((state) => state.issueCMD);

//   const update = (payload: string, value: string) => {
//     if (props.type === 'aurora') {
//       issueCMD([(props.data as deviceData).device_id], JSON.stringify(payload).replace('$1', value));
//     } else if (props.type === 'group') {
//       issueCMD((props.data as expandedGroupData).deviceIds, JSON.stringify(payload).replace('$1', value));
//     }
//   }

//   const Body = ((t) => {
//     switch (t) {
//       case 'aurora':
//         if (viewInfo) return <WidgetInfo {...props.data as deviceData} />;
//         return <DeviceControls state={(props.data as deviceData).state} controls={props.controls} update={update} />;

//       case 'group':
//         if (viewInfo) return <GroupInfo {...props.data as expandedGroupData} />;
//         return <DeviceControls state={(props.data as expandedGroupData).devices[0]?.state} controls={props.controls} update={update} />;

//       case 'sensor':
//         if (viewInfo) return <SensorInfo {...props.data as sensorData} />;
//         return <DeviceControls state={(props.data as sensorData)} controls={props.controls} />;
//     }
//   })(props.type);

//   return (
//     <Container className={`widget widget_${props.type}`}>
//       <WidgetTitle
//         {...props.data}
//         type={props.type}
//         showInfo={true}
//         toggleViewInfo={() => setViewInfo(!viewInfo)}>
//       </WidgetTitle>
//       {Body}
//     </Container>
//   );
// }

// type controlsCardType = "SENSOR" | "DEVICE" | "GROUP";

/** builds a (widget) of given control type */
// export default function getControlWidget(type: controlsCardType, data: expandedGroupData | deviceData | sensorData) {

//   let body = null;
//   switch (type) {
//     case "SENSOR":
//       body = (<Widget controls={SensorControls} type='aurora' data={data as sensorData} ></Widget >);
//       break;

//     case "DEVICE": //at the time of writting this all devices are "auroras"
//       body = (<Widget controls={DeviceControls} type='aurora' data={data as deviceData} ></Widget >);
//       break;

//     case "GROUP":
//       return (<Widget controls={GroupControls} type='aurora' data={data} />);
//       break;

//     default: return null;

//   }

//   return (
//     <Container>
//       <WidgetTitle />
//       {body}

//     </Container>
//   )


// }