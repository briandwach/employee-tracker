// Requests for viewing department, role, and employee data

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


function viewData(initPromptListArr, userViewRequest) {
    var sql = '';
    switch (userViewRequest) {
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

    pool.query(sql, (err, { rows }) => {
        if (err) {
            console.error(err.message);
            return;
        }

        var columnHeaders = ``;

        const keys = Object.keys(rows[0]);
        for (var k = 0; k < keys.length; k++) {
            let keyMember = `${keys[k]}`;
            columnHeaders = columnHeaders + keyMember + '\t';
        }

        console.log('');
        console.log(columnHeaders);
        console.log('-------------------');
        
        for (const row of rows) {
            var rowData = ``;

            for (var k = 0; k < keys.length; k++) {
                let dataPoint = `${row[`${keys[k]}`]}`;
                rowData = rowData + dataPoint + '\t';
            }
            console.log(rowData);
        };
    });
};

module.exports = viewData;