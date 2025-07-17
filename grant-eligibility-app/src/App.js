import React, { useState } from 'react';
import Questionnaire from './Questionnaire';
import Result from './Result';
import './App.css';

const GRANT_TYPES = [
  { key: 'housing', label: 'Homeless Housing (Nonprofit)' },
  { key: 'agriculture', label: 'Agricultural/Land Development' },
  { key: 'church', label: 'Church Support (Faith-Based)' },
  { key: 'transport', label: 'Transportation for Medi-Cal (LLC)' },
];

function App() {
  const [step, setStep] = useState(0);
  const [grantType, setGrantType] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleGrantType = (type) => {
    setGrantType(type);
    setStep(1);
  };

  const handleQuestionnaireComplete = (answers, result) => {
    setAnswers(answers);
    setResult(result);
    setStep(2);
  };

  const handleRestart = () => {
    setStep(0);
    setGrantType(null);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="App" style={{ maxWidth: 600, margin: '2rem auto', padding: 24 }}>
      <h1>Grant Eligibility Finder</h1>
      {step === 0 && (
        <div>
          <h2>What kind of grant are you looking for?</h2>
          {GRANT_TYPES.map((g) => (
            <button key={g.key} style={{ display: 'block', margin: '1rem 0', padding: 12 }} onClick={() => handleGrantType(g.key)}>
              {g.label}
            </button>
          ))}
        </div>
      )}
      {step === 1 && grantType && (
        <Questionnaire grantType={grantType} onComplete={handleQuestionnaireComplete} onBack={handleRestart} />
      )}
      {step === 2 && result && (
        <Result result={result} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
