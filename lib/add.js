// Requests for adding department, role, and employee data

const inquirer = require('inquirer');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

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
    var sql = '';
    switch (userRequest) {
        case initPromptListArr[3]:
            await addDepartmentPromptAsync();
            break;
        case initPromptListArr[4]:
            sql = `SELECT role.id AS "ID", role.title AS "Title", department.name AS "Department", role.salary AS "Salary" FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id`;
            break;
        case initPromptListArr[5]:
            sql = `SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS "Title", department.name AS "Department", role.salary AS "Salary", m.first_name || ' ' || m.last_name AS "Manager" FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY e.id`;
            break;
    };
    return;
};

// Function for adding a department to the database
async function addDepartmentPromptAsync() {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'maxlength-input',
            message: 'Please enter the department name?',
            name: 'departmentName',
            maxLength: 30
        }
    ]);

    if (departmentName !== '') {
        const sql = `INSERT INTO department (name) VALUES ('${departmentName}')`;
        await queryDatabaseAsync(sql);
        renderFeedback(`Added ${departmentName} to the database.`);
    } else {
        console.log('Name not entered. Please enter the department name.');
        await addDepartmentPromptAsync();
    }
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