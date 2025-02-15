import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ToDoList.css"; // Подключаем стили

const API_URL = "http://localhost:5001/api/tasks";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`todo-container ${darkMode ? "dark" : "light"}`}>
      <h2>To-Do List</h2>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️ Светлая тема" : "🌙 Тёмная тема"}
      </button>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Добавить задачу"
      />
      <p></p>
      <button onClick={addTask}>Добавить</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id} className={t.completed ? "completed" : ""}>
            {t.text}
            <button onClick={() => toggleTask(t._id)}>✔</button>
            <button onClick={() => deleteTask(t._id)}>х</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
