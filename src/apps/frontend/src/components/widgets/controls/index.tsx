import { Container, Row, Col, Alert } from 'react-bootstrap';
import { deviceStateData, sensorData } from '@dash/sharedTypes';
import ButtonControl from './ButtonControl';
import RangeControl from './RangeControl';
import CMDLabel from './Label';
import Sensor from './Sensor';
import { DeviceControlsList, DeviceControlType, GroupControlList, SensorCtrlTypeList, SensorCtrlType } from './controlDefinitions';

function parseControls(state: deviceStateData | sensorData, control: DeviceControlType | SensorCtrlType) {
  const parsed: DeviceControlType | SensorCtrlType;

  Object.keys(control).forEach(key => {
    if (typeof control[key] === 'function')
      parsed[key] = control[key].call(null, state);
  });

  return { ...control, ...parsed };
}

type deviceControlPropsType<T extends BaseControlList> = {
  controlList: T;
  state?: deviceStateData | sensorData;
  onChange?: (payload: string, data: null | string) => void;
}

export default function DeviceControl({ controlList, state, onChange }: deviceControlPropsType) {
  const Controls = props.controls.map((row, i: number) => {

    return (
      <Row key={`row_${i}`}>
        {row.map((rawCtrl: DeviceControlType, index: number) => {
          if (!rawCtrl.type) return null;
          const ctrl = (props.state) ? parseControls(props.state, rawCtrl) : rawCtrl;
          switch (ctrl.type.toUpperCase()) {
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
