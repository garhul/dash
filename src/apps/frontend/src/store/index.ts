import { create, StateCreator } from 'zustand'
import { groupData, deviceData, sensor, ruleData } from '@dash/sharedTypes';
import WS from './ws';
import { commandPayload } from '../model/controlDefinitions';
const apiURL = `http://${window.location.host}/api/`;

interface DevicesSlice {
  devices: deviceData[];
  updateDevices(devices: deviceData[]): void;
  issueCMD(deviceIds: string[], payload: commandPayload): void;
};

interface GroupsSlice {
  groups: groupData[];
  updateGroups(groups: groupData[]): void;
};

interface SensorsSlice {
  sensors: sensor[];
  updateSensors(sensors: sensor[]): void;
};

interface RulesSlice {
  rules: ruleData[];
  addRule: (data: ruleData) => void //Promise<void>
  deleteRule: (id: string) => void //Promise<void>
}

interface SysSlice {
  wsConnected: boolean;
  buildVersion: string;
  scanInProgress: boolean;
  setWsConnected(conn: boolean): void;
}


type StateType = DevicesSlice & GroupsSlice & SensorsSlice & RulesSlice & SysSlice;

const createDevicesSlice: StateCreator<StateType, [], [], DevicesSlice> = (set) => ({
  devices: [],
  updateDevices: (devices) => set((state) => ({ devices })),
  issueCMD: (deviceIds, payload) => updateRemote('devices', JSON.stringify({ deviceIds, payload })),
});

const createGroupsSlice: StateCreator<StateType, [], [], GroupsSlice> = (set) => ({
  groups: [],
  updateGroups: (u) => console.log(u),
});

const createSensorsSlice: StateCreator<StateType, [], [], SensorsSlice> = (set) => ({
  sensors: [],
  updateSensors: (sensors) => set((state) => ({ sensors })),
});

const createSchedulesSlice: StateCreator<RulesSlice, [], [], RulesSlice> = (set) => ({
  rules: [],
  addRule: (data) => console.log(data),
  deleteRule: (id) => console.log(id)
});

const createSysSlice: StateCreator<SysSlice, [], [], SysSlice> = (set) => ({
  wsConnected: false,
  scanInProgress: false,
  buildVersion: 'Build version not loaded',
  setWsConnected: (conn) => {
    set(state => ({ ...state, ...{ wsConnected: conn } }))
  },
  // setScanInProgress: (flag) => set(state => state.scanInProgress)
});

const updateRemote = async (entity: 'devices' | 'groups' | 'scheduler', body: string) => {
  fetch(`${apiURL}${entity}`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getRemote = async <T>(entity: 'devices' | 'groups' | 'sensors' | 'scheduler'): Promise<T> => {
  return fetch(`${apiURL}${entity}`).then(r => r.json()) as T;
};

const getBuildVersion = async () => {
  const rsp = await fetch('/build_version.txt');
  if (rsp.status === 200)
    return `Build ${await rsp.text()}`;

  return 'Build version not found';
}

const useStore = create<StateType>()((...a) => ({
  ...createDevicesSlice(...a),
  ...createGroupsSlice(...a),
  ...createSensorsSlice(...a),
  ...createSysSlice(...a),
  ...createSchedulesSlice(...a)
}));


async function initStore() {
  useStore.setState({
    devices: await getRemote<deviceData[]>('devices'),
    groups: await getRemote<groupData[]>('groups'),
    sensors: await getRemote<sensor[]>('sensors'),
    rules: await getRemote<ruleData[]>('scheduler'),
    buildVersion: await getBuildVersion()
  });

  const ws = new WS();

  ws.on('open', () => {
    useStore.getState().setWsConnected(true)
  });

  ws.on('close', () => {
    useStore.getState().setWsConnected(false)
  });

  //TODO make enums with WS events
  ws.on('DEVICES_UPDATE', (data: unknown) => {
    useStore.getState().updateDevices(data as deviceData[]);
  });

  ws.on('SENSORS_UPDATE', (data: unknown) => {
    useStore.getState().updateSensors(data as sensor[]);
  });

  // init ws connection after setting the subscriptions to prevent missing the 'open' message
  const { wsPort } = await fetch(`${apiURL}cfg`).then(r => r.json()); // websocket port is set up on the backend
  ws.init(`ws://${window.location.host.split(':')[0]}:${wsPort}`);
}

initStore();
export default useStore;