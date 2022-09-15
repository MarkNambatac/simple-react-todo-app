import { Checkbox, Chip } from "@material-tailwind/react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const CompletedTask = (props) => {
  const tasks = props.completedTasks;
  tasks.sort((a, b) => {
    let da = new Date(a.taskcompleteddate);
    let db = new Date(b.taskcompleteddate);
    return db - da;
  });
  const handleInput = (taskId) => {
    props.handleInput(taskId);
  };

  const onHoverDiv = (id) => {
    setIsShown(id);
  };

  const [id, setIsShown] = useState(0);
  return (
    <div class="overflow-y-auto h-40">
      {tasks.map((item) => (
        <ul class="hover:shadow-sm p-2">
          <li class="">
            <div class="px-3 flex items-center">
              <Checkbox
                id={item.todo_id}
                defaultChecked={item.iscompleted}
                onChange={() => handleInput(item.todo_id)}
                ripple={true}
                color="green"
              />
              <div class="pl-4">
                <s>
                  <label for={item.todo_id}> {item.taskname}</label>
                </s>
                <p class="text-xs text-green-500">
                  Completed at:{" "}
                  {new Date(item.taskcompleteddate).toISOString().split("T")[0]}
                </p>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default CompletedTask;
