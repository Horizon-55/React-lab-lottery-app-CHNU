import type { Participant } from '../types/Participant';

interface ParticipantsTableProps {
  participants: Participant[];
}

export const ParticipantsTable = ({ participants }: ParticipantsTableProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            {participants.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No participants yet
                </td>
              </tr>
            ) : (
              participants.map((participant, index) => (
                <tr key={participant.id}>
                  <td>{index + 1}</td>
                  <td>{participant.name}</td>
                  <td>{participant.dateOfBirth}</td>
                  <td>{participant.email}</td>
                  <td>{participant.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

