const mysql =  require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    database: 'blog-database',
    password: 'knacker66'
});

module.exports = pool.promise();
