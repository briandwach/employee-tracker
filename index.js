const inquirer = require('inquirer');

const viewDataAsync = require('./lib/view.js');
const addDataAsync = require('./lib/add.js');
const updateDataAsync = require('./lib/update.js');

const initPromptListArr = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add Department',
    'Add Role',
    'Add Employee',
    'Update Employee Role'
    //'Quit'
];

const initPromptList = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'action',
    choices: initPromptListArr,
    loop: false
};

async function getUserActionAsync() {
    const response = await inquirer.prompt(initPromptList);
    userActionRouterAsync(response);
};

async function userActionRouterAsync(response) {
    var sql = '';
    switch (response.action) {
        case initPromptListArr[0]:
            await viewDataAsync(initPromptListArr, initPromptListArr[0]);
            break;
        case initPromptListArr[1]:
            await viewDataAsync(initPromptListArr, initPromptListArr[1]);
            break;
        case initPromptListArr[2]:
            await viewDataAsync(initPromptListArr, initPromptListArr[2]);
            break;
        case initPromptListArr[3]:
            await addDataAsync(initPromptListArr, initPromptListArr[3]);
            break;
        case initPromptListArr[4]:
            await addDataAsync(initPromptListArr, initPromptListArr[4]);
            break;
        case initPromptListArr[5]:
            await addDataAsync(initPromptListArr, initPromptListArr[5]);
            break;
        case initPromptListArr[6]:
            await updateDataAsync(initPromptListArr, initPromptListArr[6]);
            break;
    }
    getUserActionAsync();
};

function init() {
    console.log(`
 _____________________________________________________________________________________________________________
|                                                                                                             |
|   8"""" 8""8""8 8""""8 8     8"""88 8    8 8"""" 8""""    8""8""8 8""""8 8"""8 8""""8 8""""8 8"""" 8"""8    |
|   8     8  8  8 8    8 8     8    8 8    8 8     8        8  8  8 8    8 8   8 8    8 8    " 8     8   8    |
|   8eeee 8e 8  8 8eeee8 8e    8    8 8eeee8 8eeee 8eeee    8e 8  8 8eeee8 8e  8 8eeee8 8e     8eeee 8eee8e   |
|   88    88 8  8 88     88    8    8   88   88    88       88 8  8 88   8 88  8 88   8 88  ee 88    88   8   |
|   88    88 8  8 88     88    8    8   88   88    88       88 8  8 88   8 88  8 88   8 88   8 88    88   8   |
|   88eee 88 8  8 88     88eee 8eeee8   88   88eee 88eee    88 8  8 88   8 88  8 88   8 88eee8 88eee 88   8   |
|_____________________________________________________________________________________________________________|
`);
    getUserActionAsync();
};

// Calls initiliazation of application
init();