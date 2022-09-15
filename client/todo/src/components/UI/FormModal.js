import TodoForm from "../NewTodo/TodoForm";
import styles from "./FormModal.module.css";

const FormModal = (props) => {
  return (
    <>
      <div
        class="blur-lg"
        className={styles.backdrop}
        onClick={props.status}
      ></div>
      <div className={styles.modal} id="task-form">
        <TodoForm newTask={props.newTask} status={props.status}></TodoForm>
      </div>
    </>
  );
};

export default FormModal;
