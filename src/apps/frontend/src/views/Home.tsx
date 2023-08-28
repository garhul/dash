
import { Container } from 'react-bootstrap';
import useStore from '../store';
import ControlWidget from '../components/widgets/ControlWidget';
import { expandedGroupData } from '@dash/sharedTypes';

export default function HomeView() {
  const store = useStore((store) => store);

  const expandedGroups: expandedGroupData[] = store.groups.map(group => {
    return {
      id: group.id,
      name: group.name,
      deviceIds: group.deviceIds,
      devices: (store.devices.filter(d => group.deviceIds.includes(d.device_id)))
    }
  });

  return (
    <Container>
      {expandedGroups.map((groupData) => <ControlWidget data={groupData} type='GROUP' />)}
    </Container>
  );
}