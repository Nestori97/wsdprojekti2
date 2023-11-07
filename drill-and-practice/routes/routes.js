import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as individiualTopicController from "./controllers/individiualTopicController.js";
import * as individualQuestionController from "./controllers/individualQuestionController.js"
import * as quizController from "./controllers/quizControllers.js";
import * as Api from "./apis/questionsApi.js";
import * as registrationController from "./controllers/registirationController.js";
import * as loginController from "./controllers/loginController.js";
const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicsController.showTopics )
router.post("/topics", topicsController.addTopic)
router.post("/topics/:id/delete",topicsController.removeTopic)
router.get("/topics/:id",individiualTopicController.viewTopic)
router.post("/topics/:id/questions",individiualTopicController.addQuestionToTopic)
router.get("/topics/:id/questions/:qId",individualQuestionController.viewQuestionAnswerOptions)
router.post("/topics/:id/questions/:qId/options",individualQuestionController.addQuestionAnswerOption)
router.post("/topics/:tId/questions/:qId/options/:oId/delete",individualQuestionController.removeQuestion)
router.post("/topics/:tId/questions/:qId/delete", async ({ response, params }) => {
  await individiualTopicController.deleteQuestion(response, params);
}) //This router only worked this way as if I did it the sameway I did the others I got an error
//url/pram/request not defined and failed to undestand why as every other router works just fine but oak just did not provide them here so I had to do it manually.
router.get("/quiz", quizController.showTopics)
router.get("/quiz/:tId",quizController.getRandomTopic)
router.get("/quiz/:tId/questions/:qId",quizController.showAnswerOptions)
router.post("/quiz/:tId/questions/:qId/options/:oId",quizController.checkTheAnswer)
router.get("/quiz/:tId/questions/:qId/correct",quizController.correctAnswer)
router.get("/quiz/:tId/questions/:qId/incorrect",quizController.incorrectAnswer)
router.get("/api/questions/random", Api.getRandomQuestion)
router.post("/api/questions/answer", Api.getQuestionAnswer)
router.get("/auth/register", registrationController.showRegistrationForm)
router.post("/auth/register", registrationController.postRegistrationForm)
router.get("/auth/login",loginController.showLoginForm)
router.post("/auth/login", loginController.logInTheUser)
router.get("/auth/register/admin",registrationController.showAdminForm)// shows admin form
router.post("/auth/register/admin",registrationController.addAdmin )//allows you to give admin rights for given user, useful for testing
export { router };
