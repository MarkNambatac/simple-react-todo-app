import { useEffect, useState } from "react";
import Tasks from "./components/TaskList/Tasks";
import "./App.css";
import axios from "axios";
import FormModal from "./components/UI/FormModal";
import NavigationBar from "./components/UI/NavigationBar";
import { Button } from "@material-tailwind/react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/todos");

      setTasks(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const newTaskHandler = async (task) => {
    var newTask = {
      taskname: task.task,
      taskduedate: task.deadline,
      taskcompleteddate: null,
    };
    console.log(newTask);
    try {
      const response = await axios.post("http://localhost:4000/todos", newTask);
      setTasks([...tasks, response.data]);
      setShowModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateStatusHandler = async (taskId) => {
    let updatedTask = tasks.map((task) => {
      if (task.todo_id === taskId) {
        task.iscompleted = !task.iscompleted;
        if (task.iscompleted) {
          task.taskcompleteddate = new Date();
        } else {
          task.taskcompleteddate = null;
        }
      }
      return task;
    });

    let status = updatedTask.find((x) => x.todo_id === taskId).iscompleted;
    let completedDate = updatedTask.find(
      (x) => x.todo_id === taskId
    ).taskcompleteddate;

    try {
      const response = await axios.put(
        `http://localhost:4000/todos/${taskId}`,
        { iscompleted: status, taskcompleteddate: completedDate }
      );
    } catch (err) {
      console.error(err.message);
    }

    setTasks(updatedTask);
  };

  const showModalHandler = (e) => {
    setShowModal(true);
  };

  const backdropHandler = (status) => {
    setShowModal(false);
  };

  return (
    <>
      <div class="mx-auto w-4/12 h-80 my-24">
        <div class="p-5 drop-shadow-xl bg-white ">
          {showModal && (
            <FormModal
              newTask={newTaskHandler}
              status={backdropHandler}
            ></FormModal>
          )}
          <div class="flex justify-center items-center ">
            <button
              class="hover:drop-shadow-xl pb-10"
              onClick={showModalHandler}
            >
              <svg
                class="inline-block align-middle svg-icon fill-blue-600 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
              <h1 class="text-gray-600 font-extrabold text-3xl pl-4 inline-block align-middle">
                Add Tasks
              </h1>
            </button>
          </div>
          <section id="tasks">
            <Tasks items={tasks} checkedTask={updateStatusHandler}></Tasks>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
