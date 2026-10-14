function DeleteConfirmModal({ todo, onConfirm, onCancel }) {
  if (!todo) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Delete Confirmation</h3>
        <p className="modal-message">
          Are you sure you want to delete this todo?
        </p>
        <p className="modal-todo-preview">"{todo.text}"</p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn-modal-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-modal-confirm"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
