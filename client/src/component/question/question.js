import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import Number from './numberanswer';
import QuestionBody from './questionbody';
import {QuestionTitle, Selectype} from './QuestionComponent'
import "../../css/surver-question.css"
import { QuestionCircleFill, TrashFill, PlusLg } from 'react-bootstrap-icons';

function Question(props) {
    const { index, question, setQuestions, questions } = props
    const questType = question.typeofquestion
    const choice = ['']

    const questionAttribut = (index, value, name) => {
        setQuestions(old => {
            let label = {...old[index]}
            label[name] = value

            return [...old.slice(0, index), label, ...old.slice(index + 1)]
        })
    }
    const deleteQuestion = (index) => {
        setQuestions(old => [...old.slice(0, index), ...old.slice(index + 1)])
    }

    const typeOfQuestion = (index, value) => {
        setQuestions(old => {
            let label = {...old[index]}
            if (value === "Text") {
                delete label.choices
                delete label.max
                delete label.min
            }
            else {
                label.choices = [choice]
                label.max = ""
                label.min = ""
            }
            label.typeofquestion = value
            return [...old.slice(0, index), label, ...old.slice(index + 1)]
        })
    }

    const choicesTitle = (index, indexC, value) => {
        setQuestions(old => {
            let label = {...old[index]}
            label.choices[indexC] = value
            return [...old.slice(0, index), label, ...old.slice(index + 1)]
        })
    }
    const deleteChoice = (index, indexC) => {
        console.log(`inside`, )
        setQuestions(old => {
            let label = {...old[index]}
            const modifyChoice = label.choices
            if(modifyChoice.length>1)
                label.choices = [...modifyChoice.slice(0, indexC), ...modifyChoice.slice(indexC+1)]
            return [...old.slice(0, index), label, ...old.slice(index + 1)]
        })
    }

    const addChoices = (index) => {
        setQuestions(old => {
            let modifyItem = { ...old[index] }
            modifyItem.choices = [...modifyItem.choices, ""]
            return [...old.slice(0, index), modifyItem, ...old.slice(index + 1)]

        })
    }




    return (
        <div className="wrapper-survey-question">
            <Card bsPrefix="wrapper-survey-question" >
                <div className="survey-question">
                    <Card.Header bsPrefix="survey-question-header" >
                        <Row>
                            <div className="col-md-9">
                                <div className="survey-group" >
                                    <span className='question-label-icon'>
                                   <QuestionCircleFill className = "fa fa-question-circle " color="#007bff"  /></span>
                                    <QuestionTitle questionAttribut={questionAttribut} question={question} index={index} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="survey-group" >
                                    <Selectype index={index} typeOfQuestion={typeOfQuestion} />
                                </div>
                            </div>
                        </Row>
                    </Card.Header>
                    <Card.Body bsPrefix="survey-question-body">
                        <Row>
                            <div className="col-md-9" >

                                {questType !== 'Text' && <><Number.Minimun index={index} question={question} questionAttribut={questionAttribut} />
                                    <Number.Maximun index={index} question={question} questionAttribut={questionAttribut} /></>}
                            </div>
                        </Row>
                        <Row>
                            <QuestionBody questType={questType} question={question} questionAttribut={questionAttribut} deleteChoice={deleteChoice} choicesTitle={choicesTitle} indexQuest={index} />
                        </Row>
                        <div className="add-other">
                            {questType === 'Text' ? "" : <Button  size="lg" bsPrefix="btn btn-primary" 
                            onClick={() => addChoices(index)}>< PlusLg className="fa fa-plus mr-2"/> Other</Button>}
                        </div>
                    </Card.Body>
                    <Card.Footer bsPrefix="survey-question-footer" >
                        <Row>
                        <div className="col-md-9">
                        </div>
                        <div className="col-md-3">
                           {questions.length > 1 && <Button type="button" 
                            onClick={() => deleteQuestion(index)}bsPrefix="btn btn-outline-danger mw-85"> <TrashFill className="fa fa-trash mr-2"/> Delete</Button>}
                        </div>
                        </Row>
                    </Card.Footer>
                </div>
            </Card>
        </div>
    );
}

export default Question;