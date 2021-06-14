import React, { useState } from 'react';
import { Button, Card, InputGroup, Form } from 'react-bootstrap';
import Number from './numberanswer';
import QuestionBody from './questionbody';
import QuestionTitle from './questiontitle';
import Selectype from './selecttype';

function Question(props) {
    const {  index, question, setQuestions } = props
    const questType = question.typeofquestion
    const choice = {
        name: ""
    }
    const questionTitle = (index, value) => {
        setQuestions(old => {
            let label = old[index]
            label.label = value
            old.splice(index, 1, label)
            return [...old]
        })
    }
    const questionAttribut = (index, value, name) => {
        setQuestions(old => {
            let label = old[index]
            label[name ]= value
            old.splice(index, 1, label)
            return [...old]
        })
    }
    const deleteQuestion = (index) => {
        setQuestions(old => {

            old.splice(index, 1)
            return [...old]
        })
    }
    const typeOfQuestion = (index, value) => {
        setQuestions(old => {
            let label = old[index]
            if (value === "Text"){
                delete label.choices
                delete label.max
                delete label.min }
            else {
               label.choices = [choice]          
            }
            label.typeofquestion = value
            old.splice(index, 1, label)
            return [...old]
        })
    }
    const choicesTitle = (index, value) => {
        setQuestions(old => {
            let label = old[index]
            label.label = value
            old.splice(index, 1, label)
            return [...old]
        })
    }

    const addChoices = (index) => {
        setQuestions(old => {
            let items = old[index].choices
            if (items) {
                old.splice(index, 1, { ...old[index], choices: [...items, choice] })
                console.log('valide');
            }
            else {
                console.log('false');
                old.splice(index, 1, { ...old[index], choices: [choice] })
            }
            return [...old]
        })
    }




    return (
        <div>
            <Card  >
                <Card.Header>
                    <QuestionTitle questionAttribut={questionAttribut} question={question} index={index} />
                    <Selectype index={index} typeOfQuestion={typeOfQuestion} />
                </Card.Header>
                <Card.Body>
                    <Number.Minimun index={index} question={question} questionAttribut={questionAttribut} />
                    <Number.Maximun index={index} question={question} questionAttribut={questionAttribut} />
                    <QuestionBody questType={questType} question={question} />
                   {questType==='Text'?"":<Button variant="success" size="lg" className="fixed-right-bottom" onClick={() => addChoices(index)}>&#43;</Button>} 
                </Card.Body>
                <button variant='warning' onClick={() => deleteQuestion(index)}>delete</button>
            </Card>
        </div>
    );
}

export default Question;