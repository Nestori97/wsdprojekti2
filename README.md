# Project 2: XXX

Online Location
--------------------------------------------------------------------------------------------------------------
This project can be found online in the following address https://questionsandtopicprojektc2.onrender.com when you access it for the first time it might take a while to load

Project
----------------------------------------------------------------------------------------------------------------------
This project allows you to make a topic, add question that relate to that topic, add answer options to those questions, and answer different recorded questions.
There is also API that allows cross origin requests   

To be able to answer questions or add questions&answer options you must be registered user that has logged in, 
and to add or remove topics, you must be bautheticated as admin. Currently you can easily make yourself as admin by going to this path in the application /auth/register/admin
and inputting the email of the account that you wish to give adminrights to. This should make testing this application locally much easier but should never be implemented this way in any real world application.   

To navigate the application on the upper end of the web page there is a navbar where there are links to quiz and to topics, so if you are stuck somewhere and have no clue how to get 
back, you can allways use those two links to navigate to the two main function of this app.   

The project can be run from the run-locally.js file using these commands in the terminal.
 docker compose up 
 deno run --unstable --allow-all --watch run-locally.js
 these command setup the database and make the project run on your own computer on a port 7777
 you can also access the project by using the link I provided in the earlier part.

 Some notes
----------------------------------------------------------------------------------------------------------------------
almost all of the data validation is done using self made validate function, except the valdiation of "is the input email" as there I had to use validsaur as I did not know how to
do it myself. Thats why there are 2 different validation methods.   

Also this path /auth/register/admin and the functions for it were made to make it easier to test the application, and should never be made that way in any real application.

 Tests
------------------------------------------------------------------------------------------------------------------------
Test can be found from drill-and-practice/tests/app_test.js an they can be run by running the following comand on the terminal  deno test --allow-net --allow-env --allow-read app_test.js 10 of the 11 tests should pass and one fail, the one which fails is the first test ran, and it checks that you can not login using an account that does not yet exist. Other tests check that you can access correct sites and that the database is updated accordingly. 
to get the test working its also possible that you have to modify renderMidllewar file in the following way, this is for a reason that atleast for me the test do not run
if the following modifications are not done, but the course retun page does not allow me to return this project if the middleware is modified this way

import { configure, renderFile } from "../deps.js";
const renderMiddleware = async (context, next) => {
  configure({
    views: `${Deno.cwd()}/views/`,
  });

  context.render = async (file, data) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};
export { renderMiddleware };

to


import { configure, renderFile } from "../deps.js";
configure({
  views: `${Deno.cwd()}/views/`,
});
const renderMiddleware = async (context, next) => {

  context.render = async (file, data) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export { renderMiddleware };
