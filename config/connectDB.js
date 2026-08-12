const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "72.61.238.64",
  user: "1xclub",
  password: "GiEdh3mF6CxtTtRn",
  database: "1xclub",
});

export default connection;
