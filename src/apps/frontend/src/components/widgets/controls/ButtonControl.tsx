import { ReactNode } from "react";
import { Button } from "react-bootstrap";

export type buttonControlProps = {
  style: string;
  children: string | ReactNode;
  onClick: () => void;
}

export default function ButtonControl({ style, children, onClick }: buttonControlProps) {
  return (<Button variant={style || "outline-info"} size="lg" onClick={() => onClick}>{children}</Button>)
}