// import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
// import Devices from './widgets/adminDevicesWidget';
// import Rules from './widgets/rulesWidget';

function SysInfo() {
  return (
    <Container className="widget">
      SysInfo Be here (Hostname) load, temp, uptime, mqtt traffic stats, etc);
    </Container>
  );
}

function Groups() {
  return (<Container className="widget">Editable group data be here</Container>)
}

export default function AdminView() {
  return (
    <div className="AdminWidget">
      <SysInfo />
      {/* <Devices />
      <Groups />
      <Rules /> */}
    </div >
  );
}