const inquirer = require('inquirer');

const viewData = require('./lib/view.js');

const initPromptListArr = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    //'Add Department',
    //'Add Role',
    //'Add Employee', 
    //'Update Employee Role'
];

const initPromptList = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'action',
    choices: initPromptListArr,
    loop: false
};

function initPrompt(initPromptList) {
    return inquirer.prompt(initPromptList);
};

async function getUserActionAsync() {
    const response = await initPrompt(initPromptList);
    switch (response.action) {
        case initPromptListArr[0]:
            viewData(initPromptListArr, initPromptListArr[0]);
            break;
        case initPromptListArr[1]:
            viewData(initPromptListArr, initPromptListArr[1]);
            break;
        case initPromptListArr[2]:
            viewData(initPromptListArr, initPromptListArr[2]);
            break;
    }
};

function init() {
    console.log(`
8"""" 8""8""8 8""""8 8     8"""88 8    8 8"""" 8""""    8""8""8 8""""8 8"""8 8""""8 8""""8 8"""" 8"""8  
8     8  8  8 8    8 8     8    8 8    8 8     8        8  8  8 8    8 8   8 8    8 8    " 8     8   8  
8eeee 8e 8  8 8eeee8 8e    8    8 8eeee8 8eeee 8eeee    8e 8  8 8eeee8 8e  8 8eeee8 8e     8eeee 8eee8e 
88    88 8  8 88     88    8    8   88   88    88       88 8  8 88   8 88  8 88   8 88  ee 88    88   8 
88    88 8  8 88     88    8    8   88   88    88       88 8  8 88   8 88  8 88   8 88   8 88    88   8 
88eee 88 8  8 88     88eee 8eeee8   88   88eee 88eee    88 8  8 88   8 88  8 88   8 88eee8 88eee 88   8 
`);
    getUserActionAsync();
};

// Calls initiliazation of application
init();