// Object exported for calling render functions to the terminal

const render = {
    feedback: (databaseFeedback) => {
        console.log(databaseFeedback);
        console.log('');
        console.log('');
    },

    data: (rows) => {
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
    }
};

module.exports = render;