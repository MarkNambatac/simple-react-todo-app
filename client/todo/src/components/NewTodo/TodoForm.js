import { useState } from "react";
import styles from "./TodoForm.module.css";
import { Input, Button, Textarea } from "@material-tailwind/react";

const TodoForm = (props) => {
  var currentDate = new Date();
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(currentDate);

  const todoHandler = (e) => {
    setTask(e.target.value);
  };

  const deadlineHandler = (e) => {
    setDeadline(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const todo = {
      task: task,
      deadline: deadline,
    };

    if (todo.task.trim().length === 0) {
      return;
    }

    props.newTask(todo);
    setTask("");
    setDeadline(currentDate);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <Input label="Task Name" onChange={todoHandler} value={task} />
        <br></br>

        <Input
          label="Deadline"
          type="date"
          onChange={deadlineHandler}
          value={new Date(deadline).toISOString().split("T")[0]}
        />
        <br></br>
      </div>
      <div className="flex gap-4 justify-center">
        <Button color="red" ripple={true}>
          Cancel
        </Button>
        <Button variant="gradient" type="submit" ripple={true}>
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
