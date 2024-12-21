import React from 'react';
import TodoList from './TodoList';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>TODO List</h1>
        <TodoList />
      </div>
    );
  }
}

export default App;