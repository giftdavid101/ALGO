import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditorComponent = () => {
    return (
        <Editor
            height="40vh"
            width={"80vh"}
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme="vs-dark"
        />
    );
};

export default MonacoEditorComponent;
