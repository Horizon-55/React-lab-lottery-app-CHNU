import type { Participant } from '../types/Participant';
import styles from './WinnerItem.module.scss';

interface WinnerItemProps {
  winner: Participant;
  index: number;
  onRemove: (id: string) => void;
}

export const WinnerItem = ({ winner, index, onRemove }: WinnerItemProps) => {
  return (
    <div className={styles.winnerItem}>
      <div className={styles.winnerInfo}>
        <span className={styles.winnerNumber}>{index + 1}.</span>
        <span className={styles.winnerName}>{winner.name}</span>
      </div>
      <button
        className={styles.removeButton}
        onClick={() => onRemove(winner.id)}
        aria-label="Remove winner"
      >
        ×
      </button>
    </div>
  );
};

