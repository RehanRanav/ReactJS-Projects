import React, { useContext, useEffect, useRef, useState } from "react";
import Deletebtn from "../images/trash.svg";
import Editbtn from "../images/edit.svg";
import { TaskContext } from "../TaskContext";
import { toast } from "react-toastify";

const TaskCard = ({ task, index, handleEdit, status }) => {
  const { setTasklist, tasklist } = useContext(TaskContext);
  const [completeTask, setCompleteTask] = useState(status);
  const checkRef = useRef(null);

  const completeTaskStyle = `break-all whitespace-normal
  ${completeTask ? "line-through  opacity-50" : ""}`;

  const deleteTask = (index) => {
    let updatedTasks = [...tasklist];
    updatedTasks.splice(index, 1);
    setTasklist(updatedTasks);

    toast.warning("Task Deleted Successfully...");
  };

  const handleStatus = () => {
    let updatedTasks = [...tasklist];
    updatedTasks[index].status = !completeTask;
    setTasklist(updatedTasks);
    if (!completeTask) {
      toast.info("👏 Good Job! Task Completed...");
    }
    setCompleteTask(!completeTask);
  };

  useEffect(() => {
    if (status === true) {
      checkRef.current.checked = true;
    }
  }, []);

  return (
    <div className="flex justify-between gap-2 border h-fit w-full p-3 rounded shadow-md font-mono">
      <p className={completeTaskStyle}>{task}</p>

      <div className="flex justify-end items-center flex-wrap gap-3">
        <button
          onClick={() => deleteTask(index)}
          className="w-fit h-fit text-center border rounded z-10 bg-white hover:bg-slate-100"
          title="Delete Task"
        >
          <img src={Deletebtn} alt="Enter" className="p-1 min-w-10 min-h-10" />
        </button>

        <button
          onClick={handleEdit}
          className="w-fit h-fit text-center border rounded z-10 bg-white hover:bg-slate-100"
          title="Edit Task"
        >
          <img src={Editbtn} alt="Enter" className="p-1 min-w-10 min-h-10" />
        </button>

        <input
          type="checkbox"
          className="p-1 min-w-10 min-h-8 rounded text-blue-500"
          onChange={handleStatus}
          ref={checkRef}
        />
      </div>
    </div>
  );
};

export default TaskCard;
