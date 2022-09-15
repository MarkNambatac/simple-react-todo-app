const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const port = process.env.PORT || 4000;

const app = express();

// Middlewares
app.use(bodyParser.json()); //
app.use(cors()); //enable cross sharing across react app since it is a different origin
app.use(morgan("common")); //useful logs in terminal
// app.use(helmet()); //use for securing express http
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Testing!!");
});

app.post("/todos", async (req, res) => {
  try {
    const { taskname, taskduedate, taskcompleteddate } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO tasks (taskname, taskduedate, taskcompleteddate) VALUES($1, $2, $3) RETURNING *",
      [taskname, taskduedate, taskcompleteddate]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM tasks ORDER BY taskduedate DESC"
    );
    res.send(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM tasks WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { iscompleted, taskcompleteddate } = req.body;
    const updateTodo = await pool.query(
      "UPDATE tasks SET iscompleted = $1, taskcompleteddate = $2 WHERE todo_id = $3",
      [iscompleted, taskcompleteddate, id]
    );
    console.log(updateTodo);
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM tasks WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
