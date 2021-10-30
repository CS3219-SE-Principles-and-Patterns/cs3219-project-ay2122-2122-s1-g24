import React, { useState } from 'react';
import CodeEnv from './codeEnv';
import Question from './question';

const DEFAULT_VALUE = '// Enter code here'

const Room = () => {
    return (
        <div>
            <Question/>
            <CodeEnv/>
        </div>
    )
}

export default Room;