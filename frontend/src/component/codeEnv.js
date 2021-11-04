import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Controlled as Editor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/clike/clike.js';

const DEFAULT_VALUE = '// Enter code here';
const OTHER_USER_ORIGIN = 'from-other-user';

const CodeEnv = ({ id, socket }) => {
  const [code, setCode] = useState(DEFAULT_VALUE);
  const { token } = useAuth();
  const [editorState, setEditor] = useState(null);

  const setCodeValue = (changes, value) => {
    setCode(value);

    if (changes.origin == OTHER_USER_ORIGIN) return;

    socket.emit(
      'update',
      { auth: token, room: id, updates: changes },
    );
  };

  useEffect(() => {
    const listener = ({ changes, token: sentToken }) => {
      if (token == sentToken) return;
      const { text, from, to } = changes;

      if (editorState)
        editorState.replaceRange(text, from, to, OTHER_USER_ORIGIN);
    };

    socket.on('docUpdate', listener);

    return () => { socket.off('docUpdate', listener); }
  }, [editorState]);

  return (
    <Editor
      value={code}
      options={{
        mode: 'text/x-java',
        theme: 'monokai',
        lineNumbers: true,
        autofocus: true
      }}
      editorDidMount={(editor) => {
        setEditor(editor);
      }}
      onBeforeChange={(editor, data, value) => {
        setCodeValue(data, value);
      }}
    />
  );
};

export default CodeEnv;
