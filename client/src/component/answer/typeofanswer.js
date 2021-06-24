import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';





function CheckboxAnswer(props) {
    let { index, setResponse, question } = props
    let { choices, idQuestion, label } = question
    const [isChecked, setIsChecked] = useState(Array(JSON.parse(choices).length).fill(false))
    const handleCheckBox = async (indexC, index, event) => {
        await setResponse(old => {
            let modifyItem = { ...old[index] }
            let indexBox = modifyItem.values.indexOf(event.target.value)
            if (indexBox >= 0)
                modifyItem.values = [...modifyItem.values.slice(0, indexBox), ...modifyItem.values.slice(indexBox + 1)]

            else
                modifyItem.values = [...modifyItem.values, event.target.value];

            modifyItem.idQuestion = idQuestion
            return [...old.slice(0, index), modifyItem, ...old.slice(index + 1)]
        })
        setIsChecked(old => old.map((value, index) => index === indexC ? !value : value))
    }


    choices = JSON.parse(choices)
    return (<>
        {choices.map((choice, indexC) =>
            <Form.Check key={indexC}  >
                <Form.Check.Input required={ !isChecked.includes(true)? question.mandatory : false }
                    type='checkbox'
                    name={label}
                    value={choice}
                    checked={isChecked[indexC]}
                    onChange={event => handleCheckBox(indexC, index, event)}
                />
                <Form.Check.Label>{choice} </Form.Check.Label>
            </Form.Check>
        )}
    </>);
}



function RadioAnswer(props) {
    let { index, setResponse, question  } = props
    let { choices, idQuestion, label, min, max } = question
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
                        <Form.Check.Input required name={label} type='radio'
                            value={choice}
                            required={question.mandatory}
                            onChange={ev => radioAnswer(ev.targert.value)}
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