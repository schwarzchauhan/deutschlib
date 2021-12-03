# deutschlib

### How to run project
```bash
npm run dev
# or 
npm start
```

### feature
- password reset link will expire in 120seconds


### About application
- a user can register in to app
- then she can login 
- user can also __add their skill__ in profile section
- a user can have multiple skills ([mongoose populate](https://mongoosejs.com/docs/populate.html#populate) concept used here)
- if user __changes password__
  - the json access_token cookie is clear
  - now user need to login again with the new password to protected routes
- if user __forgets password__
  - she enters her email
  - a password reset link is sent to her email
  - then user can clicks on link(expiry time `120 seconds`)
  - then user can set new password on the page appeared by cliking above link
  - password is reset successfully
- cookie feature
  - user logins in to app
  - an token get stored in the cookies(expires automatically after `one minute`)
  - now user proceed to `/dashboard` route easily

## learnings 
- bcrypt npm package to hash passwords 
- mongoose schema , enum, [populate](https://mongoosejs.com/docs/populate.html#populate), array field, [Error](https://mongoosejs.com/docs/api/error.html#error_Error)
  - [convert mongoose createdAt timing to local timing](https://www.codegrepper.com/code-examples/javascript/createdAt+to+normal+date+)
  - [date Data type in mongoose]( https://mongoosejs.com/docs/tutorials/dates.html)
- cookie
  - [clear cookie](https://expressjs.com/en/api.html#res.clearCookie)
- js 
  - [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#comparing_traditional_functions_to_arrow_functions)
- fs module
  - [read file async-ly](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options)
- [handlebars email sending templating](https://github.com/handlebars-lang/handlebars.js#usage)
- [handlebars email sending templating](https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer)
