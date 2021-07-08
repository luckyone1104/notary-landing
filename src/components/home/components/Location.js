import React from 'react';
import './location.css';

export default function Location() {
  return (
    <div className="location">
      <div className="content-container">
        <div className="location__title">Соборна площа, 8</div>

        <div className="location__map-wrapper">
          <iframe
            className="location__map block-shadow"
            width="200"
            height="200"
            title="map"
            allowFullScreen=""
            loading="lazy"
            src={process.env.REACT_APP_GOOGLE_MAPS_URL} // eslint-disable-line
          ></iframe>
        </div>
      </div>
    </div>
  );
}
