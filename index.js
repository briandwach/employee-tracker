const inquirer = require('inquirer');

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
}

function initPrompt(initPromptList) {
    return inquirer.prompt(initPromptList);
};

async function getUserActionAsync() {
    const response = await initPrompt(initPromptList);
    switch (response.action) {
        case 'View All Departments':
            console.log('View All Departments');
            break;
        case 'View All Roles':
            console.log('View All Roles');
            break;
        case 'View All Employees':
            console.log('View All Employees');
            break;
    }
}

function init() {
    console.log('WELCOME TO EMPLOYEE MANAGER');
    getUserActionAsync();
};

// Calls initiliazation of application
init();