import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css'; // Импортируем CSS файл

class TodoList extends React.Component {
  state = {
    tasks: [],
    title: '',
    description: '',
    showIncomplete: true,
    searchQuery: '',
    selectedImportance: [],
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleImportanceChange = (e) => {
    const value = e.target.value;
    this.setState((prevState) => {
      const selectedImportance = prevState.selectedImportance.includes(value)
        ? prevState.selectedImportance.filter((imp) => imp !== value)
        : [...prevState.selectedImportance, value];
      return { selectedImportance };
    });
  };

  addTask = () => {
    const { title, description, selectedImportance } = this.state;

    if (title.trim() === '') {
      alert('Название задачи не может быть пустым.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description,
      completed: false,
      createdAt: new Date().toLocaleString(),
      importance: selectedImportance.length ? selectedImportance[0] : 'Нормальная',
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      title: '',
      description: '',
      selectedImportance: [],
    }));
  };

  toggleCompletion = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      showIncomplete: !prevState.showIncomplete,
    }));
  };

  render() {
    const { tasks, title, description, showIncomplete, searchQuery, selectedImportance } = this.state;
    const importanceOptions = ['Легкая', 'Средняя', 'Сложная'];

    const filteredTasks = tasks.filter((task) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(query);
      const descriptionMatch = task.description.toLowerCase().includes(query);
      const importanceMatch = selectedImportance.length === 0 || selectedImportance.includes(task.importance);
      return (titleMatch || descriptionMatch) && (showIncomplete ? !task.completed : true) && importanceMatch;
    });

    return (
      <div className="todo-list">
        <div className="header">
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Поиск..."
            className="search-input"
          />
        </div>
        <input
          type="text"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="Название задачи"
          className="input"
        />
        <textarea
          value={description}
          onChange={this.handleDescriptionChange}
          placeholder="Описание задачи"
          className="textarea"
        />

        <div className="importance-section">
          <h3 className="importance-title">Важность</h3>
          <div className="importance-filters">
            {importanceOptions.map((importance) => (
              <label key={importance} className="importance-label">
                <input
                  type="checkbox"
                  value={importance}
                  checked={selectedImportance.includes(importance)}
                  onChange={this.handleImportanceChange}
                />
                {importance}
              </label>
            ))}
          </div>
        </div>

        <div className="button-container">
          <button onClick={this.addTask} className="button">Добавить</button>
          <button onClick={this.toggleFilter} className="button">
            {showIncomplete ? 'Показать все' : 'Только невыполненные'}
          </button>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              toggleCompletion={this.toggleCompletion}
              deleteTask={this.deleteTask}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;