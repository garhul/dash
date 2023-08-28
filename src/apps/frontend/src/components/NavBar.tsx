import { Container, Nav, Navbar } from 'react-bootstrap'
import { AiFillHome } from 'react-icons/ai';
import VersionBadge from './VersionBadge';
import WsBadge from './WsBadge';

export type navBarProps = {
  location: string;
  onChange: (l: string) => void;
}

export default function NavBar({ location, onChange }: navBarProps) {
  const navLinks = [
    ['#home', 'Home'],
    ['#devices', 'Devices'],
    ['#sensors', 'Sensors'],
    ['#admin', 'Admin'],
  ].map(
    ([hash, name]) => (
      <Nav.Link
        key={`nav_${hash}`}
        onClick={() => { onChange(hash) }}
        href={hash} active={location === hash}>{name}</Nav.Link>
    ));

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg" collapseOnSelect={true}>
      <Container fluid>
        <Navbar.Brand><AiFillHome style={{ "fontSize": "3vh" }}></AiFillHome></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {navLinks}
          </Nav>
        </Navbar.Collapse>
        <WsBadge />
        <VersionBadge />
      </Container>
    </Navbar >
  );

}



