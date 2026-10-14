import { useState } from 'react';

function EditTodoForm({ todo, onConfirmEdit, onCancelEdit }) {
  const [editText, setEditText] = useState(todo.text);

  const handleConfirm = () => {
    if (!editText.trim()) {
      return;
    }
    onConfirmEdit(todo.id, editText);
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="todo-item-card">
      <input
        type="text"
        className="edit-todo-input"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className="edit-actions">
        <button
          type="button"
          className="btn-cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-confirm"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function TodoItem({
  todo,
  isEditing,
  onToggleComplete,
  onStartEdit,
  onConfirmEdit,
  onCancelEdit,
  onRequestDelete,
}) {
  if (isEditing) {
    return (
      <EditTodoForm
        todo={todo}
        onConfirmEdit={onConfirmEdit}
        onCancelEdit={onCancelEdit}
      />
    );
  }

  return (
    <div className="todo-item-card">
      <span
        className={`todo-description ${todo.completed ? 'completed' : ''}`}
      >
        {todo.text}
      </span>
      <div className="todo-actions">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          disabled={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          title={todo.completed ? 'Completed' : 'Mark as completed'}
        />
        <button
          type="button"
          className="btn-edit"
          disabled={todo.completed}
          onClick={() => onStartEdit(todo.id)}
          title={todo.completed ? 'Completed tasks cannot be edited' : 'Edit task'}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onRequestDelete(todo)}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
