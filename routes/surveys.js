const {Router} = require('express')
const router = Router(); 
const  {createSurveys, getSurveys, getSurvey, updateSurvey } = require('../controllers/surveys');

router.post('/createSurvey', createSurveys);
router.get('/getSurveys', getSurveys);
router.get('/getSurvey/:surveyId', getSurvey);
router.put('/updateSurvey/:surveyId', updateSurvey);

module.exports = router;