import axios from 'axios';
import { title } from 'process';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { NumberPicker } from 'react-widgets/cjs';
import EventElement from '../components/EventElement';

const PreviewEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    seatsAvailable: 0,
    seatsTotal: 0,
    imageUri: '',
    id: id,
  });
  useEffect(() => {
    (async () =>
      await axios
        .get(`eventDetails/${id}`)
        .then((res) => {
          setEventData(res.data);
        })
        .catch((e) => console.log(e)))();
  }, [id]);
  const [show, setShow] = useState(false);
  const [seatsValue, setSeatsValue] = useState<any>(1);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const handleClose = () => setShow(false);
  const handleSubmit = () =>
    axios
      .post(`/reserve/${id}`, {
        seatsNumber: seatsValue,
      })
      .then(() => {
        window.prompt('Gratulacje. Dokonałeś rezerwacji miejsc.');
        goBack();
      })
      .catch(() => {
        window.prompt('Wystąpił błąd');
      });
  const handleShow = () => setShow(true);

  return (
    <Container fluid='md' style={{ justifyContent: 'center' }}>
      <Card style={{ width: '50rem' }}>
        <Card.Img variant='top' src={eventData?.imageUri} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{eventData?.description}</Card.Text>
          <Card.Text>
            Wolne miejsca: {eventData?.seatsAvailable}/{eventData?.seatsTotal}
          </Card.Text>
        </Card.Body>

        {eventData?.seatsAvailable ? (
          <Button onClick={handleShow}>Zarezerwuj</Button>
        ) : (
          <Button disabled>Brak wolnych miejsc</Button>
        )}
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wybierz liczbę miejsc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Liczba dostępnych miejsc: {eventData?.seatsAvailable}</div>
          <NumberPicker
            value={seatsValue}
            onChange={(value) => setSeatsValue(value)}
            min={1}
            max={eventData?.seatsAvailable}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Wróć
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Zarezerwuj
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </Container>
  );
};

export default PreviewEvent;
