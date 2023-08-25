import { useState } from 'react';
import { Container } from 'react-bootstrap';

import { Home, Admin, Sensors, Devices } from './pages';
import NavBar from './components/NavBar';

export function MainView() {
  const [location, updateLocation] = useState(window.location.hash || "#home");
  return (
    <div>
      <NavBar onChange={(w) => updateLocation(w)} location={location}></NavBar>
      <Container id="MainView">
        {location === '#admin' ? <Admin /> : null}
        {location === '#sensors' ? <Sensors /> : null}
        {location === '#devices' ? <Devices /> : null}
        {location === '#home' ? <Home /> : null}
      </Container >
    </div>
  );
}