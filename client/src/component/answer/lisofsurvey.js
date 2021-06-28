import React, {  useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { TableHeader, TableRow } from './tablesurvey';
import APISURVEY from '../../API/API-SURVEY';

function ListOfSurvey(props) {
    const { ListOfSurveys } = props
    return (
        <Table striped bordered hover responsive size='md'>
            <TableHeader />
            <tbody>
                {ListOfSurveys.map((survey, index) =>
                    <TableRow key={index} survey={survey} />)}

            </tbody>
        </Table>
    );
}



function MySurvey(props) {
    const [loading, setLoading] = useState(false)
    const [MySurveys, setMySurveys] = useState([])
    useEffect(() => {

        const getSurvey = async () => {
            await APISURVEY.getMySurvey().then(res => {
                setMySurveys(res)
            })
            setLoading(true)
        } 
        getSurvey()
        }, [])
    return (<>
        {loading ?
            <ListOfSurvey ListOfSurveys={MySurveys} />
            : 'loading'}
    </>);
}

export { MySurvey, ListOfSurvey };