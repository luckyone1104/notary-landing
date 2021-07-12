import React from 'react';
import { Link } from 'react-router-dom';
import useAdminAccordion from './useAdminAccordion';
import './admin-accordion.css';
import arrowUp from '../../../assets/images/arrow-up.svg';
import arrowDown from '../../../assets/images/arrow-down.svg';
import pencil from '../../../assets/images/pencil.svg';

export default React.memo(function AdminAccordion(props) {
  const { workInProgressList } = props;
  const { collapse, reorderList } = useAdminAccordion();

  function handleClick(e) {
    if (e.target.hasAttribute('collapse')) {
      collapse(e.target);
    } else if (e.target.hasAttribute('move')) {
      reorderList(e.target, props);
    }
  }

  return (
    <div onClick={handleClick} movable-parent="" className="accordion__wrapper">
      {workInProgressList &&
        workInProgressList.map(category => {
          return <AccardionCategory key={category.id} category={category} />;
        })}
    </div>
  );
});

function AccardionCategory({ category }) {
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
            return <AccardionItem key={service.id} service={service} />;
          })}
      </div>
    </div>
  );
}

function AccardionItem({ service }) {
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
