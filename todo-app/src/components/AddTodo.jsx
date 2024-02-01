import React, { useContext, useEffect, useRef } from "react";
import arrow from "../images/arrow_forward.svg";
import Notask from "../images/Notasks.jpg";
import TaskCard from "./TaskCard";
import { TaskContext } from "../TaskContext";



const AddTodo = () => {
  const { tasklist, setTasklist } = useContext(TaskContext);
  const taskref = useRef(null);

  useEffect(() => {
    let tasks = localStorage.getItem("tasklist");
    tasks = JSON.parse(tasks);
    console.log(tasks);
    setTasklist(tasks);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("tasklist", JSON.stringify(tasklist));
    }, 800);
  }, [tasklist]);

  const addTask = () => {
    let inputTask = taskref.current.value;
    inputTask = inputTask.trim();
    if (inputTask.length > 0) {
      setTasklist((prevTask) => [
        ...prevTask,
        { task: inputTask, status: false },
      ]);
    }
    taskref.current.value = ``;
    console.log(tasklist);
  };

  const editTask = (index) => {
    let updatedTasks = [...tasklist];
    let editedTask = updatedTasks.splice(index, 1);
    setTasklist(updatedTasks);
    taskref.current.value = editedTask[0].task;
  };

  return (
    <>
      <div className="inputbar p-5 w-full flex items-center justify-center">
        <input
          ref={taskref}
          type="text"
          placeholder="Enter Your To do"
          className="p-3 w-3/6 border-b-2 border-black outline-none font-mono"
        />

        <button
          onClick={addTask}
          className="text-center border rounded -ml-10 z-10 bg-white hover:bg-slate-100"
        >
          <img src={arrow} alt="Enter" className="p-1 min-w-10" />
        </button>

      </div>

      <div className="flex flex-col gap-5 justify-center items-center w-1/2 m-auto">
        {tasklist.length > 0 ? (
          tasklist.map((task, index) => {
            return (
              <TaskCard
                key={index}
                index={index}
                task={task.task}
                status={task.status}
                handleEdit={() => editTask(index)}
              />
            );
          })
        ) : (
          <img
            src={Notask}
            alt="No Task Found"
            className="w-2/6 m-auto p-auto"
          />
        )}
      </div>
    </>
  );
};

export default AddTodo;