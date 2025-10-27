import { useState } from 'react';
import type { Participant } from '../types/Participant';
import { Button } from './ui/Button';
import styles from './ParticipantsTable.module.scss';

type SortField = 'name' | 'dateOfBirth' | null;
type SortDirection = 'asc' | 'desc';

interface ParticipantsTableProps {
  participants: Participant[];
  onEdit: (participant: Participant) => void;
  onDelete: (participant: Participant) => void;
}

export const ParticipantsTable = ({ participants, onEdit, onDelete }: ParticipantsTableProps) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedParticipants = [...participants].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'dateOfBirth') {
      comparison = new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime();
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↓' : '↑';
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className={styles.tableWrapper}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  Name
                  <button
                    className={`${styles.sortButton} ${sortField === 'name' ? styles.active : ''}`}
                    onClick={() => handleSort('name')}
                    title="Sort by name"
                  >
                    {getSortIcon('name')}
                  </button>
                </th>
                <th>
                  Date of Birth
                  <button
                    className={`${styles.sortButton} ${sortField === 'dateOfBirth' ? styles.active : ''}`}
                    onClick={() => handleSort('dateOfBirth')}
                    title="Sort by date"
                  >
                    {getSortIcon('dateOfBirth')}
                  </button>
                </th>
                <th>Email</th>
                <th>Phone number</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedParticipants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No participants yet
                  </td>
                </tr>
              ) : (
                sortedParticipants.map((participant, index) => (
                  <tr key={participant.id}>
                    <td>{index + 1}</td>
                    <td>{participant.name}</td>
                    <td>{participant.dateOfBirth}</td>
                    <td>{participant.email}</td>
                    <td>{participant.phone}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <Button
                          variant="info"
                          size="small"
                          onClick={() => onEdit(participant)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => onDelete(participant)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

