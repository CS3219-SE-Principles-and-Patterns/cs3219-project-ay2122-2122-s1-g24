import React, { useState } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/clike/clike.js'

const DEFAULT_VALUE = '// Enter code here'

const CodeEnv = () => {
    const [ code, setCode ] = useState(DEFAULT_VALUE);
    return (
        <CodeMirror
                value= { code }
                options={{
                    mode: 'text/x-java',
                    theme: 'monokai',
                    lineNumbers: true
                }}
                onChange={(editor, data, value) => {
                    setCode(value);
                }}
        />
    )
}

export default CodeEnv;