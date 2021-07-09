exports.mysurveys = (idAdmin) => {
    return `SELECT * 
    from  (
           SELECT count (idAnswer) as numberofanswers,
        s.label as label, s.idSurvey as idSurvey from  survey s 
           left join answers a on s.idSurvey = a.idSurvey
           group by s.idSurvey )
    WHERE idSurvey in (SELECT idSurvey FROM survey
    where idAdmin=${idAdmin} )
       order by numberofanswers desc`
}

exports.getUserAnswer = (idSurvey) => {
    return ` 
    select idAnswer ,s.idSurvey, userName, responses 
    from survey s  inner join   answers a on 
    s.idsurvey = a.idSurvey and s.idSurvey = ${idSurvey}`
}