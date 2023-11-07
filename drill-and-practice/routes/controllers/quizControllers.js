import * as TopicsServices from "../../services/TopicsServices.js";
import * as topicServices from "../../services/questionsOnTopicServices.js"
import * as questionServices from "../../services/questionAnswerServices.js"
import * as quizAnswerServices from "../../services/quizAnswerServices.js"
const showTopics = async ({render}) =>{
    const topicsSorted = await TopicsServices.listTopicsAlphabetically()
    const data = {
        topics: topicsSorted,
    }
        render("quizTopics", data);
}
const getRandomTopic = async ({response, params, render}) =>{
    const tId = params.tId;
    const randomQuestion = await topicServices.getRandomQuestion(tId);
    if(!randomQuestion || randomQuestion.length<1){
        render("noQuestionsOnTopic");
    }
    else {
    const qId =randomQuestion[0].id
    response.redirect(`/quiz/${tId}/questions/${qId}`)
    }
}
const showAnswerOptions = async ({params, render}) => {
   const questionId= params.qId
   const topicId =  params.tId;
   const answerOptions = await questionServices.listquestionsAnswerOptions(questionId);
   const questiontext = await topicServices.getSpesificQuestion(questionId)
   const data = {
    topicId: topicId,
    questionId: questionId,
    answerOptions: answerOptions,
    questiontext: questiontext[0].question_text,
   }
   render("quizAnswerOptions",data)
   

}
const checkTheAnswer = async ({params,response, user}) => {
    const topicId = params.tId
    const questionId= params.qId;
    const questionAnswerOptionId = params.oId;
    const userid = user.id
    await quizAnswerServices.addAnswer(questionId,questionAnswerOptionId,userid);
    const answer = await questionServices.findAnswerById(questionAnswerOptionId);
    const isItCorrect = answer[0].is_correct;
    if(isItCorrect) {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`);

    }
    else
    {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`);
    }
}
const correctAnswer = ({render, params}) =>{
    const topicId = params.tId
    render("correctAnswerToQuiz",topicId )
}
const incorrectAnswer =async ({render, params}) => {
    const topicId = params.tId
    const questionId = params.qId
    const correct = await questionServices.findCorrectAnswer(questionId);
    if(!correct|| correct.length<1){
        const data = {
            tId:topicId,
            correcAnswer:"there was no correct answer :()",
        }
        render("incorrectAnswerToQuiz",data)
    }
    else{
    const data = {
        tId:topicId,
        correcAnswer:correct[0].option_text,
    }
    render("incorrectAnswerToQuiz",data)
}
}
export {showTopics,getRandomTopic, showAnswerOptions, checkTheAnswer,correctAnswer,incorrectAnswer}