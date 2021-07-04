import { useRef } from 'react';

import Header from './components/Header';
import PhotoAndName from './components/PhotoAndName';
import Services from './components/Services';
import Location from './components/Location';

export default function HomePage() {
  const location = useRef();

  return (
    <>
      <Header location={location} />
      <PhotoAndName />
      <Services />
      <Location location={location} />
    </>
  );
}
