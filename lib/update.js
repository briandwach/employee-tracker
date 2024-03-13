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


async function updateDataAsync() {
    const roleArr = await retrieve.queryRoleArr();
    const { employeeIdArr, employeeNameArr } = await retrieve.queryEmployeeArrays();

    const { employee, title } = await inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'employee',
            choices: employeeNameArr,
            loop: false
        },
        {
            type: 'list',
            message: "Which role do you want to assign the selected employee?",
            name: 'title',
            choices: roleArr,
            loop: false
        }
    ]);
        const roleId = await retrieve.queryRoleIdByTitle(title);
        
        const employeeId = employeeIdArr[(employeeNameArr.indexOf(employee))];
                       
        const sql = `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`;
        await queryDatabaseAsync(sql);
        renderFeedback("Updated employee's role.");
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

module.exports = updateDataAsync; 