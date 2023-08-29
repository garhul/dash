import { ReactNode } from "react";
import { Container } from "react-bootstrap";

export interface widgetProps {
  visibleFace: "front" | "back";
  title: ReactNode;
  front: ReactNode;
  back?: ReactNode;
}

export default function Widget<T extends widgetProps>({ title, front, back, visibleFace }: T) {
  return (
    <Container className={`widget`}>
      <>
        {title}
        {(visibleFace === 'front') ? front : back || front}
      </>
    </Container>
  )
}