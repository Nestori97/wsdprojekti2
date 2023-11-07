import * as TopicServices from "../../services/questionsOnTopicServices.js"
import * as questionAnswerServices from "../../services/questionAnswerServices.js";
const getRandomQuestion = async({response }) =>{
    const questions = await TopicServices.listAllQuestions()
    if(!questions || questions.length <1 ){
        response.body = {};
    }
    else {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const randomQuestion = questions[randomIndex];
        const questionId =randomQuestion.id
        const questionText = randomQuestion.question_text
        const answerOptions = await questionAnswerServices.listquestionsAnswerOptionsforApi(questionId)
        response.body = {questionId: questionId,questionText:questionText, answerOptions: answerOptions };
    }

}
const getQuestionAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    let correct = false
    const content = await body.value;
    const questionId = content.questionId 
    const optionId = content.optionId
    const correctAnswer = await questionAnswerServices.findCorrectAnswer(questionId)
    if(optionId === correctAnswer[0].id  ){
        console.log(optionId)
        console.log(correctAnswer.id  )
        correct = true
    }
    response.body = {correct:correct}
}
export {getRandomQuestion, getQuestionAnswer}