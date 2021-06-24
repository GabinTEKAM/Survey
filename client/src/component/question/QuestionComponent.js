import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';

function QuestionTitle(props) {
    const { questionAttribut, index } = props

    return (
        <Form.Control
            name='label' inline
            bsPrefix="form-control required"
            placeholder="question label"
            required
            onChange={event => questionAttribut(index, event.target.value, event.target.name)}
        />
    );
}



function Choice(props) {
    const { index, choicesTitle, indexQuest, deleteChoice } = props
    return (<>
        <div className="col-md-9">
            <div className="survey-group">
                <FormControl placeholder="Option label"
                    required bsPrefix="form-control required" onChange={ev => choicesTitle(indexQuest, index, ev.target.value)} />
            </div>
        </div>
        <div className="col-md-3">
            <Button bsPrefix="btn btn-danger" onClick= {()=>deleteChoice(indexQuest, index)} ><XLg className="fa fa-close mr-2" /> Cancel</Button>

        </div>

    </>);
}

function QuestionText(props) {
    const { questionAttribut, indexQuest } = props
    return (<>
        <div className="col-md-9">
            <div className="survey-group">
                <Form.Control type="text" placeholder="Text Area" readOnly bsPrefix="form-control required" />
            </div>
        </div>
        <div className="col-md-3">
            <div className="survey-group" >
                <Form.Control inline as="select" defaultValue="Optional" bsPrefix="custom-select custom-select-lg"
                    name="mandatory" onChange={(ev) => questionAttribut(indexQuest, ev.target.value, ev.target.name)} >
                    <option value={false}> Optional</option>
                    <option value={true}>Mandatory</option>
                </Form.Control>
            </div>
        </div>

    </>);
}


function Selectype(props) {
    const { typeOfQuestion, index } = props
    return (
        <Form.Control inline as="select" defaultValue="Radio" bsPrefix="custom-select custom-select-lg"
            onChange={(ev) => typeOfQuestion(index, ev.target.value)} >

            <option value='Radio'> Radio</option>
            <option value="Text">TextArea</option>

        </Form.Control>
    );
}
export { QuestionTitle, Choice, QuestionText, Selectype };