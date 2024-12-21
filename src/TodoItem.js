import React from 'react';
import './TodoItem.css';

const TodoItem = ({ task, toggleCompletion, deleteTask }) => {
  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <div className="task-title">
          {task.title}
          <span className="task-importance"> ({task.importance})</span> {/* Отображение сложности */}
        </div>
        <textarea
          className="task-description"
          value={task.description}
          readOnly // Делает поле только для чтения
        />
        <div className="created-at">{task.createdAt}</div>
      </div>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={task.completed}
        onChange={() => toggleCompletion(task.id)}
      />
      <button onClick={() => deleteTask(task.id)}>Удалить</button>
    </div>
  );
};

export default TodoItem;