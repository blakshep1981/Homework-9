const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    },
    {
      type: "input",
      name: "url",
      message: "What is your URL to your project?"
    },
    {
      type: "input",
      name: "title",
      message: "What is your project's name?"
    },
    {
      type: "input",
      name: "description",
      message: "What is a description of your project?"
    },
    {
      type: "input",
      name: "installation",
      message: "What command should be run to install dependencies?"
    },
    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?"
    },
    {
      type: "input",
      name: "license",
      message: "What kind of license does your project require?"
    },
    {
      type: "input",
      name: "contributing",
      message: "What does the user need to know about contributing to the repo?"
    },
    {
      type: "input",
      name: "tests",
      message: "What command is used to run tests?"
    },
    {
      type: "input",
      name: "questions",
      message: "What email or phone number should be contacted if the user has questions or concerns?"
    },
  ]);
}

function generateMarkdown(answers) {
  return `# Project Title 
${answers.title}

### Project URL
${answers.url}

https://img.shields.io/badge/Version-1.01-orange

### Project Description
${answers.description}

## Developer Info 
* ${answers.username}
* ${answers.email}

# Table of Contents
* Installation
* Usage
* License
* Contributing
* Tests
* Questions

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
${answers.questions}`;
}

promptUser()
  .then(function(answers) {
    const readme = generateMarkdown(answers);

    return writeFileAsync("readme.md", readme);
  })
  .then(function() {
    console.log("Successfully wrote to readme.md");
  })
  .catch(function(err) {
    console.log(err);
  });
