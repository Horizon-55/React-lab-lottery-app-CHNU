import { useState, useMemo } from 'react';
import type { Participant } from './types/Participant';
import { WinnersList } from './components/WinnersList';
import { RegisterForm } from './components/RegisterForm';
import { ParticipantsTable } from './components/ParticipantsTable';
import { SearchBar } from './components/SearchBar';
import { EditParticipantModal } from './components/EditParticipantModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [participants, setParticipants] = useLocalStorage<Participant[]>('lottery-participants', []);
  const [winners, setWinners] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Модальні вікна
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [deletingParticipant, setDeletingParticipant] = useState<Participant | null>(null);

  // Фільтрація учасників за пошуковим запитом
  const filteredParticipants = useMemo(() => {
    if (!searchQuery) return participants;
    
    const query = searchQuery.toLowerCase();
    return participants.filter(p => 
      p.name.toLowerCase().includes(query)
    );
  }, [participants, searchQuery]);

  const handleAddParticipant = (participantData: Omit<Participant, 'id'>) => {
    const newParticipant: Participant = {
      ...participantData,
      id: crypto.randomUUID()
    };
    setParticipants(prev => [...prev, newParticipant]);
  };

  const handleUpdateParticipant = (id: string, updatedData: Omit<Participant, 'id'>) => {
    setParticipants(prev => 
      prev.map(p => p.id === id ? { ...updatedData, id } : p)
    );
    
    // Оновлюємо переможця якщо він був обраний
    setWinners(prev => 
      prev.map(w => w.id === id ? { ...updatedData, id } : w)
    );
  };

  const handleDeleteParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
    
    // Видаляємо з переможців якщо він там є
    setWinners(prev => prev.filter(w => w.id !== id));
  };

  const handleSelectWinner = () => {
    if (winners.length >= 3 || participants.length === 0) {
      return;
    }

    const availableParticipants = participants.filter(
      participant => !winners.some(winner => winner.id === participant.id)
    );

    if (availableParticipants.length === 0) {
      return;
    }

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
        
        <RegisterForm 
          onAddParticipant={handleAddParticipant}
          existingParticipants={participants}
        />
        
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
        />
        
        <ParticipantsTable 
          participants={filteredParticipants}
          onEdit={setEditingParticipant}
          onDelete={setDeletingParticipant}
        />

        <EditParticipantModal
          isOpen={editingParticipant !== null}
          onClose={() => setEditingParticipant(null)}
          participant={editingParticipant}
          onUpdate={handleUpdateParticipant}
          existingParticipants={participants}
        />

        <DeleteConfirmModal
          isOpen={deletingParticipant !== null}
          onClose={() => setDeletingParticipant(null)}
          participant={deletingParticipant}
          onConfirm={handleDeleteParticipant}
        />
      </div>
    </div>
  );
}

export default App;
