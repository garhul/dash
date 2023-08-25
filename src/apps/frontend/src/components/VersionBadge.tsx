import { Badge } from "react-bootstrap";
import useStore from "../store";

export default function VersionBadge() {
  const version = useStore((state) => state.buildVersion);
  return (<Badge bg="info" text="dark" style={{ opacity: '.75', fontWeight: 100 }} >{version}</Badge>)
}