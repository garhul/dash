import { deviceData } from "@dash/sharedTypes";
import { useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useStore from "../../store";
import { DeviceControlType } from "./controlDefinitions";
import ControlWidgetTitle from "./ControlWidgetTitle";
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { deviceStateData, sensorData } from '@dash/sharedTypes';
import ButtonControl from './ButtonControl';
import RangeControl from './RangeControl';
import CMDLabel from './Label';
import Sensor from './Sensor';
import { DeviceControlsList, DeviceControlType, GroupControlList, SensorCtrlTypeList, SensorCtrlType } from './controlDefinitions';


function parseControlList(state: deviceStateData | sensorData, control: DeviceControlType | SensorCtrlType): unknown {
  const parsed: DeviceControlType | SensorCtrlType;

  Object.keys(control).forEach(key => {
    if (typeof control[key] === 'function')
      parsed[key] = control[key].call(null, state);
  });

  return { ...control, ...parsed };
}

type deviceControlPropsType = {
  controlsList: T;
  state?: deviceStateData | sensorData;
  onChange?: (payload: string, data: null | string) => void;
}

export default function Controls({ controlsList, state, onChange }: deviceControlPropsType) {
  const Controls = controlsList.map((row, i: number) => {

    return (
      <Row key={`row_${i}`}>
        {row.map((rawCtrl: DeviceControlType, index: number) => {

          if (!rawCtrl.type) return null;
          const ctrl = (state) ? parseControls(state, rawCtrl) : rawCtrl;

          switch (ctrl.type) {
            case 'BUTTON':
              return (
                <Col key={`btn_${index}`}>
                  <CMDButton
                    update={(data) => props.update(ctrl.payload, data)}
                    key={`btn_${index}`}
                    {...ctrl}>
                  </CMDButton>
                </Col>);

            case 'LABEL':
              return (
                <Col key={`label_${index}`}>
                  <CMDLabel {...ctrl}></CMDLabel>
                </Col>
              )

            case 'RANGE':
              return (
                <Col key={`range_${index}`}>
                  <CMDRange update={(data) => props.update(ctrl.payload, data)} key={`rng_${index}`} {...ctrl}></CMDRange>
                </Col>
              )

            case 'SENSOR':
              return (
                <Col key={`sensor_${index}`}>
                  <Sensor {...ctrl}></Sensor>
                </Col>
              )

            default:
              return (<Alert key={`alert_${index}`} variant="warning">Control for {ctrl.type} not found!</Alert>);
          }
        })}
      </Row>
    )
  });

  return (
    <Container>
      {Controls}
    </Container>
  );
}



export enum controlWidgetTypes {
  SENSOR,
  DEVICE,
  GROUP
};



export type controlWidgetBodyProps = {
  type: controlWidgetTypes;
}

function ControlWidgetBody<T extends baseControls>({ type, data, controlList, onChange }: commandIssuingWidgetProps) {
  switch (type) {
    case controlWidgetTypes.DEVICE:
      // if (viewInfo) return <WidgetInfo {...props.data as deviceData} />;
      return <DeviceControls state={(props.data as deviceData).state} controls={controlList} onChange />;

    case controlWidgetTypes.GROUP:
      // if (viewInfo) return <GroupInfo {...props.data as expandedGroupData} />;
      return <DeviceControls state={(props.data as expandedGroupData).devices[0]?.state} controls={controlList} onChange />;

    case controlWidgetTypes.SENSOR:
      // if (viewInfo) return <SensorInfo {...props.data as sensorData} />;
      return <DeviceControls state={(props.data as sensorData)} controls={controlList} />;
  }

  return <DeviceControls st
}




export type widgetProps<T> = {
  title: TitleType extends WidgetTitle;
  // data: T;
}

export default function ControlWidget<T extends DeviceControlType>(props: widgetProps<T>) {
  const [infoVisible, setInfoVisible] = useState<boolean>(false);
  const issueCMD = useStore((state) => state.issueCMD);

  const onChange = (payload: string, value: string) => {
    console.log(`Issuing command ${payload} with value ${value}`);
    // issueCMD(payload);

    // if (props.type === 'aurora') {
    //   issueCMD([(props.data as deviceData).device_id], JSON.stringify(payload).replace('$1', value));
    // } else if (props.type === 'group') {
    //   issueCMD((props.data as expandedGroupData).deviceIds, JSON.stringify(payload).replace('$1', value));
    // }
  }
}

const controls = <DeviceControls state={data as T} onChange={changeHandler} />;

return (
  <Container className={`widget widget_${type}`} >
    <ControlWidgetTitle name="{data.name}" type={type} onViewToggle={() => setInfoVisible(!infoVisible)}
    />
    {viewInfo ? controls : info}
  </ Container>
);

}



// let body = null;
// switch (type) {
//   case "SENSOR":
//     body = (<Widget controls={SensorControls} type='aurora' data={data as sensorData} ></Widget >);
//     break;

//   case "DEVICE": //at the time of writting this all devices are "auroras"
//     body = (<Widget controls={DeviceControls} type='aurora' data={data as deviceData} ></Widget >);
//     break;

//   case "GROUP":
//     return (<Widget controls={GroupControls} type='aurora' data={data} />);
//     break;

//   default: return null;

// }

// return (
//   <Container>
//     <WidgetTitle />
//     {body}

//   </Container>
// )