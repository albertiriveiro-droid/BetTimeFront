type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDeleteModal = ({ title, message, onConfirm, onCancel }: Props) => {
  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="admin-modal-actions">
          <button className="admin-btn cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="admin-btn danger" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
