import React from 'react';
import { Form } from 'react-bootstrap';




function CheckboxAnswer(props) {
    let {  index, setResponse,question , Response, valueBox } = props
    let {choices, idQuestion, }= question
    const handleCheckBox = (idQuestion, index, event) => {
        setResponse(old => {
            let modifyItem = { ...old[index] }
            let indexBox = modifyItem.values.indexOf(event.target.value)
            if (indexBox >= 0)
                modifyItem.values = [...modifyItem.values.slice(0, indexBox), ...modifyItem.values.slice(indexBox + 1)]

            else
                modifyItem.values = [...modifyItem.values, event.target.value];

            modifyItem.idQuestion = idQuestion
            return [...old.slice(0, index), modifyItem, ...old.slice(index + 1)]
        })
    }
    
    choices = JSON.parse(choices)
    return (<>
        {choices.map((choice, indexC) =>
            <Form.Check key={indexC}  >
                <Form.Check.Input required={question.mandatory} type='checkbox' 
                name = {question.label}
                value={choice}
                    checked={valueBox(choice, index) ? true : false} 
                    onChange={event => handleCheckBox(idQuestion, index, event)}
                />
                <Form.Check.Label>{choice} </Form.Check.Label>
            </Form.Check>
        )}
    </>);
}



function RadioAnswer(props) {
    let { choices, index, setResponse, idQuestion, valueBox } = props
    const radioAnswer = (value) => {
        setResponse(old => {
            let modifyItem = { ...old[index] }
            modifyItem.values = [value]
            modifyItem.idQuestion = idQuestion
            return [...old.slice(0, index), modifyItem, ...old.slice(index + 1)]
        })
    }


    choices = JSON.parse(choices)
    return (
        <div>
            {
                choices.map((choice, indexC) =>
                    <Form.Check key={indexC}  >
                        <Form.Check.Input required name='autoconf' type='radio' value={choice}
                            checked={valueBox(choice,  index) ? true : false} onChange={ev => radioAnswer(ev.targert.value)}
                        />
                        <Form.Check.Label>{choice} </Form.Check.Label>
                    </Form.Check>
                )
            }

        </div>
    );
}


function TextAnswer(props) {
    const { setResponse, index, idQuestion } = props
    const TextAnswer = (event) => {
        setResponse(old => {
            let modifyItem = { ...old[index] }
            modifyItem.values = [event.target.value]
            modifyItem.idQuestion = idQuestion
            return [...old.slice(0, index), modifyItem, ...old.slice(index + 1)]
        })
    }

    return (
        <>
            <Form.Control type="text" maxLength={200} placeholder="name@example.com"
                onChange={ev => TextAnswer(ev)} />
        </>
    );
}

export { CheckboxAnswer, RadioAnswer, TextAnswer };