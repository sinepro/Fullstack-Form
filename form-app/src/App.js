import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';

function App() {

  // Triggering request for table,
  // which retrieves form data stored on server
  const [triggerTable, setTriggerTable] = useState(0);
  const triggerTableRequest = () => {
    setTriggerTable(() => (triggerTable) => triggerTable + 1);
  }

  return (
    <div className="app">
      <div className="app__container">
        <Form triggerTableRequest={triggerTableRequest} />
        <Table triggerTable={triggerTable} />
      </div>
    </div>
  );
}

export default App;
