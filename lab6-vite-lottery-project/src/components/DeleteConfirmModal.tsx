import type { Participant } from '../types/Participant';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant | null;
  onConfirm: (id: string) => void;
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  participant,
  onConfirm
}: DeleteConfirmModalProps) => {
  const handleConfirm = () => {
    if (participant) {
      onConfirm(participant.id);
      onClose();
    }
  };

  if (!participant) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Participant"
      footer={
        <>
          <Button variant="info" onClick={onClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Yes
          </Button>
        </>
      }
    >
      <p>
        Are you sure you want to delete participant "{participant.name}", "{participant.email}"?
      </p>
    </Modal>
  );
};

