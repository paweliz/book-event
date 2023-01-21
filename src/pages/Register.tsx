import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../hooks/AuthContext';

const Register = () => {
  const { signup } = useAuth();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    signup(event.email, event.password);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='formEmail'>
        <Form.Label>Adres email</Form.Label>
        <Form.Control
          value={formValues.email}
          onChange={(event) =>
            setFormValues((prev: any) => {
              return { ...prev, email: event.target.value };
            })
          }
          type='email'
          placeholder='mail@example.com'
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Hasło</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={formValues.password}
          onChange={(event) =>
            setFormValues((prev: any) => {
              return { ...prev, password: event.target.value };
            })
          }
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Zarejestruj się
      </Button>
    </Form>
  );
};

export default Register;
