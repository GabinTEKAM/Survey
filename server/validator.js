/**
 * in this file we are implementing fields validations
 */
 const {  validationResult, check } = require('express-validator');
exports.surveyValidation =[
        
           [ [check('question.label').isLength({min:5}), 
             check('question.mandatory').isBoolean()]  ,
           check('question.min').exists().isNumeric(), check('question.max').isNumeric()]
        ]


exports.validate =(req, res, next)=>{
    const errors = validationResult(req);
    console.log(`errors`, errors)
        if (!errors.isEmpty()) {
            console.log(`errors`, errors)
            return res.status(422).json({ errors: errors.array() });
        }
        return next()
}