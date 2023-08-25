import { Badge } from "react-bootstrap";
import { AiOutlineWarning } from "react-icons/ai";
import useStore from "../store";

export default function WsBadge() {
  const wsConnected = useStore((state) => state.wsConnected);
  return (<Badge className={wsConnected ? 'hide' : ''} bg="dark" text="warning"><AiOutlineWarning style={{ fontSize: "2vh" }} /> Websocket Disconnected</Badge>)
}