
import { Container } from 'react-bootstrap';
import useStore from '../store';
import ControlWidget from '../components/widgets/controlWidget/ControlWidget';

import { groupDataWithDevices } from '@dash/sharedTypes';
import { groupControlWidget } from '../components/widgets/controlWidget/types';

export default function HomeView() {
  const store = useStore((store) => store);

  const expandedGroups: groupDataWithDevices[] = store.groups.map(group => {
    return {
      id: group.id,
      name: group.name,
      deviceIds: group.deviceIds,
      devices: (store.devices.filter(d => group.deviceIds.includes(d.id)))
    }
  });

  return (
    <Container>
      {expandedGroups.map((groupData, i) => <ControlWidget<groupControlWidget> key={`group_${i}`} data={groupData} type='GROUP' />)}
    </Container>
  );
}