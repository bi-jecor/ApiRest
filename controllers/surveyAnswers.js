const SurveyAnswer = require('../models/surveyAnswers');

const createSurveyAnswer = async (req, res) => {
    console.log(req.body);
    try {
        const surveyAnswerDb = await SurveyAnswer.insertMany(req.body);
        return res.json({
            ok : true,
            surveyAnswer : surveyAnswerDb
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to create survey answer, check with your system Administrator',
            error
        });
    }
}

const getSurveyAnswers = async (req, res) => {
    try {
        const surveyAnswersDb = await SurveyAnswer.find()
            .populate('surveyQuestion' , 'question tag');
        return res.json({
            ok : true,
            surveyAnswers : surveyAnswersDb
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to create survey answers, check with your system Administrator',
            error
        });
    }
}
const getSurveyAnswersBySurvey = async (req, res) => {
    try {
        const surveyId = req.params.surveyId;
        const surveyAnswersDb = await SurveyAnswer.find({'survey': surveyId})
            .populate('survey' , 'name rangeMax')
            .populate('surveyQuestion' , 'question tag');
        const {rangeMax} = surveyAnswersDb[0].survey;
        const groupArray = [];
        console.log(surveyAnswersDb);
        surveyAnswersDb.forEach((element, i) => {
            const exist = groupArray.findIndex(x => x.tag == element.surveyQuestion.tag);
            if (element.surveyQuestion.tag === undefined) {
                return
            }
            if (exist != -1) {
                groupArray[exist].variabilityValues.push(Number(element.answer))
                groupArray[exist].porcent = (100 / rangeMax) * ((groupArray[exist].data + Number(element.answer)) /( groupArray[exist].iterations + 1) );
                groupArray[exist].iterations = groupArray[exist].iterations + 1;
                groupArray[exist].data =  (groupArray[exist].data + Number(element.answer));
                
            } else {
                const newElement = {
                    tag : element.surveyQuestion.tag,
                    data : Number(element.answer),
                    iterations : 1,
                    porcent : (100 / rangeMax) * Number(element.answer),
                    variabilityValues : [Number(element.answer)],
                    range: rangeMax,
                    question : element.surveyQuestion.question
                }
                groupArray.push(newElement)
            }
        });
        console.log(groupArray);
        return res.json({
            ok : true,
            surveyAnswers : groupArray
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to get survey answers, check with your system Administrator',
            error
        });
    }
}

getAverageQuestionsReportBySurvey = async (req, res) => {
    try {
        const surveyId = req.params.surveyId;
        const surveyAnswersDb = await SurveyAnswer.find({'survey' : surveyId})
            .populate('survey' , 'rangeMax')
            .populate('surveyQuestion' , 'question tag');
            const {rangeMax} = surveyAnswersDb[0].survey;
            const groupArray = [];
            surveyAnswersDb.forEach(element => {
                const exist = groupArray.findIndex(x => x.question == element.surveyQuestion.question);
                if (exist != -1) {
                    groupArray[exist].data +=  Number(element.answer);
                    groupArray[exist].iterations = groupArray[exist].iterations + 1;
                    groupArray[exist].porcent =  ((100 / rangeMax) *  (groupArray[exist].data )) /  groupArray[exist].iterations  ;

    
                } else {
                    const newElement = {
                        question : element.surveyQuestion.question,
                        data : Number(element.answer),
                        iterations : 1,
                        porcent : (100 / rangeMax) * Number(element.answer),
                        range: rangeMax,
                        tag : element.surveyQuestion.tag
                    }
                    // console.log(newElement);
                    
                    groupArray.push(newElement)
                }
            });

            res.json({
                ok:true,
                surveyAnswers : groupArray
            });
    } catch (error) {
        console.log(error);
    }
}

const getSurveyAnswer = async (req, res) => {
    try {
        const surveyAnswerId = req.params.surveyAnswerId;
        const surveyAnswersDb = SurveyAnswer.findOne({'_id' : surveyAnswerId});
        res.json({
            ok:true,
            surveyAnswers : surveyAnswersDb
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get survey answer, check with your system Administrator',
            error
        });
    }
}


module.exports = {
    createSurveyAnswer,
    getSurveyAnswers,
    getSurveyAnswersBySurvey,
    getAverageQuestionsReportBySurvey,
    getSurveyAnswer
}