import React from 'react';

function Result({ result, onRestart }) {
  return (
    <div>
      <h2>Results</h2>
      {result.eligible ? (
        <div>
          <h3>You may qualify for:</h3>
          <ul>
            {result.grants.map((g) => (
              <li key={g.name} style={{ margin: '1rem 0' }}>
                <strong>{g.name}</strong><br />
                {g.description}<br />
                <a href={g.link} target="_blank" rel="noopener noreferrer">Learn more</a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>Not eligible yet</h3>
          <p>{result.message}</p>
        </div>
      )}
      <button onClick={onRestart} style={{ marginTop: 24, padding: 12 }}>Start Over</button>
    </div>
  );
}

export default Result;