import { BuildWidget } from '../components/cards';
import { Container } from 'react-bootstrap';
import useStore from '../store';
import { deviceData } from '@dash/commonTypes';

export default function DevicesView() {
  const store = useStore((store) => store.devices);

  const widgets = store.map((devices: deviceData) => BuildWidget()

    < Widget controls = { DeviceCtrl } type = 'aurora' key = { d.device_id } data = { d } ></Widget >);

  return (
    <Container>
      {widgets}
    </Container>
  );
}