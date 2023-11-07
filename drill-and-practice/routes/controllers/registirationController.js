import {
    isEmail,
    minLength,
    required,
    validate,
  } from "../../deps.js";
import * as userServices from "../../services/userServices.js"
import { bcrypt } from "../../deps.js";


const getData = async (request)=>{
    const data = {
      password: "",
      email: "",
      errors: null
    };
    if (request) {
      const body = request.body();
      const params = await body.value;
      data.email = params.get("email");
      data.password=params.get("password");
    }
    return data
  }
  const validationRules = {
    password: [required, minLength(4)],
    email: [required, isEmail],
  };
const showRegistrationForm= async ({render}) => {
    render("registration.eta", await getData())
}
const postRegistrationForm = async ({request, render, response}) => {
    const data = await getData(request);
    const [passes, errors] = await validate(data, validationRules);
    if (!passes) {
        data.errors = errors;
        render("registration.eta", data);
      } else {
        await userServices.addUser(data.email,await bcrypt.hash(data.password))
        response.redirect("/auth/login");
      }
}
const addAdmin = async ({request, response}) =>{
  const body = request.body();
  const params = await body.value;
  const email = params.get("email");
  await userServices.addRights(email)
  response.redirect("/auth/login")
}
const showAdminForm = async ({render}) => {
  render("admin.eta")
}
export{showRegistrationForm, postRegistrationForm, addAdmin,showAdminForm}