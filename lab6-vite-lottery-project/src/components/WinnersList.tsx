import type { Participant } from '../types/Participant';
import { WinnerItem } from './WinnerItem';
import { Button } from './ui/Button';

interface WinnersListProps {
  winners: Participant[];
  participants: Participant[];
  onSelectWinner: () => void;
  onRemoveWinner: (id: string) => void;
}

export const WinnersList = ({ 
  winners, 
  participants, 
  onSelectWinner, 
  onRemoveWinner 
}: WinnersListProps) => {
  const isButtonDisabled = winners.length >= 3 || participants.length === 0;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <input
            type="text"
            className="form-control me-3"
            placeholder="Winners"
            value={winners.map(w => w.name).join(', ')}
            readOnly
          />
          <Button
            variant="info"
            onClick={onSelectWinner}
            disabled={isButtonDisabled}
            className="text-white text-nowrap"
          >
            New winner
          </Button>
        </div>
        
        {winners.length > 0 && (
          <div className="winners-list">
            {winners.map((winner, index) => (
              <WinnerItem
                key={winner.id}
                winner={winner}
                index={index}
                onRemove={onRemoveWinner}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

