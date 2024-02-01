import { superoak } from "../deps.js";
import { configure } from "../deps.js";
import { assertEquals } from "../deps.js";
import { app } from "../app.js";
import { sql } from "../database/database.js";
import * as TopicsServices from "../services/TopicsServices.js"
import * as userServices from "../services/userServices.js"
import * as questionsOnTopicServices from "../services/questionsOnTopicServices.js"
import * as questionAnswerServices from "../services/questionAnswerServices.js"
import * as quizAnswerServices from "../services/quizAnswerServices.js"

configure({
    views: `../views/`,
  });
const emailForTestin = "test@email.com";
const passwordForTesting = "password";
let topicId;/// set the topicId so its value can be determianted later and used everywhere
let questionId;  /// initialize question id so its valuen can be determinated later and used everywhere
let answerOptionId; ///intialize answerOptionId so its valuen can be determinated later and used everywhere

  Deno.test({/// if this test goes trough you can login with user that is not in database so this test should fail!!!
    name: "Test login with false information",
    fn: async() => {
        const testClient = await superoak(app);
        await testClient
        .post("/auth/login")
        .send(`email=${emailForTestin}&password=${passwordForTesting}`)
        .expect(302)
      },
      sanitizeResources: false,
      sanitizeOps: false,
    });
    Deno.test({
      name: "anyone access main page without being logged in",
      fn: async() => {
          const testClient = await superoak(app);
          await testClient.get("/").expect(200);
      },
      sanitizeResources: false,
      sanitizeOps: false,
  });
  Deno.test({
    name: "user that is not authenticated is redirected to login page when accessing /quiz",
    fn: async() => {
        const testClient = await superoak(app);
        await testClient.get("/quiz").
        expect(302)
        .expect("Location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
Deno.test({
  name: "user that is not authenticated is redirected to login page when accessing /topics",
  fn: async() => {
      const testClient = await superoak(app);
      await testClient.get("/topics").
      expect(302)
      .expect("Location", "/auth/login");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
  Deno.test({
    name: " can register a new user with valid email and password",
    fn: async() => {
        const testClient = await superoak(app);
        await testClient.post("/auth/register")
            .send(`email=${emailForTestin}&password=${passwordForTesting}`)
            .expect(302)
            .expect("Location", "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});
Deno.test({
  name: "can login with registered user",
  fn: async() => {
      const testClient = await superoak(app);
      await testClient.post("/auth/login")
          .send(`email=${emailForTestin}&password=${passwordForTesting}`)
          .expect(302)
          .expect("Location", "/topics");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "Adding topics works correctly in TopicsServices",
  fn: async() => {
      const user = await userServices.findUserByEmail(emailForTestin)
      await TopicsServices.addTopic(user[0].id, "testTopic")
      const topics = await TopicsServices.usersTopics(user[0].id)
      topicId = topics[0].id///set topicId value so we can delete correct topic in final "test" that cleans our database from test values
      const values = topics.find(value => value.title = "testTopic");
      assertEquals({
        user_id: values.user_id,
        name: values.name,
    }, {
        user_id: user[0].id,
        name: "testTopic",
    });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "Adding questions works correctly in questionsOnTopicServices",
  fn: async() => {
      const user = await userServices.findUserByEmail(emailForTestin);
      await questionsOnTopicServices.addQuestionToTopic(user[0].id,topicId,"testQuestion");
      const questionsOnTopic = await questionsOnTopicServices.listquestionsOnTopic(topicId)
      questionId = questionsOnTopic[0].id///set questionId value so we can delete correct topic in final "test" that cleans our database from test values
      const values = questionsOnTopic.find(value => value.title = "testQuestion");
      assertEquals({
        user_id: values.user_id,
        topic_id : values.topic_id,
        qid: values.id, 
        question_text :values.question_text 
    }, {
        user_id: user[0].id,
        topic_id: topicId,
        qid: questionId,
        question_text: "testQuestion",
    });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "Adding questions answer options works correctly",
  fn: async() => {
      await questionAnswerServices.addQuestionAnswerOption(questionId,"testAnswerOption",false);
      const answersOptions = await questionAnswerServices.listquestionsAnswerOptions(questionId)
      answerOptionId = answersOptions[0].id;
      const values = answersOptions.find(value => value.title = "testAnswerOption");
      assertEquals({
        answerOptionId: values.id,
        questionId: values.question_id, 
        option_text:values.option_text,
        is_correct: values.is_correct
    }, {
        answerOptionId : answerOptionId,
        questionId: questionId,
        option_text : "testAnswerOption",
        is_correct: false
    });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "Answering questions adds the chosen answer to the database correctly",
  fn: async() => {
      const user = await userServices.findUserByEmail(emailForTestin);
      await quizAnswerServices.addAnswer(questionId,answerOptionId,user[0].id);
      const answers = await quizAnswerServices.findQuizAnswerByUserId(user[0].id)
      const answerId = answers[0].id;
      const values = answers.find(value => value.title = answerId);
      assertEquals({
        AnswerId: values.id,
        questionId: values.question_id, 
        question_answer_option_id :values.question_answer_option_id ,
    }, {
        AnswerId : answerId,
        questionId: questionId,
        question_answer_option_id : answerOptionId,
    });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "Test that removing topics work and also remove test user from database",
  fn: async() => {
    await TopicsServices.removeTopic(topicId);
      await sql
          `DELETE FROM users WHERE email = ${emailForTestin};`;
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
