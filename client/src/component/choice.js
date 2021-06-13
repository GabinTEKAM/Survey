import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

function Choice(props) {
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Radio aria-label="Radio button for following text input" />
                </InputGroup.Prepend>
                <FormControl aria-label="Text input with radio button" />
            </InputGroup>
        </div>
    );
}

export default Choice;