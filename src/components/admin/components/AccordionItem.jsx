import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AccordionItem({ service }) {
  return (
    <div movable="" className="accordion__item" id={service.id}>
      <div className="accordion__item-name">
        <Link
          className="accordion__item-link"
          to={'/admin/edit-service/?id=' + service.id}
        >
          {service.title}
        </Link>
      </div>
      <div className="accordion__arrows-wrapper">
        <span move="down" className="accordion__arrow">
          ↓
        </span>
        <span move="up" className="accordion__arrow">
          ↑
        </span>
      </div>
    </div>
  );
}

AccordionItem.propTypes = {
  service: PropTypes.objectOf(PropTypes.string),
};

export default AccordionItem;
