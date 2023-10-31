import "./index.css";
import { useState } from "react";
import React from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  const [items, set_items] = useState([]);

  function addItem(newItem) {
    set_items((items) => [...items, newItem]);
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>Far Away 🌴</h1>
    </div>
  );
}
function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quan, setQuan] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quan, packed: false, id: Date.now() };

    addItem(newItem);

    setQuan(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your Trip</h3>
      <select value={quan} onChange={(e) => setQuan(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
