import React, { useState } from 'react';
import Chart from './components/Chart';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chart');

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERSY - Trading Analysis</h1>
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'chart' ? 'active' : ''}
            onClick={() => setActiveTab('chart')}
          >
            График
          </button>
          <button 
            className={activeTab === 'indicators' ? 'active' : ''}
            onClick={() => setActiveTab('indicators')}
          >
            Индикаторы
          </button>
          <button 
            className={activeTab === 'ai' ? 'active' : ''}
            onClick={() => setActiveTab('ai')}
          >
            AI Анализ
          </button>
        </nav>
      </header>

      <main className="App-main">
        {activeTab === 'chart' && (
          <div className="tab-content">
            <Chart />
          </div>
        )}

        {activeTab === 'indicators' && (
          <div className="tab-content">
            <h2>Индикаторы</h2>
            <p>Здесь будут LinReg, EMA и другие индикаторы из вашего расширения</p>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="tab-content">
            <h2>AI Анализ</h2>
            <p>Здесь будет интеграция с LLM для анализа данных</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>Веб-версия ERSY - без ограничений Chrome Extension</p>
      </footer>
    </div>
  );
}

export default App;