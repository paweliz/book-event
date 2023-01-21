import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import EventElement from '../components/EventElement';

interface usersModel {
  email: string;
  id: string;
  role: 'ADMIN' | 'CLIENT' | 'MODERATOR';
}
const events = [
  {
    email: 'lorem@ipsum.com',
    role: 'MODERATOR',
  },
  {
    email: 'lorem@ipsum.com',
    role: 'ADMIN',
  },
  {
    email: 'lorem@ipsum.com',
    role: 'CLIENT',
  },
];

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const res = axios.get(`users/all`);
      //@ts-ignore
      setUsers(res.data);
    } catch (e: any) {
      window.prompt(e);
    }
  }, []);
  const handleRoleChange = (
    userId: string,
    role: 'ADMIN' | 'MODERATOR' | 'CLIENT'
  ) => {
    try {
      axios.put(`user/${userId}/role=${role}`);
    } catch (e) {
      window.prompt('Wystąpił błąd' + e);
    }
  };

  return (
    <Container>
      <Col
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        {users?.length > 0 &&
          users.map((item: usersModel, index) => (
            <Row
              className='shadow p-3 mb-5 bg-white rounded align-bottom'
              style={{
                marginTop: '3rem',
              }}>
              <Col xs={6}>{item.email}</Col>

              <Col>{item.role}</Col>
              <Col>
                {item.role !== 'ADMIN' && (
                  <Button
                    onClick={() => {
                      handleRoleChange(item.id, 'ADMIN');
                    }}>
                    Ustaw jako admina
                  </Button>
                )}
                {item.role !== 'MODERATOR' && item.role !== 'ADMIN' && (
                  <Button
                    className='mt-4'
                    onClick={() => {
                      handleRoleChange(item.id, 'MODERATOR');
                    }}>
                    Ustaw jako moderatora
                  </Button>
                )}
                {item.role !== 'CLIENT' && (
                  <Button
                    className='mt-4'
                    onClick={() => {
                      handleRoleChange(item.id, 'CLIENT');
                    }}>
                    Ustaw jako klient
                  </Button>
                )}
              </Col>
            </Row>
          ))}
      </Col>
    </Container>
  );
};

export default Users;
