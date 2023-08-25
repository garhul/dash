import { Container } from 'react-bootstrap';
import useStore from '../store';
import Widget from '../components/widgets';

export default function SensorsView() {
  const sensors = useStore((store) => store.sensors);
  const widgets = sensors.map((data) => <Widget controls={SensorCtrl} type='sensor' key={data.id} data={data}></Widget>);

  return (
    <Container>
      {widgets}
    </Container>
  );
}