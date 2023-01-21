import axios from 'axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { resizeFile } from '../utils';

const EventForm = () => {
  const seatsNumber = Array.from(Array(100).keys());
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    date: '',
    seatsNumber: undefined,
  });
  const [file, setFile] = useState(undefined);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    try {
      axios.post('event/create', {
        title: formValues.title,
        description: formValues.description,
        date: formValues.date,
        seats: formValues.seatsNumber,
        image: file,
      });
    } catch (e) {
      //@ts-ignore
      window.prompt(e);
    }
  };

  const handleImageChange = (e: any) => {
    let selected = e.target.files[0];
    if (selected) {
      resizeFile(selected, 1200, 1200).then((file) => {
        console.log(file);
        //@ts-ignore
        setFile(file);
      });
    } else {
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formTitle'>
        <Form.Label>Tytuł</Form.Label>
        <Form.Control
          type='title'
          placeholder='Wydarzenie Lorem Ipsum...'
          value={formValues.title}
          onChange={(event) =>
            setFormValues((prev: any) => {
              return { ...prev, title: event.target.value };
            })
          }
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formDescription'>
        <Form.Label>Opis</Form.Label>
        <Form.Control
          value={formValues.description}
          onChange={(event) =>
            setFormValues((prev: any) => {
              return { ...prev, description: event.target.value };
            })
          }
          type='title'
          as='textarea'
          placeholder='Opis wydarzenia lorem ipsum...'
        />
      </Form.Group>
      <Form.Group controlId='formDate' className='mb-3'>
        <Form.Label>Data wydarzenia</Form.Label>
        <Form.Control
          type='date'
          name='date'
          placeholder='dd.mm.rrrr'
          value={formValues.date}
          onChange={(event) =>
            setFormValues((prev: any) => {
              return { ...prev, date: event.target.value };
            })
          }
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formSeats'>
        <Form.Label>Liczba miejsc</Form.Label>
        <Form.Select
          aria-label='liczba miejsc'
          value={formValues.seatsNumber}
          onChange={(event) =>
            setFormValues((prev: any) => {
              return { ...prev, seatsNumber: event.target.value };
            })
          }>
          <option>Wybierz maksymalna liczbę miejsc</option>
          {seatsNumber.map((item) => (
            <option value={item + 1}>{item + 1}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId='formFile' className='mb-3'>
        <Form.Label>Zdjęcie</Form.Label>
        <Form.Control
          type='file'
          accept='.jpg, .jpeg, .png'
          // value={formValues.image.name}
          onChange={handleImageChange}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Dodaj wydarzenie
      </Button>
    </Form>
  );
};

export default EventForm;
