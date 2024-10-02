import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import "./App.css";

const priorityLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const statusOptions = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sorting, setSorting] = useState("priority");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    const savedView = localStorage.getItem("kanbanView");
    if (savedView) {
      const { grouping, sorting } = JSON.parse(savedView);
      setGrouping(grouping);
      setSorting(sorting);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanView", JSON.stringify({ grouping, sorting }));
  }, [grouping, sorting]);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sorting === "priority") return b.priority - a.priority;
    return a.title.localeCompare(b.title);
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    let key;
    if (grouping === "status") key = ticket.status;
    else if (grouping === "user")
      key =
        users.find((user) => user.id === ticket.userId)?.name || "Unassigned";
    else key = priorityLabels[ticket.priority];

    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  if (grouping === "status") {
    statusOptions.forEach((status) => {
      if (!groupedTickets[status]) {
        groupedTickets[status] = [];
      }
    });
  }

  return (
    <div className="app">
      <Header
        grouping={grouping}
        sorting={sorting}
        setGrouping={setGrouping}
        setSorting={setSorting}
      />
      <Board
        groupedTickets={groupedTickets}
        priorityLabels={priorityLabels}
        users={users}
      />
    </div>
  );
}
