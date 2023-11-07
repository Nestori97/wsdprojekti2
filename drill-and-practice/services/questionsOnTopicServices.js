import { sql } from "../database/database.js";
const listquestionsOnTopic = async (id) =>{
    const rows = sql` Select * FROM questions WHERE topic_id =  ${id} `;
    return rows
}
const addQuestionToTopic = async (userid,topicid,questionText) => {
    await sql`INSERT INTO questions 
    (user_id, topic_id, question_text  )
      VALUES ( ${userid}, ${topicid}, ${questionText})`;
}
const deleteQuestion = async (qId) =>{
    await sql `DELETE FROM questions 
    WHERE id = ${qId}`;
}
const getRandomQuestion =  async(id) => {
    const rows = sql` Select * FROM questions Where topic_id= ${id} ORDER BY RANDOM() LIMIT 1`;
    return rows
  }
  const getSpesificQuestion = async (qid) => {
    const rows = sql` Select * FROM questions Where id = ${qid}`;
    return rows
  }
  const listAllQuestions = async () => {
    const rows = sql` Select * FROM questions`;
    return rows
  }
  const howManyQuestions = async () => {
    const rows = sql` Select COUNT(id) FROM questions `;
    return rows
  }
export {listquestionsOnTopic, addQuestionToTopic, deleteQuestion, getRandomQuestion, getSpesificQuestion, listAllQuestions, howManyQuestions}