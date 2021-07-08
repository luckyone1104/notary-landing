import React from 'react';
import Header from './components/Header';
import PhotoAndName from './components/PhotoAndName';
import Services from './components/Services';
import Location from './components/Location';

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
