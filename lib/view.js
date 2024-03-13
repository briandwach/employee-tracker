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
    const rows = await queryDatabaseAsync(sql);
    renderData(rows);
    return;
};

async function queryDatabaseAsync(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};


function renderData(rows) {
    const keys = Object.keys(rows[0]);
    const columnWidths = {};

    // Initialize column widths with header lengths
    for (const key of keys) {
        columnWidths[key] = key.length;
    }

    // Find the maximum width for each column
    for (const key of keys) {
        const maxRowWidth = Math.max(...rows.map(row => String(row[key]).length));
        columnWidths[key] = Math.max(columnWidths[key], maxRowWidth);
    }

    // Render column headers
    let columnHeaders = '';
    let hyphenHeaders = '';
    for (const key of keys) {
        columnHeaders += key.padEnd(columnWidths[key] + 2); // Add extra padding for spacing
        const hyphenLength = (key.padEnd(columnWidths[key])).length;
        hyphenHeaders += (''.padEnd((hyphenLength), '-') + `  `);
    }

    console.log('');
    console.log(columnHeaders);
    console.log(hyphenHeaders);

    // Render rows
    for (const row of rows) {
        let rowData = '';
        for (const key of keys) {
            rowData += String(row[key]).padEnd(columnWidths[key] + 2); // Add extra padding for spacing
        }
        console.log(rowData);
    }

    console.log('');
    console.log('');
};

module.exports = viewDataAsync; 