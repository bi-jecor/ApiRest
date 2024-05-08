const {Router} = require('express')
const router = Router();

const {createSurveyAnswer, getSurveyAnswers, getSurveyAnswersBySurvey, getAverageQuestionsReportBySurvey, getSurveyAnswer} = require('../controllers/surveyAnswers');

router.post('/createSurveyAnswer', createSurveyAnswer);
router.get('/getSurveyAnswers', getSurveyAnswers);
router.get('/getSurveyAnswersBySurvey/:surveyId', getSurveyAnswersBySurvey);
router.get('/getAverageQuestionsReportBySurvey/:surveyId', getAverageQuestionsReportBySurvey);
router.get('/getSurveyAnswer', getSurveyAnswer);

module.exports = router;
