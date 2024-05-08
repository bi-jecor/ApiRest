const {Router} = require('express')
const router = Router();

const {createSurveyQuestion, getSurveyQuestions,getSurveyQuestionsBySurveyId ,getSurveyQuestion} = require('../controllers/surveyQuestions');

router.post('/createSurveyQuestion', createSurveyQuestion);
router.get('/getSurveyQuestions', getSurveyQuestions);
router.get('/getSurveyQuestion', getSurveyQuestion);
router.get('/getSurveyQuestionsBySurveyId/:surveyId', getSurveyQuestionsBySurveyId);

module.exports = router;
