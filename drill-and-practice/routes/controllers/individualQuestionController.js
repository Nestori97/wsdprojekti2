import * as questionServices from "../../services/questionAnswerServices.js"
import * as questionOnATopicServices from "../../services/questionsOnTopicServices.js"
const getData = async (topicId, questionId, name) => {
    const answerOptions = await questionServices.listquestionsAnswerOptions(questionId);
    const questiontext = await questionOnATopicServices.getSpesificQuestion(questionId)
    const data = {
      answerOptions: answerOptions,
      errors: [],
      testAnswerOptionText: "",
      topicId: topicId,
      questionId: questionId,
      questiontext: questiontext[0].question_text,
    };
    if (name) {
        data.testAnswerOptionText = name;
    }
  
    return data;
  };
  const validate = (data) => {
    const errors = [];
    if (!data.testAnswerOptionText || data.testAnswerOptionText.length < 1){
      errors.push("Answer option must contain atleast one character");
    }
    return errors
  }
const viewQuestionAnswerOptions = async ({render, params}) => {
    const questionId= params.qId;
    const topicId = params.id;
    const data = await getData(topicId,questionId);

    render("questions.eta",data);
}
const addQuestionAnswerOption = async({request,response,params,render}) => {
    const questionId= params.qId;
    const topicId = params.id;
    const body = request.body({ type: "form" });
    const testparams = await body.value;
    const optiontext = testparams.get("option_text")
    let isCorrect = testparams.has("is_correct");
    const data = await getData(topicId,questionId,optiontext)
    data.errors= validate(data);
    if (data.errors.length > 0) {
        render("questions.eta", data);
      }
    else {
        await questionServices.addQuestionAnswerOption(questionId,optiontext,isCorrect);
        response.redirect(`/topics/${topicId}/questions/${questionId}`);
        
    }
}
const removeQuestion = async ({params, response}) => {
    const answerId= params.oId;
    const topicId = params.tId;
    const questionId = params.qId
    await questionServices.deleteQuestionAndAnswers(answerId);
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
}
export { viewQuestionAnswerOptions, addQuestionAnswerOption,removeQuestion}