import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";

export type buttonControlProps = {
  variant: ButtonVariant;
  children: string | ReactNode;
  onClick: () => void;
}

export default function ButtonControl({ variant, children, onClick }: buttonControlProps) {
  return (<Button variant={variant || "outline-info"} size="lg" onClick={onClick}>{children}</Button>)
}