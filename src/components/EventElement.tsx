import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface EventElementProps {
  image: string;
  title: string;
  id: string;
}

const EventElement = ({ image, title, id }: EventElementProps) => {
  return (
    <LinkContainer to={`/event/${id}`}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default EventElement;
