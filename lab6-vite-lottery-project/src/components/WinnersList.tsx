import type { Participant } from '../types/Participant';

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
          <button
            className="btn btn-info text-white text-nowrap"
            onClick={onSelectWinner}
            disabled={isButtonDisabled}
          >
            New winner
          </button>
        </div>
        
        {winners.length > 0 && (
          <div className="winners-list">
            {winners.map((winner, index) => (
              <div 
                key={winner.id} 
                className="d-flex align-items-center justify-content-between mb-2 p-2 border rounded bg-light"
              >
                <span>
                  <strong>{index + 1}.</strong> {winner.name}
                </span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onRemoveWinner(winner.id)}
                  aria-label="Remove winner"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

