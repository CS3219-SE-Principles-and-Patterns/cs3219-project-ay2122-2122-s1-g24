import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/clike/clike.js';
import * as Automerge from 'automerge';

const DEFAULT_VALUE = '// Enter code here';

const CodeEnv = ({ id, socket }) => {
  const [code, setCode] = useState(DEFAULT_VALUE);
  let doc = Automerge.init(DEFAULT_VALUE);
  const { token } = useAuth();

  const setCodeValue = value => {
    setCode(value);
    socket.emit(
      'update',
      { auth: token, room: id, updates: value },
    );
  };

  socket.on('docUpdate', changes => {
    setCode(changes);
  });

  return (
    <CodeMirror
      value={code}
      options={{
        mode: 'text/x-java',
        theme: 'monokai',
        lineNumbers: true
      }}
      onChange={(editor, data, value) => {
        setCodeValue(value);
      }}
    />
  );
};

export default CodeEnv;
