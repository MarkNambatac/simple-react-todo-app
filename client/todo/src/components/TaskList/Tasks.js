import CompletedTask from "./CompletedTask";
import OngoingTask from "./OngoingTask";
import { Typography } from "@material-tailwind/react";

const Tasks = (props) => {
  const tasks = props.items;

  const handleInputHandler = (taskId) => {
    props.checkedTask(taskId);
  };

  const completedTasks = tasks.filter((task) => task.iscompleted === true);
  const ongoingTasks = tasks.filter((task) => task.iscompleted === false);

  return (
    <>
      <h2 class="font-bold text-2xl text-gray-600">
        Ongoing Tasks ({ongoingTasks.length})
      </h2>
      {ongoingTasks.length > 0 ? (
        <OngoingTask
          ongoingTasks={ongoingTasks}
          handleInput={handleInputHandler}
        ></OngoingTask>
      ) : (
        <Typography variant="h5" color="gray">
          <br></br>
          💪 Keep Going and Get things Done!
        </Typography>
      )}
      <br></br>

      <details class="duration-300">
        <summary class="cursor-pointer font-bold text-2xl text-gray-600">
          Completed Tasks ({completedTasks.length})
        </summary>
        <CompletedTask
          completedTasks={completedTasks}
          handleInput={handleInputHandler}
        ></CompletedTask>
      </details>
    </>
  );
};

export default Tasks;
