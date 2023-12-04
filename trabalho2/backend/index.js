const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "roost",
  database: "contas", // Change this to your database name
});

app.use(express.json());
app.use(cors());

// Adjusted endpoint for registration
app.post("/register", (req, res) => {
  const { renda, gastofixo, descricaofixo } = req.body;

  let sql = "INSERT INTO conta (renda, gastofixo, descricaofixo) VALUES (?, ?, ?)";
  db.query(sql, [renda, gastofixo, descricaofixo], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// Adjusted endpoint for searching
app.post("/search", (req, res) => {
  const { renda, gastofixo, descricaofixo } = req.body;

  let sql = "SELECT * FROM conta WHERE renda = ? AND gastofixo = ? AND descricaofixo = ?";
  db.query(sql, [renda, gastofixo, descricaofixo], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// Adjusted endpoint for getting all records
app.get("/getRecords", (req, res) => {
  let sql = "SELECT * FROM conta";
  db.query(sql, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// Adjusted endpoint for editing
app.put("/edit", (req, res) => {
  const { id, renda, gastofixo, descricaofixo } = req.body;

  let sql = "UPDATE conta SET renda = ?, gastofixo = ?, descricaofixo = ? WHERE id = ?";
  db.query(sql, [renda, gastofixo, descricaofixo, id], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

// Adjusted endpoint for deleting
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM conta WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
