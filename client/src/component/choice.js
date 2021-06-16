import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

function Choice(props) {
    const {index, choicesTitle, indexQuest}=props
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Radio aria-label="Radio button for following text input" />
                </InputGroup.Prepend>
                <FormControl required onChange= {ev=> choicesTitle(indexQuest, index, ev.target.value)} />
            </InputGroup>
        </div>
    );
}

export default Choice;