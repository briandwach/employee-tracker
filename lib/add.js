// Requests for adding department, role, and employee data

const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

//  Imports validation functions for Inquirer prompts
const validate = require('./validate.js');

const retrieve = require('./retrieve.js');

const { Pool } = require('pg');

const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: 'bwow',
        // TODO: Enter PostgreSQL password
        password: 'stillflying',
        host: 'localhost',
        database: 'employeetracker_db'
    },
)

pool.connect();


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
            validate: validate.emptyString        
        }
    ]);
        const sql = `INSERT INTO department (name) VALUES ('${departmentName}')`;
        await queryDatabaseAsync(sql);
        renderFeedback(`Added ${departmentName} to the database.`);
};

// Function for adding a role to the database
async function addRolePromptAsync() {
    const departmentArr = await retrieve.queryDepartmentsArr();

    const { title, salary, department } = await inquirer.prompt([
        {
            type: 'maxlength-input',
            message: 'Please enter the title of the role:',
            name: 'title',
            maxLength: 30,
            validate: validate.emptyString
        }, 
        {
            type: 'input',
            message: 'Please enter the salary for the role:',
            name: 'salary',
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
        const departmentId = await retrieve.queryDepartmentIdByName(department);
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${parseFloat(salary)}, ${departmentId})`;
        await queryDatabaseAsync(sql);
        renderFeedback(`Added ${title} to the database.`);
};

async function queryDatabaseAsync(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

function renderFeedback(databaseFeedback) {
    console.log(databaseFeedback);
    console.log('');
    console.log('');
};

module.exports = addDataAsync; 