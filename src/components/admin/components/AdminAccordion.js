import './admin-accordion.css';
import arrowUp from '../../../assets/images/arrow-up.svg';
import arrowDown from '../../../assets/images/arrow-down.svg';
import pencil from '../../../assets/images/pencil.svg';

import { Link } from 'react-router-dom';

export default function AdminAccordion(props) {
  function handleClick(e) {
    if (e.target.hasAttribute('collapse')) {
      collapse(e.target);
    } else if (e.target.hasAttribute('move')) {
      moveHTMLElement(e.target);
    }
  }

  function collapse(button) {
    const content = button.classList.contains('accordion__button')
      ? button.nextElementSibling
      : button.parentNode.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }

  function moveHTMLElement(arrowButton) {
    if (props.loading) return;

    const element = arrowButton.closest('[movable]');
    const parent = element.closest('[movable-parent]');
    const direction = arrowButton.getAttribute('move');

    if (direction === 'up') {
      moveElementUp(element, parent);
    } else if (direction === 'down') moveElementDown(element, parent);

    props.checkIfListIsModified();
  }

  function moveElementUp(element, parent) {
    const prevElement = element.previousElementSibling;
    if (
      !prevElement ||
      prevElement.classList.contains('accordion__add-item-button')
    )
      return;

    parent.insertBefore(element, prevElement);
  }

  function moveElementDown(element, parent) {
    const nextElement = element.nextElementSibling.nextElementSibling;
    nextElement && parent.insertBefore(element, nextElement);
  }

  return (
    <div onClick={handleClick} movable-parent="" className="accordion__wrapper">
      {props.categories &&
        props.categories.map(category => {
          return <AccardionCategory key={category.id} category={category} />;
        })}
      <div />{' '}
      {/*Empty div makes it posiible for element to move into the last position*/}
    </div>
  );
}

function AccardionCategory(props) {
  const { category } = props;
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
        <div />{' '}
        {/*Empty div makes it posiible for element to move into the last position*/}
      </div>
    </div>
  );
}

function AccardionItem(props) {
  const { service } = props;
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
