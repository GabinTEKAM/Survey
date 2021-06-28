import React, { useEffect, useState } from 'react';
import APISURVEY from "../../API/API-SURVEY";
import { UserResponse } from './getUserResponse';
import { Pagination } from "react-custom-pagination";
import { useLocation } from 'react-router-dom';
import Loader from '../../loader';


function ConsultResponse(props) {
    const location = useLocation()
    const surveyLabel = (location.state ? location.state : "")
    const [questions, setQuestions] = useState([])
    const [Responses, setResponses] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [ErrorMessage, setErrorMessage] = useState('');
    const { idSurvey } = props

    const indexOfLastResponse = currentPage
    const indexOfFirstResponse = indexOfLastResponse - 1
    const currentResponse = Responses.slice(indexOfFirstResponse, indexOfLastResponse)
    const paginate = (number) => {
        setCurrentPage(number)
    }
    
    useEffect(() => {
        const getValues = async () => {
            await APISURVEY.getUserAnswers(idSurvey)
                .then(setResponses).then(
                    APISURVEY.getQuestionsLabel(idSurvey).then(setQuestions)
                )
            setLoading(true)
        }

        getValues()
            .catch(err => { setLoading(true) 
            setErrorMessage("Impossible to load answers") })
    }, [])


    return (
        <>
            {loading ? <>

                {ErrorMessage && { ErrorMessage }}
                
                    <div className= "survey-title">
                    <h1>{surveyLabel}</h1>
                    </div>
                    {currentResponse.map((response) => <>
                    <div className='username'>
                            <h3>Name of User :</h3>
                            <h1>{response.userName}</h1>
                    </div>
                    
                        <UserResponse key={response.idAnswer} questions={questions} response={response} />
                    </>)}

                    <div style={{ width: "300px" }}>
                        <Pagination
                            totalPosts={Responses.length}
                            postsPerPage={1}
                            paginate={paginate}
                            view={4}
                            showLast={true}
                            showFirst={true}
                            showIndex={true}
                            
                        />
                    </div>
                 </>
                : <Loader />

            }
        </>
    );
}

export default ConsultResponse;