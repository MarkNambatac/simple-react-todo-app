import { Checkbox, Chip } from "@material-tailwind/react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

const OngoingTask = (props) => {
  const [isShown, setIsShown] = useState(0);
  const tasks = props.ongoingTasks;
  tasks.sort((a, b) => {
    let da = new Date(a.taskduedate);
    let db = new Date(b.taskduedate);
    return db - da;
  });

  const late = new Date() - new Date(tasks.taskduedate);
  console.log(late);
  const handleInput = (taskId) => {
    props.handleInput(taskId);
  };

  const showButtonHandler = (id) => {
    // setIsShown(id);
    console.log("button clicked", id);
  };

  return (
    <div>
      {tasks.map((item) => (
        <ul class="hover:shadow-sm p-2">
          <li class="px-3">
            <div class="flex items-center">
              <Checkbox
                id={item.todo_id}
                defaultChecked={item.iscompleted}
                onChange={() => handleInput(item.todo_id)}
                ripple={true}
                color="green"
              />
              <div class="pl-4">
                <label for={item.todo_id}> {item.taskname}</label>
                <p class="text-xs text-blue-500">
                  Due at:{" "}
                  {new Date(item.taskduedate).toISOString().split("T")[0]}
                </p>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default OngoingTask;
