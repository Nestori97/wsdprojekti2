import * as questionsOnATopic from "../../services/questionsOnTopicServices.js"
import * as TopicServices from "../../services/TopicsServices.js";
const getData = async (topicId, request) => {
    const questionsOnTopic = await questionsOnATopic.listquestionsOnTopic(topicId);
    const topicText = await TopicServices.findATopicname(topicId);
    const data = {
      questions: questionsOnTopic,
      errors: [],
      testQuestionText: "",
      topicId: topicId,
      topicText: topicText[0].name
    };
  
    if (request) {
      const body = request.body();
      const params = await body.value;
      if (params) {
        data.testQuestionText = params.get("question_text");
      }
    }
  
    return data;
  };
  
const validate = (data) => {
    const errors = [];
    if (!data.testQuestionText || data.testQuestionText.length < 1){
      errors.push("Question must have some text");
    }
    return errors
  }
  
  const viewTopic = async ({ render, request }) => {
    const topicId = request.url.pathname.split("/")[2];
    render("individiualTopic.eta", await getData(topicId));
  };
  
  const addQuestionToTopic = async ({ request, response, render, user }) => {
    const topicId = request.url.pathname.split("/")[2];
    const data = await getData(topicId, request);
    data.errors = validate(data);
  
    if (data.errors.length > 0) {
      render("individiualTopic.eta", data, user);
    } else {
      if (request) {
        const questionText = data.testQuestionText;
        const userId = user.id; 
  
        
        questionsOnATopic.addQuestionToTopic(userId, topicId, questionText);
  
        response.redirect(`/topics/${topicId}`);
      }
    }
  };
   const deleteQuestion = async (response,params) =>{
    const tId = params.tId;
    const qId= params.qId
    await questionsOnATopic.deleteQuestion(qId);
    response.redirect(`/topics/${tId}`);
  }
  
  
export{viewTopic, addQuestionToTopic, deleteQuestion};