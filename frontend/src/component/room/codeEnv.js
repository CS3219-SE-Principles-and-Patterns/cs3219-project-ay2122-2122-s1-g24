import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Controlled as Editor } from 'react-codemirror2';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/clike/clike.js';

const DEFAULT_VALUE = '// Enter code here';
const OTHER_USER_ORIGIN = 'from-other-user';

const CodeEnv = ({ id, socket, history }) => {
  const [code, setCode] = useState(DEFAULT_VALUE);
  const token = Cookies.get('token');
  const [editorState, setEditor] = useState(null);

  const setCodeValue = (changes, value) => {
    setCode(value);

    if (changes.origin === OTHER_USER_ORIGIN) return;

    socket.emit('update', { auth: token, room: id, updates: changes });
  };


  useEffect(() => {
    const listener = ({ changes, token: sentToken }) => {
      if (token === sentToken) return;
      const { text, from, to } = changes;

      if (editorState)
        editorState.replaceRange(text, from, to, OTHER_USER_ORIGIN);
    };

    const endListener = async () => {
      if (editorState)
        await postAnswers(editorState.getValue());
    }

    socket.on('docUpdate', listener);

    socket.on('finalizeEnd', endListener);

    return () => {

      socket.off('finalizeEnd', endListener);
      socket.off('docUpdate', listener);
    };
  }, [editorState]);

  const endSession = () => {
    socket.emit('initiateEnd', {
      auth: token,
      room: id
    });
  };

  const postAnswers = async (ans) => {
    if (ans === DEFAULT_VALUE) return;

    const axiosInstance = axios.create({ baseURL: 'http://localhost:8080' });

    try {
      await axiosInstance.post(
        '/answers',
        {
          answer: ans,
          roomid: id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      history.push('/');
    }
  };

  return (
    <Container>
      <Row>
        <Editor
          value={code}
          options={{
            mode: 'text/x-java',
            theme: 'monokai',
            lineNumbers: true,
            autofocus: true
          }}
          editorDidMount={editor => {
            setEditor(editor);
          }}
          onBeforeChange={(editor, data, value) => {
            setCodeValue(data, value);
          }}
        />
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Col>
          <Button className="float-end" onClick={endSession}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(CodeEnv);
