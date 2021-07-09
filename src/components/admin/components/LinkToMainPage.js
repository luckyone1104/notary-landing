import React from 'react';
import { Link } from 'react-router-dom';

export default React.memo(function LinkToMainPage() {
  return (
    <Link to="/" className="admin__go-home-link">
      На головну
    </Link>
  );
});
