const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

// Each prompt is an array fed into Inquirer to be prompt object members.
// Index 0: type, Index 1: name, Index 2: message, 
// Index 3: choices, Index 4: loop, Index 5: maxLength, Index 6:validate
const prompts = [
    ['maxlength-input', 'text', 'Enter text for logo:', '', '', '3'],
    ['input', 'textColor', 'Enter color for text (ex. purple, or #800080):', '', '', '', validateColor],
    ['list', 'shape', 'Choose a shape:', shapes.shapesArray, false],
    ['input', 'shapeColor', 'Enter color for shape (ex. red, or #FF0000):', '', '', '', validateColor]
];

// Begins asynchronous iterations of Inquirer prompts for the user
async function startPromptsAsync(prompts) {
    const promptsArray = [];
    for (prompt of prompts) {
        const [type, name, message, choices, loop, maxLength, validate] = prompt;
        promptsArray.push({ type: type, name: name, message: message, choices: choices, loop: loop, maxLength: maxLength, validate: validate });
    };

    const response = await promptForUserInput(promptsArray);

    compileRender(response);
};

// Inquirer function for collecting user input
function promptForUserInput(currentPrompt) {
    return inquirer.prompt(currentPrompt);
};

function init() {
    startPromptsAsync(prompts);
};

// Calls initiliazation of application
init();