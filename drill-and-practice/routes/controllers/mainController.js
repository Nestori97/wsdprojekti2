import * as questionsOnATopic from "../../services/questionsOnTopicServices.js"
import * as TopicsServices from "../../services/TopicsServices.js";
import * as quizAnswerServices from "../../services/quizAnswerServices.js"

const showMain = async ({ render }) => {
  const AnswersByUsers = await quizAnswerServices.howManyAnswers()
  const topics = await TopicsServices.CountTopics()
  const AmountOfQuestions = await questionsOnATopic.howManyQuestions()
  const TotalAmountOfTopics = topics[0].count
  const totalAmountOfAnswersByUsers = AnswersByUsers[0].count
  const totalAmountOfQuestions = AmountOfQuestions[0].count
  const data = {
    topics:TotalAmountOfTopics,
    questions:totalAmountOfQuestions,
    answers:totalAmountOfAnswersByUsers,
  }

  render("main.eta",data);
};

export { showMain };
