import { sql } from "../database/database.js";
const listquestionsAnswerOptions = async (qId) => {
    const rows = await sql` Select * FROM question_answer_options  WHERE question_id = ${qId}  `;
    return rows;
}
const addQuestionAnswerOption = async (questionId,asnwerText,correct) => {
    await sql`INSERT INTO question_answer_options 
    (question_id , option_text , is_correct   )
      VALUES ( ${questionId}, ${asnwerText}, ${correct})`;
}
const deleteQuestionAndAnswers = async (qId) =>{
    await sql `DELETE FROM question_answers
    WHERE question_answer_option_id   = ${qId}`;
    await sql `DELETE FROM question_answer_options
    WHERE id  = ${qId}`;
}
const findAnswerById = async (oId) => {
    const rows = await sql` Select * FROM question_answer_options  WHERE id  = ${oId}  `;
    return rows;
}
const findCorrectAnswer = async (qId) => {
    const rows = await sql` Select * FROM question_answer_options  WHERE is_correct   = true AND question_id = ${qId} `;
    return rows
}
const listquestionsAnswerOptionsforApi = async (qId) => {
    const rows = await sql` Select id as optionId, option_text  FROM question_answer_options  WHERE question_id = ${qId}  `;
    return rows;
}
export{listquestionsAnswerOptions, addQuestionAnswerOption,deleteQuestionAndAnswers,findAnswerById,findCorrectAnswer, listquestionsAnswerOptionsforApi}