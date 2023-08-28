import { Container } from 'react-bootstrap';
import useStore from '../store';
import ControlWidget from '../components/widgets/controlWidget/ControlWidget';
import { sensorControlWidget } from '../components/widgets/controlWidget/types'

export default function SensorsView() {
  const sensors = useStore((store) => store.sensors);
  return (
    <Container>
      {sensors.map((sensor) => <ControlWidget<sensorControlWidget> type='SENSOR' key={sensor.id} data={sensor} />)}
    </Container>
  );
}