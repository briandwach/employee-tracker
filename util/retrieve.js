// Utility file containing functions for retrieving database data for other functions in the application

const { Pool } = require('pg');

const pool = new Pool(
    {
        // NOTE: Change this to your PostgreSQL username
        user: 'bwow',
        // NOTE: Change this to your PostgreSQL password
        password: 'stillflying',
        host: 'localhost',
        database: 'employeetracker_db'
    },
)

const retrieve = {
    queryDepartmentArr: async () => {
        const { rows } = await retrieve.queryDatabaseAsync(`SELECT name FROM department ORDER BY name`);
        let departmentsArr = [];
        for (const row of rows) {
            departmentsArr.push(row.name);
        };
        return departmentsArr;
    },

    queryDepartmentIdByName: async (input) => {
        const { rows } = await retrieve.queryDatabaseAsync(`SELECT id FROM department WHERE name = '${input}'`);
        const value = rows[0].id;
        return value;
    },

    queryRoleArr: async () => {
        const { rows } = await retrieve.queryDatabaseAsync(`SELECT title FROM role ORDER BY title`);
        let roleArr = [];
        for (const row of rows) {
            roleArr.push(row.title);
        };
        return roleArr;
    },

    queryEmployeeArrays: async () => {
        const { rows } = await retrieve.queryDatabaseAsync(`SELECT id, first_name || ' ' || last_name AS name FROM employee ORDER BY first_name`);
        let employeeIdArr = [];
        let employeeNameArr = [];
        for (const row of rows) {
            employeeIdArr.push(row.id);
            employeeNameArr.push(row.name);
        };
        employeeNameArr.push('None');
        const employeeArrays = { employeeIdArr, employeeNameArr };
        return employeeArrays;
    },

    queryRoleIdByTitle: async (input) => {
        const { rows } = await retrieve.queryDatabaseAsync(`SELECT id FROM role WHERE title = '${input}'`);
        const value = rows[0].id;
        return value;
    },

    queryDatabaseAsync: async (sql) => {
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
    }
};

module.exports = retrieve;