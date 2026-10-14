import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import './App.css';

// Initial sample todos
const initialTodos = [
  { id: 1, text: 'Learn ReactJS basics', completed: true },
  { id: 2, text: 'Practice ReactJS', completed: false },
  { id: 3, text: 'Learn Redux', completed: false },
  { id: 4, text: 'Code portfolio in React', completed: false },
  { id: 5, text: 'Learn React Native', completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all'); // 'all', 'done', or 'todo'
  const [editingId, setEditingId] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // Add new todo - appends to end of existing list
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Mark task as completed (cannot be undone once completed)
  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  // Start editing a task
  const handleStartEdit = (id) => {
    setEditingId(id);
  };

  // Confirm edited description
  const handleConfirmEdit = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    setEditingId(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Trigger delete confirmation
  const handleRequestDelete = (todo) => {
    setTodoToDelete(todo);
  };

  // Confirm delete todo
  const handleConfirmDelete = () => {
    if (todoToDelete) {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== todoToDelete.id)
      );
      if (editingId === todoToDelete.id) {
        setEditingId(null);
      }
      setTodoToDelete(null);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setTodoToDelete(null);
  };

  // Filter and sort todos: completed first, then pending tasks
  const getFilteredTodos = () => {
    if (filter === 'done') {
      return todos.filter((todo) => todo.completed);
    }
    if (filter === 'todo') {
      return todos.filter((todo) => !todo.completed);
    }
    // 'all' filter: completed tasks first, then pending tasks
    const completedList = todos.filter((todo) => todo.completed);
    const pendingList = todos.filter((todo) => !todo.completed);
    return [...completedList, ...pendingList];
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="app-container">
      <div className="todo-app-box">
        <TodoInput onAddTodo={handleAddTodo} />

        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          currentFilter={filter}
          onFilterChange={setFilter}
          editingId={editingId}
          onToggleComplete={handleToggleComplete}
          onStartEdit={handleStartEdit}
          onConfirmEdit={handleConfirmEdit}
          onCancelEdit={handleCancelEdit}
          onRequestDelete={handleRequestDelete}
        />

        <DeleteConfirmModal
          todo={todoToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
}

export default App;
