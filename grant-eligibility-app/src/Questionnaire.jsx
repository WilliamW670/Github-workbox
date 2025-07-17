import React, { useState } from 'react';
import grantQuestions, { evaluateEligibility } from './grantData';

function Questionnaire({ grantType, onComplete, onBack }) {
  const questions = grantQuestions[grantType] || [];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleChange = (e) => {
    setAnswers({ ...answers, [questions[step].key]: e.target.value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Evaluate eligibility
      const result = evaluateEligibility(grantType, answers);
      onComplete(answers, result);
    }
  };

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: 16 }}>Back</button>
      <h2>{questions[step]?.question}</h2>
      <input
        type="text"
        value={answers[questions[step]?.key] || ''}
        onChange={handleChange}
        style={{ width: '100%', padding: 8, margin: '1rem 0' }}
      />
      <button onClick={handleNext} style={{ padding: 12 }}>
        {step < questions.length - 1 ? 'Next' : 'See Results'}
      </button>
    </div>
  );
}

export default Questionnaire;