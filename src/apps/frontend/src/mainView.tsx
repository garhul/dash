import { useState } from 'react';
import { Container } from 'react-bootstrap';

import NavBar from './components/NavBar';
import SensorsView from './views/Sensors';
import DevicesView from './views/Devices';
import HomeView from './views/Home';
import AdminView from './views/Admin';

export function MainView() {
  const [location, updateLocation] = useState(window.location.hash || "#home");
  return (
    <div>
      <NavBar onChange={(w) => updateLocation(w)} location={location}></NavBar>
      <Container id="MainView">
        {location === '#admin' ? <AdminView /> : null}
        {location === '#sensors' ? <SensorsView /> : null}
        {location === '#devices' ? <DevicesView /> : null}
        {location === '#home' ? <HomeView /> : null}
      </Container >
    </div>
  );
}