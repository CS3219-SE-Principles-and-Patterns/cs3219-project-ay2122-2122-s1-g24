import React, { useState } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/clike/clike.js'

const DEFAULT_VALUE = '// Enter code here'

const CodeEnv = () => {
    const [ code, setCode ] = useState(DEFAULT_VALUE);
    setCodeValue((value) => {
        setCode(value);
        socket.emit('coding event', {
            room: this.props.challenge.id,
            newCode: newText
        })
    });
    return (
        <CodeMirror
                value= { code }
                options={{
                    mode: 'text/x-java',
                    theme: 'monokai',
                    lineNumbers: true
                }}
                onChange={(editor, data, value) => {
                    setCodeValue(value);
                }}
        />
    )
}

export default CodeEnv;