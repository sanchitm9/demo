import React from 'react';
import Column from './Column';

export default function Board({ groupedTickets, priorityLabels, users }) {
  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <Column
          key={group}
          group={group}
          tickets={tickets}
          priorityLabels={priorityLabels}
          users={users}
        />
      ))}
    </div>
  );
}