import React from 'react';
import './no-match.css';

export default function NoMatch() {
  return (
    <div className="no-match">
      <h1 className="no-match__title">404</h1>
      <h2 className="no-match__description">Сторінку не знайдено</h2>
    </div>
  );
}
