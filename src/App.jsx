import React from 'react';
import List from "./components/List";
import Form from "./components/Form";
import './App.css';
import { TodosProvider } from './context/TodosContext';

function App() {
  return (
    <TodosProvider>
      <div className="init_body">
        <Form className="init_form" />
        <List />
      </div>
    </TodosProvider>
  );
}

export default App;
