import { useState } from 'react';
import type { Participant } from './types/Participant';
import { WinnersList } from './components/WinnersList';
import { RegisterForm } from './components/RegisterForm';
import { ParticipantsTable } from './components/ParticipantsTable';
import './App.css';

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winners, setWinners] = useState<Participant[]>([]);

  const handleAddParticipant = (participantData: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      ...participantData,
      id: crypto.randomUUID()
    };
    setParticipants(prev => [...prev, newParticipant]);
  };

  const handleSelectWinner = () => {
    if (winners.length >= 3 || participants.length === 0) {
      return;
    }

    // Отримуємо учасників, які ще не є переможцями
    const availableParticipants = participants.filter(
      participant => !winners.some(winner => winner.id === participant.id)
    );

    if (availableParticipants.length === 0) {
      return;
    }

    // Випадковий вибір
    const randomIndex = Math.floor(Math.random() * availableParticipants.length);
    const newWinner = availableParticipants[randomIndex];

    setWinners(prev => [...prev, newWinner]);
  };

  const handleRemoveWinner = (id: string) => {
    setWinners(prev => prev.filter(winner => winner.id !== id));
  };

  return (
    <div className="app-container">
      <div className="container py-5">
        <WinnersList
          winners={winners}
          participants={participants}
          onSelectWinner={handleSelectWinner}
          onRemoveWinner={handleRemoveWinner}
        />
        
        <RegisterForm onAddParticipant={handleAddParticipant} />
        
        <ParticipantsTable participants={participants} />
      </div>
    </div>
  );
}

export default App;
