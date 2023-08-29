import { useCallback, useState } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { device, deviceStateData, groupDataWithDevices, sensor, sensorData } from "@dash/sharedTypes";

import { rangeControl, controlsList, control, buttonControl, commandPayload, sensorControl, labelControl, baseControl, DeviceControls, GroupControls, SensorControls } from '../../../model/controlDefinitions';
import RangeControl from '../../controls/RangeControl';
import ButtonControl from '../../controls/ButtonControl';
import LabelControl from "../../controls/LabelControl";
import Sensor from '../../controls/Sensor';
import useStore from "../../../store";
import ControlWidgetTitle from "./ControlWidgetTitle";
import { controlWidgetProps } from "./types";
import { ControlWidgetInfo } from "./ControlWidgetInfo";
import Widget from "../Widget";

type parsedValue = string | number | commandPayload | sensorData;
type controlGroupData = deviceStateData | sensor | groupDataWithDevices;
type fn = (d: controlGroupData) => parsedValue;

function parseControls<T extends baseControl>(state: controlGroupData, controlDefinition: T): Record<keyof T, parsedValue> {
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
  state: deviceStateData | sensor | groupDataWithDevices;
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
                    onChange={(val) => onChange(JSON.stringify({ ...controlDef.payload, ...{ payload: `${val}` } } as commandPayload))}
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

export default function ControlWidget<T extends controlWidgetProps>({ data, type }: T) {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const changeHandler = useCallback((payload: string) => {
    const ids: string[] = (type === 'DEVICE')
      ? [data.id]
      : (type === 'GROUP') ? (data as groupDataWithDevices).devices.map(d => d.id) : [];

    console.log(`Issuing command ${payload} to device ids ${ids}`);
    useStore.getState().issueCMD(ids, payload);
  }, [type, data]);


  const controls = (type === 'DEVICE') ? DeviceControls : (type === 'GROUP') ? GroupControls : SensorControls;
  const state = (type === 'DEVICE') ? (data as device).state : (type === 'GROUP') ? data as groupDataWithDevices : data as sensor;
  return (
    <Widget
      title={<ControlWidgetTitle name={data.name} type={type} onViewToggle={() => setShowInfo(!showInfo)} />}
      visibleFace={showInfo ? 'back' : 'front'}
      front={<Controls state={state} onChange={changeHandler} controls={controls} />}
      back={<ControlWidgetInfo<T> data={data} type={type} />}
    />)
}
