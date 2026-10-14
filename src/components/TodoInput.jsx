import { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      return;
    }
    onAddTodo(description);
    setDescription('');
  };

  return (
    <div className="todo-input-section">
      <h2 className="section-title">TodoInput</h2>
      <div className="todo-input-card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon-box">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="input-icon"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </span>
            <input
              type="text"
              className="todo-text-input"
              placeholder="New Todo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-add-task">
            Add new task
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoInput;
