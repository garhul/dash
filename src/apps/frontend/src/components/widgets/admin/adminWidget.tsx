import { ReactNode } from "react";
import { Container } from "react-bootstrap";

export type adminWidgetProps = {
  title: string;
  actions: ReactNode;
  children: ReactNode | string;
}

export default function AdminWidget(props: adminWidgetProps) {
  return (
    <Container className='widget'>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <h2>{props.title}</h2>
        {props.actions}
      </div>
      <Container style={{ marginTop: '2em' }}>
        {props.children}
      </Container>
    </Container >
  );
}