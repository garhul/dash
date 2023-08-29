import { Container } from 'react-bootstrap';
import useStore from '../store';
import ControlWidget from '../components/widgets/controlWidget/ControlWidget';
import { deviceControlWidget } from '../components/widgets/controlWidget/types';

export default function DevicesView() {
  const devices = useStore((store) => store.devices);
  console.log(devices);
  return (
    <Container>
      {devices.map((device, i) =>
        <ControlWidget<deviceControlWidget>
          key={`dev_${i}`}
          type='DEVICE'
          data={device}
        />
      )}
    </Container>
  );
}