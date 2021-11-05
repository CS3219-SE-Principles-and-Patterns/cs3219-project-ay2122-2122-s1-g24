import React from 'react';
import { Accordion } from 'react-bootstrap';

const Answer = ({ answer: answerObj, id }) => {
  const { title, difficulty, answer } = answerObj;

  const getHeader = () => {
    return difficulty[0].toUpperCase() + difficulty.substring(1) + ': ' + title;
  }

  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>{getHeader()}</Accordion.Header>
      <Accordion.Body style={{ fontFamily: 'monospace, monospace' }}>
        {answer}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Answer;
