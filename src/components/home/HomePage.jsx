import React from 'react';
import Header from './components/Header.jsx';
import PhotoAndName from './components/PhotoAndName.jsx';
import Services from './components/Services.jsx';
import Location from './components/Location.jsx';

export default function HomePage() {
  return (
    <>
      <Header />
      <PhotoAndName />
      <Services />
      <Location />
    </>
  );
}
