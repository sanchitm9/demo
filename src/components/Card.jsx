import React from 'react';

export default function TicketCard({ ticket, priorityLabels, user }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar">
            <img src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
            <span className={`availability-indicator ${user.available ? 'available' : 'unavailable'}`}></span>
          </div>
        )}
      </div>
      <h3 className="card-title">{ticket.title}</h3>
      <div className="card-tags">
        <span className="tag priority-tag">
          <span className="priority-icon">⬆</span>
          {priorityLabels[ticket.priority]}
        </span>
        {ticket.tag.map(tag => (
          <span key={tag} className="tag feature-tag">
            <span className="tag-icon">●</span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}