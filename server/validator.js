/**
 * in this file we are implementing fields validations
 */
const { validationResult, check } = require('express-validator');

exports.choiceValidation = [
  check('question.label').isLength({ min: 3 }),
  check('question.mandatory').isNumeric(),
  check('question.min').isNumeric(),
  check('question.max').isNumeric(), 
  check('question.choices').isArray(),
]


exports.Surveytitle = [
  check('label').isLength({ min: 3 })
]

exports.validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: "Invialid input found" });
  }
  return next()
}

exports.validatequestionText = [
  check('question.label').isLength({min:1}),
  check('question.mandatory').isNumeric(),
  check('question.typeofquestion').isAlpha(),
  check('question.rank').isNumeric(),
]

exports.answer = [
  check('name').isLength({min:1}),
  check('responses').isObject(),
  check("idSurvey").isNumeric()
]