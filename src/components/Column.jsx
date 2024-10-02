import React from 'react';
import TicketCard from './Card';

export default function Column({ group, tickets, priorityLabels, users }) {
  return (
    <div className="column">
      <h2 className="column-header">
        <span>{group}</span>
        <span className="ticket-count">{tickets.length}</span>
      </h2>
      <div className="column-content">
        {tickets.map(ticket => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            priorityLabels={priorityLabels}
            user={users.find(user => user.id === ticket.userId)}
          />
        ))}
      </div>
    </div>
  );
}