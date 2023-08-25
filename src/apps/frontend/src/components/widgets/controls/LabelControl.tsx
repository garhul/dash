import { Badge } from "react-bootstrap";

export type labelProps = {
  children: string;
}

export default function LabelControl({ children }: labelProps) {
  return (<Badge bg="primary">{children}</Badge>)
}