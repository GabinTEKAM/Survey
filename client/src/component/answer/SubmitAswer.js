import APISURVEY from "../../API/API-SURVEY";

const answerSubmission = async (answers) => {
    console.log(`answers`, answers)
    const { name, responses } = answers
    console.log(`responses`, responses)
    console.log(`name`, name)
   try {
        const idUser = await APISURVEY.saveUser({name:name})
    if (responses.length)
        for (const response of responses) {
            APISURVEY.saveanswer({idUser:idUser, response:response})
        }
   } catch (error) {
       throw error
   }
  
}

export default answerSubmission