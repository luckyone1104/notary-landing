import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccordionItem from './AccordionItem.jsx';
import arrowUp from '../../../assets/images/arrow-up.svg';
import arrowDown from '../../../assets/images/arrow-down.svg';
import pencil from '../../../assets/images/pencil.svg';

function AccordionCategory({ category }) {
  return (
    <div movable="" className="accordion__category-wrapper" id={category.id}>
      <button collapse="" type="button" className="accordion__button">
        <div edit-category="" className="accordion__pencil-svg-wrapper">
          <Link to={'/admin/edit-category/?id=' + category.id}>
            <img
              edit-category=""
              src={pencil}
              alt=""
              height="18px"
              width="18px"
            />
          </Link>
        </div>
        <div collapse="">{category.title}</div>
        <div className="accordion__arrows-wrapper">
          <img
            move="down"
            className="accordion__category-arrow"
            src={arrowDown}
            alt=""
            height="18px"
            width="18px"
          />
          <img
            move="up"
            className="accordion__category-arrow"
            src={arrowUp}
            alt=""
            height="18px"
            width="18px"
          />
        </div>
      </button>
      <div className="accordion__content" movable-parent="">
        <Link
          className="accordion__add-item-link"
          to={`/admin/create-service/?category=${category.id}`}
        >
          Додати послугу
        </Link>
        {category.services &&
          category.services.map(service => {
            return <AccordionItem key={service.id} service={service} />;
          })}
      </div>
    </div>
  );
}

AccordionCategory.propTypes = {
  category: PropTypes.object,
};

export default AccordionCategory;
