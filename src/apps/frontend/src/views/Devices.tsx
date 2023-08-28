import { Container } from 'react-bootstrap';
import useStore from '../store';
import ControlWidget from '../components/widgets/ControlWidget';

export default function DevicesView() {
  const devices = useStore((store) => store.devices);

  return (
    <Container>
      {devices.map((device) => <ControlWidget type='DEVICE' data={device.state} />)}
    </Container>
  );
}