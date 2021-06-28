import React, {  useState } from 'react';
import { Form } from 'react-bootstrap';





function CheckboxAnswer(props) {
    let {  setResponse, question } = props
    let { choices, idQuestion, label, min , max } = question
    const [isChecked, setIsChecked] = useState(Array(JSON.parse(choices).length).fill(false))
    const handleCheckBox = (indexC, event) => {
        setResponse(old => {
            let modifyItem = old[idQuestion]
            let choice = {}
            let indexBox = modifyItem.indexOf(event.target.value)
            if (indexBox >= 0) {
                modifyItem = [...modifyItem.slice(0, indexBox), ...modifyItem.slice(indexBox + 1)]
                choice[idQuestion] = modifyItem
            }
            else {
                modifyItem = [...modifyItem, event.target.value];
                choice[idQuestion] = modifyItem
            }

            return {...old, ...choice}
        })
        setIsChecked(old => old.map((value, index) => index === indexC ? !value : value))
    }


    choices = JSON.parse(choices)
    return (<>
        {choices.map((choice, indexC) =>
            <Form.Check key={indexC}  >
                <Form.Check.Input required={!isChecked.includes(true) ? question.mandatory : false}
                    type='checkbox' min = {min} max= {max}
                    name={label}
                    value={choice}
                    checked={isChecked[indexC]}
                    onChange={event => handleCheckBox(indexC, event)}
                />
                <Form.Check.Label>{choice} </Form.Check.Label>
            </Form.Check>
        )}
    </>);
}



function RadioAnswer(props) {
    let {  setResponse, question } = props
    const [isChecked, setIsChecked] = useState(false)
    let { choices, idQuestion, label, min, max } = question
    const radioAnswer = (event) => {
        setResponse(old => {
            let modifyItem = {}
            modifyItem[idQuestion] = [event.target.value]
            return { ...old,  ...modifyItem }
        })
        setIsChecked(true)
    }

    choices = JSON.parse(choices)
    return (
        <div>
            {
                choices.map((choice, indexC) =>
                    <Form.Check key={indexC}  >
                        <Form.Check.Input  name={label} type='radio'
                            value={choice} min={min} max= {max}
                            required={!isChecked? question.mandatory:false}
                            onChange={ev => radioAnswer(ev)}
                        />
                        <Form.Check.Label>{choice} </Form.Check.Label>
                    </Form.Check>
                )
            }

        </div>
    );
}


function TextAnswer(props) {
    const { setResponse, question } = props
    const {idQuestion, mandatory}= question
    const TextAnswer = (event) => {
        setResponse(old => {
            old[idQuestion] = [event.target.value]
            return { ...old }
        })
    }
    return (
        <>
            <Form.Control as="textarea" maxLength={200} placeholder="name@example.com"   required = {mandatory}
                onChange={ev => TextAnswer(ev)} />
        </>
    );
}

export { CheckboxAnswer, RadioAnswer, TextAnswer };