// Requests for adding department, role, and employee data

const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

//  Imports database retrieval functions, validation functions for Inquirer prompts, and render to console functions
const validate = require('../util/validate.js');
const retrieve = require('../util/retrieve.js');
const render = require('../util/render.js');

// Routes to specific query based on user selection
async function addDataAsync(initPromptListArr, userRequest) {
    switch (userRequest) {
        case initPromptListArr[3]:
            await addDepartmentPromptAsync();
            break;
        case initPromptListArr[4]:
            await addRolePromptAsync();
            break;
        case initPromptListArr[5]:
            await addEmployeePromptAsync();
            break;
    };
    return;
};

// Function for adding a department to the database
async function addDepartmentPromptAsync() {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'maxlength-input',
            message: 'Please enter the department name:',
            name: 'departmentName',
            maxLength: 30,
            validate: validate.string      
        }
    ]);
        const department = departmentName.trim();
        const sql = `INSERT INTO department (name) VALUES ('${department}')`;
        await retrieve.queryDatabaseAsync(sql);
        render.feedback(`Added ${department} to the database.`);
};

// Function for adding a role to the database
async function addRolePromptAsync() {
    const departmentArr = await retrieve.queryDepartmentArr();

    const { title, salary, department } = await inquirer.prompt([
        {
            type: 'maxlength-input',
            message: 'Please enter the title of the role:',
            name: 'title',
            maxLength: 30,
            validate: validate.string
        }, 
        {
            type: 'maxlength-input',
            message: 'Please enter the salary for the role:',
            name: 'salary',
            maxLength: '12',
            validate: validate.nan
        }, 
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'department',
            choices: departmentArr,
            loop: false
        }
    ]);
        const role = title.trim();
        const departmentId = await retrieve.queryDepartmentIdByName(department);
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${role}', ${parseFloat(salary)}, ${departmentId})`;
        await retrieve.queryDatabaseAsync(sql);
        render.feedback(`Added ${role} to the database.`);
};

//Function for adding an employee to the database
async function addEmployeePromptAsync() {
    const roleArr = await retrieve.queryRoleArr();
    const { employeeIdArr, employeeNameArr } = await retrieve.queryEmployeeArrays();

    const { firstName, lastName, title, manager } = await inquirer.prompt([
        {
            type: 'maxlength-input',
            message: "Please enter the employee's first name:",
            name: 'firstName',
            maxLength: 30,
            validate: validate.string
        }, 
        {
            type: 'maxlength-input',
            message: "Please enter the employee's last name:",
            name: 'lastName',
            maxLength: '30',
            validate: validate.string
        }, 
        {
            type: 'list',
            message: "Please select the employee's role:",
            name: 'title',
            choices: roleArr,
            loop: false
        },
        {
            type: 'list',
            message: "Please select the employee's manager:",
            name: 'manager',
            choices: employeeNameArr,
            loop: false
        }
    ]);
        const first = firstName.trim();
        const last = lastName.trim();
        const roleId = await retrieve.queryRoleIdByTitle(title);
        
        var managerId;

        if (manager !== 'None') {
        managerId = employeeIdArr[(employeeNameArr.indexOf(manager))];
        } else {managerId = null;}
               
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first}', '${last}', ${roleId}, ${managerId})`;
        await retrieve.queryDatabaseAsync(sql);
        render.feedback(`Added ${first} ${last} to the database.`);
};

module.exports = addDataAsync; 