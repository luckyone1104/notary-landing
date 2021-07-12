import React from 'react';
import { Link } from 'react-router-dom';

export default React.memo(function LinkToMainPage() {
  return (
    <Link className="admin__add-category-link" to="admin/create-category">
      Додати категорію
    </Link>
  );
});
