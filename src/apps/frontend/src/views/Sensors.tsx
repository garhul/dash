import { Container } from 'react-bootstrap';
import useStore from '../store';
import ControlWidget from '../components/widgets/ControlWidget';

export default function SensorsView() {
  const sensors = useStore((store) => store.sensors);
  return (
    <Container>
      {sensors.map((sensor) => <ControlWidget type='SENSOR' key={sensor.id} data={sensor.data} />)}
    </Container>
  );
}