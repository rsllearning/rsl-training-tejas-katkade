function TodoFilters({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-buttons-container">
      <button
        type="button"
        className="filter-btn"
        style={{ opacity: currentFilter === 'all' ? 0.6 : 1 }}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        type="button"
        className="filter-btn"
        style={{ opacity: currentFilter === 'done' ? 0.6 : 1 }}
        onClick={() => onFilterChange('done')}
      >
        Done
      </button>
      <button
        type="button"
        className="filter-btn"
        style={{ opacity: currentFilter === 'todo' ? 0.6 : 1 }}
        onClick={() => onFilterChange('todo')}
      >
        Todo
      </button>
    </div>
  );
}

export default TodoFilters;
