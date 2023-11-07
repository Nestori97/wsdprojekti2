import { sql } from "../database/database.js";
const listTopicsAlphabetically = async () =>{
    const rows = sql` Select * FROM topics ORDER BY name`;
    return rows
}
const addTopic = async (userid, name ) =>{
    await sql`INSERT INTO topics
      (user_id, name)
        VALUES ( ${userid}, ${name})`;
};
const findATopicname = async (topicId) => {
 const rows= await sql`Select name  FROM topics WHERE id = ${topicId}`;
 return rows;
}
const removeTopic = async (topicId)=> {
await sql`DELETE FROM question_answers
WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topicId})`;
await sql`DELETE FROM question_answer_options
WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topicId})`;
await sql`DELETE FROM questions
WHERE topic_id = ${topicId}`;
await sql`DELETE FROM topics WHERE id = ${topicId}`;

}
const CountTopics = async () => {
    const rows = sql` Select COUNT(id) FROM topics `;
    return rows
}
export {listTopicsAlphabetically, addTopic, findATopicname,removeTopic,CountTopics};