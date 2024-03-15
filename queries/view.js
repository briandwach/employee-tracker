// Requests for viewing department, role, and employee data

//  Imports database retrieval functions and render to console functions
const retrieve = require('../util/retrieve.js');
const render = require('../util/render.js');

// Routes to specific query based on user selection
async function viewDataAsync(initPromptListArr, userRequest) {
    var sql = '';
    switch (userRequest) {
        case initPromptListArr[0]:
            sql = `SELECT id AS "ID", name AS "Department" FROM department ORDER BY id`;
            break;
        case initPromptListArr[1]:
            sql = `SELECT role.id AS "ID", role.title AS "Title", department.name AS "Department", role.salary AS "Salary" FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id`;
            break;
        case initPromptListArr[2]:
            sql = `SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS "Title", department.name AS "Department", role.salary AS "Salary", m.first_name || ' ' || m.last_name AS "Manager" FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY e.id`;
            break;
    };
    const { rows } = await retrieve.queryDatabaseAsync(sql);
    render.data(rows);
    return;
};

module.exports = viewDataAsync; 