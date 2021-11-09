import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import Answer from './Answer';

const Answers = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const axiosInstance = axios.create({ baseURL: '' });
      const token = Cookies.get('token');

      try {
        const { data: userAnswers } = await axiosInstance.get('/answers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        userAnswers.sort((answer1, answer2) => {
          const firstDate = new Date(answer1.createdAt);
          const secondDate = new Date(answer2.createdAt);

          if (firstDate >= secondDate) return -1;
          else return 1;
        });

        setAnswers(userAnswers);
      } catch (err) {
        return;
      }
    };

    fetchData();
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      {answers.map((answer, id) => {
        return (
          <Answer key={id} id={id} answer={answer} />
        )
      })}
    </Accordion>
  );
};

export default Answers;
