import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/tasks";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;
    const res = await axios.post(API_URL, { text: task });
    setTasks([...tasks, res.data]);
    setTask("");
  };

  const toggleTask = async (id) => {
    const res = await axios.put(`${API_URL}/${id}`);
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Добавить задачу"
      />
      <button onClick={addTask}>Добавить</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            {t.text}
            <button onClick={() => toggleTask(t._id)}>✔</button>
            <button onClick={() => deleteTask(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
