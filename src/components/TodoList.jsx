import TodoFilters from './TodoFilters';
import TodoItem from './TodoItem';

function TodoList({
  todos,
  filteredTodos,
  currentFilter,
  onFilterChange,
  editingId,
  onToggleComplete,
  onStartEdit,
  onConfirmEdit,
  onCancelEdit,
  onRequestDelete,
}) {
  return (
    <div className="todo-list-section">
      <h2 className="section-title">TodoList</h2>

      {todos.length === 0 ? (
        <p className="no-todo-message">No todo is available</p>
      ) : (
        <>
          <TodoFilters
            currentFilter={currentFilter}
            onFilterChange={onFilterChange}
          />

          <div className="todo-items-container">
            {filteredTodos.length === 0 ? (
              <p className="no-todo-message">No todo is available</p>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={editingId === todo.id}
                  onToggleComplete={onToggleComplete}
                  onStartEdit={onStartEdit}
                  onConfirmEdit={onConfirmEdit}
                  onCancelEdit={onCancelEdit}
                  onRequestDelete={onRequestDelete}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TodoList;
