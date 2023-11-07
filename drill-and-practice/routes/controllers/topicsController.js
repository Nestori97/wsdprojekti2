import * as TopicsServices from "../../services/TopicsServices.js";
const getData = async (request)=>{
  const topicsSorted = await TopicsServices.listTopicsAlphabetically()
  const data = {
    topics: topicsSorted,
    errors: [],
    testname:"",
    admin: false
  };
  if (request) {
    const body = request.body();
    const params = await body.value;
    data.testname = params.get("name");
  }
  return data
}
const validate = (data) => {
  const errors = [];
  if (!data.testname || data.testname.length < 1){
    errors.push("Topics name must contain atleast one character");
  }
  return errors
}
const showTopics = async ({ render, user }) => {
    const data =await getData()
    if(user.admin === true){
      data.admin = true;
    }
    render("Topics.eta",data);
  };

const addTopic = async ({request, response, render, user }) =>{
    const data = await getData(request);
    if(user.admin === true){
      data.admin = true;
    }
    data.errors = validate(data);
    if (data.errors.length > 0) {
      render("Topics.eta", data);
    }    
    else { 
    TopicsServices.addTopic(
    user.id,
    data.testname,)
    response.redirect("/topics")
    }
}
const removeTopic = async({params,response}) =>{
    await TopicsServices.removeTopic(params.id);
    response.redirect("/topics")
}
  
  export { showTopics, addTopic, removeTopic };