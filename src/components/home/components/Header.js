import React from 'react';

import './header.css';
import locationPinIcon from '../../../assets/images/pin.svg';
import telephoneIcon from '../../../assets/images/tel-icon.svg';

export default function Header() {
  function handleClickOnLocation() {
    window.scrollTo({
      top: document.querySelector('.location')?.offsetTop,
      behavior: 'smooth',
    });
  }

  return (
    <header className="header">
      <div className="header__container content-container">
        <div
          onClick={handleClickOnLocation}
          className="header__location-icon-wrapper"
        >
          <img
            src={locationPinIcon}
            alt="Відкрити в Google Maps"
            className="header__icon"
          />
        </div>

        <div className="header__title">Нотаріус, м. Чернівці</div>

        <div className="header__phone-number">+380(95)-870-81-93</div>

        <a href="tel:+380958708193" className="header__phone-icon-wrapper">
          <img src={telephoneIcon} alt="Call button" className="header__icon" />
        </a>
      </div>
    </header>
  );
}
