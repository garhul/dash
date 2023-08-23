import React, { useState } from 'react';

import AdminView from '../components/adminView';
import SensorsView from './sensors';
import DevicesView from '../pages/devicesView';
import HomeView from './home';

import NavBar from '../components/navigation';
import { Container } from 'react-bootstrap';

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