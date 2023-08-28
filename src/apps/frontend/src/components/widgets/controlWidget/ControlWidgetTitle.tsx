import { device } from "@dash/sharedTypes";
import { Col, Badge, Row } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { controlWidgetTypes } from "./types";

type widgetTitleProps = {
  type: keyof typeof controlWidgetTypes;
  onViewToggle: () => void;
  name: string;
  ip?: string;
  devices?: device[];
}

export default function ControlWidgetTitle({ name, onViewToggle, type, ip, devices }: widgetTitleProps) {

  const badges = (type === 'GROUP' && devices) ?
    (<Col className="badges">
      {devices.map((d: device, index: number) => <Badge bg="secondary" key={`badge_${index}`} text="dark">{d.human_name}</Badge>)}
    </Col>) : null;

  return (
    <Row className="title">
      <Col className="titleText">
        {ip ? (<span><a href={`http://${ip}`} rel="noopener noreferrer" target="_blank">{name}</a></span>) : (<span>{name}</span>)}
      </Col>
      {badges}
      <Col className="info">
        <AiOutlineInfoCircle onClick={onViewToggle} />
      </Col>
    </Row>
  );
}