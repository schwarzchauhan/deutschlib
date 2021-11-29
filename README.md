# deutschlib

### How to run project
```bash
npm run dev
# or 
npm start
```

### featuer
- password reset link will expire in 120seconds


### About appliation
- a user can register in to app
- then she can login 
- user can also add their skill in profile section
- a user can have multiple skills ([populate](https://mongoosejs.com/docs/populate.html#populate) concept used here)

## learnings 
- bcrypt npm package to hash passwords 
- mongoose schema , enum, [populate](https://mongoosejs.com/docs/populate.html#populate), array field, [Error](https://mongoosejs.com/docs/api/error.html#error_Error)
  - [convert mongoose createdAt timing to local timing](https://www.codegrepper.com/code-examples/javascript/createdAt+to+normal+date+)
- js 
  - [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#comparing_traditional_functions_to_arrow_functions)
- fs module
  - [read file async-ly](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options)
- [handlebars email sending templating](https://github.com/handlebars-lang/handlebars.js#usage)
- [handlebars email sending templating](https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer)
