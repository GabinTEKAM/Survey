exports.mysurveys = (idAdmin) => {
    return `SELECT count ( DISTINCT idUser) as numberofanswers, s.label as label, 
        s.idSurvey as idSurvey
        from  survey s  inner join  questions q on 
        s.idSurvey = q.idSurvey  and idAdmin=${idAdmin}
        left join answers a
        on  q.idQuestion = a.idQuestion
        group by q.idSurvey 
        order by numberofanswers desc`
}

exports.getUserAnswer = (idSurvey) => {
    return ` 
    select q.idSurvey, q.idQuestion,a.idUser, responses
    from survey s inner join  questions q  on 
    q.idSurvey = s.idSurvey and s.idSurvey = ${idSurvey}
    LEFT join  
    answers a on 
    q.idQuestion = a.idQuestion INNER join users 
    on a.idUser = users.idUser
    group by a.idUser,  q.idQuestion
    `
}