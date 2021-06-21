import React from 'react';
import { Button, Card, } from 'react-bootstrap';
import Number from './numberanswer';
import QuestionBody from './questionbody';
import QuestionTitle from './questiontitle';
import Selectype from './selecttype';

function Question(props) {
    const { index, question, setQuestions, questions } = props
    const questType = question.typeofquestion
    const choice = ['']

    const questionAttribut = (index, value, name) => {
        setQuestions(old => {
            let label = old[index]
            label[name] = value
            old.splice(index, 1, label)
            return [...old]
        })
    }
    const deleteQuestion = (index) => {
        setQuestions(old => [...old.slice(0, index), ...old.slice(index + 1)])
    }

    const typeOfQuestion = (index, value) => {
        setQuestions(old => {
            console.log(`old`, old)

            let label = old[index]
            console.log(`label `, label)
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
            console.log(`label`, label)
            console.log(` old.splice(index, 1, label)`, old.splice(index, 1, label))
            old.splice(index, 1, label)
            console.log(`[...old]`, [...old])
            return [...old]
        })
    }
    const choicesTitle = (index, indexC, value) => {
        setQuestions(old => {
            let label = old[index]
            label.choices[indexC] = value
            old.splice(index, 1, label)
            return [...old]
        })
    }

    const addChoices = (index) => {
        setQuestions(old => {
            let modifyItem ={... old[index]}
            console.log(`modifyItem`, modifyItem)
            modifyItem.choices = [...modifyItem.choices, ""]
            return [...old.slice(0, index), modifyItem, ...old.slice(index + 1)]

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
                    {questType !== 'Text' && <><Number.Minimun index={index} question={question} questionAttribut={questionAttribut} />
                        <Number.Maximun index={index} question={question} questionAttribut={questionAttribut} /></>}
                    <QuestionBody questType={questType} question={question} choicesTitle={choicesTitle} indexQuest={index} />
                    {questType === 'Text' ? "" : <Button variant="success" size="lg" className="fixed-right-bottom" onClick={() => addChoices(index)}>&#43;</Button>}
                </Card.Body>
                {questions.length > 1 && <button variant='warning' onClick={() => deleteQuestion(index)}>delete</button>}
            </Card>
        </div>
    );
}

export default Question;