import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EventElement from '../components/EventElement';

// const events = [
//   {
//     title: 'Lorem ipsum',
//     image:
//       'https://bi.im-g.pl/im/90/d2/14/z21833104IH,Zakonczono-modernizacje-stadionu-Khalifa-Internati.jpg',
//   },
//   {
//     title: 'Lorem ipsum',
//     image:
//       'https://bi.im-g.pl/im/90/d2/14/z21833104IH,Zakonczono-modernizacje-stadionu-Khalifa-Internati.jpg',
//   },
//   {
//     title: 'Lorem ipsum',
//     image:
//       'https://bi.im-g.pl/im/90/d2/14/z21833104IH,Zakonczono-modernizacje-stadionu-Khalifa-Internati.jpg',
//   },
//   {
//     title: 'Lorem ipsum',
//     image:
//       'https://bi.im-g.pl/im/90/d2/14/z21833104IH,Zakonczono-modernizacje-stadionu-Khalifa-Internati.jpg',
//   },
//   {
//     title: 'Lorem ipsum',
//     image:
//       'https://bi.im-g.pl/im/90/d2/14/z21833104IH,Zakonczono-modernizacje-stadionu-Khalifa-Internati.jpg',
//   },
//   {
//     title: 'Lorem ipsum',
//     image:
//       'https://bi.im-g.pl/im/90/d2/14/z21833104IH,Zakonczono-modernizacje-stadionu-Khalifa-Internati.jpg',
//   },
// ];

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('events/all').then((res) => setEvents(res.data));
  }, []);

  return (
    <Container fluid='md'>
      <Row className='justify-content-md-center'>
        {events?.length > 0 &&
          events.map((item, index) => (
            <Col sm={4} className='mt-4'>
              <EventElement
                //@ts-ignore
                title={item.title}
                //@ts-ignore
                image={item.image}
                //@ts-ignore
                id={item.index}
                key={index}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default HomePage;
