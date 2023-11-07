import * as userServices from "../../services/userServices.js"
import { bcrypt } from "../../deps.js";
const showLoginForm = ({render}) =>{
    render("login.eta")
}
const logInTheUser = async ({request, response, render,state}) => {
    const body = await request.body({ type: "form" });
    const params = await body.value;
    const email = params.get("email");
    const userFromDatabase  = await userServices.findUserByEmail(email);
    if (userFromDatabase.length  != 1 ) {
        const data = {
            errors: "Login failed please try again"
        }
        render("login.eta",data);
        return
      }
    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );
  if (!passwordMatches) {
    const data = {
        errors: "Login failed please try again"
    }
    render("login.eta",data);
    return
  }
  await state.session.set("user", user);
  response.redirect("/topics");
};
export {showLoginForm, logInTheUser}