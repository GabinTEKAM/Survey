/**
 * in this file we are implementing fields validations
 */
const { validationResult, check } = require('express-validator');

exports.choiceValidation = [

  check('question.label').isLength({ min: 1 }),
  check('question.mandatory').isBoolean(),
  check('question.min').isNumeric(),
  check('question.max').isNumeric(), 
  check('question.choices').isArray(),
]


exports.Surveytitle = [
  check('label').isAlphanumeric().isLength({ min: 3 })
]

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`errors`, errors)
    return res.status(422).json({ errors: errors.array() });
  }
  return next()
}

exports.validatequestionText = [
  check('question.label').isLength({ min: 1 }),
  check('question.mandatory').isBoolean(),
  check('question.typeofquestion').isAlpha(),
  check('question.rank').isNumeric(),
]