import React, { Children, FC, useState, useCallback, useMemo } from 'react'
import './App.css'
import { List } from './components/List';
import { useDictionary } from './hooks/useDictionary'

function App() {
  const dictionary = useDictionary();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredDictionary = React.useMemo(() => {
    if (!searchQuery) {
      return dictionary;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return dictionary.filter(word => word.toLowerCase().includes(lowerCaseQuery));
  }, [dictionary, searchQuery]);
  return (
    <div className="app">
      <div className="header">
        <div>
          <img src="https://storage.googleapis.com/coderpad_project_template_assets/coderpad_logo.svg" />
        </div>
        <div>
          <img src="https://storage.googleapis.com/coderpad_project_template_assets/react.svg" />
          <span>React Virtualized List</span>
        </div>
      </div>
      <div className="content">
        <input
            type="text"
            placeholder="Search words..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        <List items={filteredDictionary} />
      </div>
    </div>
  )
}

export default App
