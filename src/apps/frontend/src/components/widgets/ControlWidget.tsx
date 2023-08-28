import { useState } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { deviceStateData, expandedGroupData, groupData, sensorData } from "@dash/sharedTypes";

import { rangeControl, controlsList, control, buttonControl, commandPayload, sensorControl, labelControl, baseControl, DeviceControls, GroupControls, SensorControls } from '../../model/controlDefinitions';
import RangeControl from './controls/RangeControl';
import ButtonControl from './controls/ButtonControl';
import LabelControl from "./controls/LabelControl";
import Sensor from './controls/Sensor';

import useStore from "../../store";
import ControlWidgetTitle from "./ControlWidgetTitle";


type parsedValue = string | number | commandPayload | sensorData;
type controlGroupState = deviceStateData | sensorData | expandedGroupData;
type fn = (d: controlGroupState) => parsedValue;

function parseControls<T extends baseControl>(state: controlGroupState, controlDefinition: T): Record<keyof T, parsedValue> {
  const parsedFields: Record<string, parsedValue> = {};
  const keys = Object.keys(controlDefinition);

  keys.forEach(key => {
    if (typeof controlDefinition[key as keyof T] === 'function') {
      const fn = controlDefinition[key as keyof T] as fn;

      parsedFields[key] = fn.call(null, state);
    }
  });

  return { ...controlDefinition, ...parsedFields };
}

type controlsPropsType = {
  controls: controlsList;
  state: deviceStateData | sensorData | expandedGroupData;
  onChange: (payload: string) => void;
}

function Controls({ controls, state, onChange }: controlsPropsType) {
  const ctrlList = controls.map((row, i: number) => {
    return (
      <Row key={`row_${i}`}>{
        row.map((controlDef: control, index: number) => {
          const type = controlDef.type;
          switch (type) {
            case 'BUTTON': {
              const parsedControl = parseControls<buttonControl>(state, controlDef as buttonControl);
              return (
                <Col key={`btn_${index}`}>
                  <ButtonControl
                    variant={parsedControl.variant as string || ''}
                    onClick={() => onChange(JSON.stringify(parsedControl.payload))}>
                    {parsedControl.label as string}
                  </ButtonControl>
                </Col>);
            }

            case 'LABEL': {
              const parsedControl = parseControls<labelControl>(state, controlDef as labelControl);
              return (
                <Col key={`label_${index}`}>
                  <LabelControl>{parsedControl.label as string}</LabelControl>
                </Col>
              )
            }

            case 'RANGE': {
              const parsedControl = parseControls<rangeControl>(state, controlDef as rangeControl);
              return (
                <Col key={`range_${index}`}>
                  <RangeControl
                    onChange={(data) => onChange(JSON.stringify(parsedControl.payload))}
                    val={parsedControl.val as number}
                    max={parsedControl.max as number}
                    min={parsedControl.min as number}
                    label={parsedControl.label as string || ''} />
                </Col>
              )
            }

            case 'SENSOR': {
              const parsedControl = parseControls<sensorControl>(state, controlDef as sensorControl);
              return (
                <Col key={`sensor_${index}`}>
                  <Sensor
                    channels={(controlDef as sensorControl).channels}
                    data={parsedControl.data as sensorData}
                    lastSeen={parsedControl.lastSeen as number}
                  />
                </Col>
              )
            }

            default:
              return (<Alert key={`alert_${index}`} variant="warning">Control {type} not found!</Alert>);
          }
        })}
      </Row >
    )
  });

  return (
    <Container>
      {ctrlList}
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

// function ControlWidgetBody<T extends baseControls>({type, data, controlList, onChange}: commandIssuingWidgetProps) {
//   switch (type) {
//     case controlWidgetTypes.DEVICE:
//       // if (viewInfo) return <WidgetInfo {...props.data as deviceData} />;
//       return <DeviceControls state={(props.data as deviceData).state} controls={controlList} onChange />;

//     case controlWidgetTypes.GROUP:
//       // if (viewInfo) return <GroupInfo {...props.data as expandedGroupData} />;
//       return <DeviceControls state={(props.data as expandedGroupData).devices[0]?.state} controls={controlList} onChange />;

//     case controlWidgetTypes.SENSOR:
//       // if (viewInfo) return <SensorInfo {...props.data as sensorData} />;
//       return <DeviceControls state={(props.data as sensorData)} controls={controlList} />;
//   }

//   return <DeviceControls st
// }




export type widgetProps<T> = {
  // title: TitleType extends WidgetTitle;
  type: keyof typeof controlWidgetTypes;
  data: sensorData | deviceStateData | expandedGroupData;
}

export default function ControlWidget<T>({ data, type }: widgetProps<T>) {
  const [infoVisible, setInfoVisible] = useState<boolean>(false);
  const issueCMD = useStore((state) => state.issueCMD);

  const changeHandler = (payload: string) => {
    console.log(`Issuing command ${payload}`);
    // issueCMD(payload);

    // if (props.type === 'aurora') {
    //   issueCMD([(props.data as deviceData).device_id], JSON.stringify(payload).replace('$1', value));
    // } else if (props.type === 'group') {
    //   issueCMD((props.data as expandedGroupData).deviceIds, JSON.stringify(payload).replace('$1', value));
    // }
  }
  const controls = (type === 'DEVICE') ? DeviceControls : (type === 'GROUP') ? GroupControls : SensorControls;
  //<GroupInfo {...props.data as expandedGroupData} />
  const body = (infoVisible) ? null /*info*/ : <Controls state={data} onChange={changeHandler} controls={controls} />; //info;

  return (
    <Container className={`widget widget_${type}`} >
      <ControlWidgetTitle name="{data.name}" type={type} onViewToggle={() => setInfoVisible(!infoVisible)}
      />
      {body}
    </ Container>
  );

}