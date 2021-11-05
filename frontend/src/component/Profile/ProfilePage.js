import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Cookies from 'js-cookie'
import Answers from './Answers';

const ProfilePage = () => {
  const username = Cookies.get('username');
  const picture = Cookies.get('picture');

  return (
    <Container>
      <Row style={{ marginTop: '2rem' }}>
        <Col lg={2}>
          <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>{username}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Answers />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
