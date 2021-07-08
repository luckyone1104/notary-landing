import React from 'react';
import './loading.css';

export default function Loading(props) {
  const sizeConfig = {
    container: 'loading__wrapper_container-size',
    window: 'loading__wrapper_window-size',
  };

  return (
    <div
      className={
        'loading__wrapper ' +
        (sizeConfig[props.size] || sizeConfig['container'])
      }
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
}
