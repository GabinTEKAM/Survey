import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import APISURVEY from '../../API/API-SURVEY';
import { TableHeader, TableRow } from './tablesurvey';

function MySurvey(props) {
    const [loading, setLoading] = useState(false)
    const [MySurveys, setMySurveys] = useState([])

    useEffect(() => {
        const getSurvey = async () => {
            const set = await APISURVEY.getMySurvey().then(res => {
                setMySurveys([...res])
            })
            setLoading(true)
        }
        getSurvey()
    }, [])
    return (<>
        {loading ? <Table striped bordered hover responsive>
                <TableHeader />
            <tbody>

           { MySurveys.map((survey, index) => <TableRow survey={survey} key={index}/> ) }
             </tbody>   
            </Table>
        : 'loading'}
    </>);
}

export default MySurvey;