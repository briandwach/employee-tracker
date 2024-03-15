// Request for updating employee's role in database

const inquirer = require('inquirer');

// Imports database retrieval functions and render to console functionss
const retrieve = require('../util/retrieve.js');
const render = require('../util/render.js');


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
        await retrieve.queryDatabaseAsync(sql);
        render.feedback("Updated employee's role.");
};     

module.exports = updateDataAsync; 