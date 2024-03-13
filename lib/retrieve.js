// Utility file containing functions for retrieving data for other functions in the application

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

const retrieve = {
    queryDepartmentsArr: async () => {
        const { rows } = await queryDatabaseAsync(`SELECT name FROM department ORDER BY name`);
        let departmentsArr = [];
        for (const row of rows) {
            const value = Object.values(row);
            departmentsArr.push(value[0]);
        };
        return departmentsArr;
    },

    queryDepartmentIdByName: async (input) => {
        const { rows } = await queryDatabaseAsync(`SELECT id FROM department WHERE name = '${input}'`);
        const value = Object.values(rows[0]);
        return value;
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

module.exports = retrieve;