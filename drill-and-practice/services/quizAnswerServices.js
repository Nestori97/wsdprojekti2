import { sql } from "../database/database.js";
const addAnswer= async (questionId,questionAnswerOptionId,userid) =>{
    await sql`INSERT INTO question_answers 
      (user_id, question_id, question_answer_option_id  )
        VALUES ( ${userid}, ${questionId},  ${questionAnswerOptionId})`;
}
const howManyAnswers = async() =>{
const rows = await sql ` SELECT COUNT(id) FROM question_answers `;
return rows
}

export{addAnswer, howManyAnswers}