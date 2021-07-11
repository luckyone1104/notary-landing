import React from 'react';
import './admin-accordion.css';
import arrowUp from '../../../assets/images/arrow-up.svg';
import arrowDown from '../../../assets/images/arrow-down.svg';
import pencil from '../../../assets/images/pencil.svg';

import { Link } from 'react-router-dom';

export default React.memo(function AdminAccordion(props) {
  const {
    workInProgressList,
    setWorkInProgressList,
    listModified,
    setListModified,
    initialListValue,
  } = props;

  function handleClick(e) {
    if (e.target.hasAttribute('collapse')) {
      collapse(e.target);
    } else if (e.target.hasAttribute('move')) {
      reorderList(e.target);
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

  function reorderList(button) {
    const isDirectionUp = button.getAttribute('move') === 'up';
    const item = button.closest('[movable]');
    if (
      isDirectionUp & !hasItemAbove(item) ||
      !isDirectionUp & !hasItemBelow(item)
    )
      return;

    const reorderedList = getReorderedList({ item, isDirectionUp });

    setWorkInProgressList(reorderedList);
    markListAsModified(reorderedList);
  }

  function hasItemAbove(item) {
    return item.previousElementSibling?.hasAttribute('movable');
  }

  function hasItemBelow(item) {
    return item.nextElementSibling?.hasAttribute('movable');
  }

  function getReorderedList({ item, isDirectionUp }) {
    let category = workInProgressList.find(category => category.id === item.id);
    let service = category
      ? null
      : workInProgressList.find(category => category.id === item.id) ||
        workInProgressList.reduce(
          (prev, currentArray) =>
            prev ||
            currentArray.services?.find(service => {
              category = currentArray;
              return service.id === item.id;
            }),
          null
        );

    let indexOfFirstItem;
    let indexOfSecondItem;
    const arrayForSwapping = service ? category.services : workInProgressList;

    indexOfFirstItem = service
      ? category.services.indexOf(service)
      : workInProgressList.indexOf(category);
    indexOfSecondItem = isDirectionUp
      ? indexOfFirstItem - 1
      : indexOfFirstItem + 1;

    const arrayWithSwappedItems = swapItemsInArray(
      arrayForSwapping,
      indexOfFirstItem,
      indexOfSecondItem
    );

    let editedList;

    if (service) {
      editedList = workInProgressList.slice();
      editedList[editedList.indexOf(category)].services = arrayWithSwappedItems;
    } else {
      editedList = arrayWithSwappedItems;
    }

    return editedList;
  }

  function swapItemsInArray(array, firstIndex, secondIndex) {
    const newArr = array.slice();
    const temp = newArr[firstIndex];
    newArr[firstIndex] = newArr[secondIndex];
    newArr[secondIndex] = temp;
    return newArr;
  }

  function markListAsModified(reorderedList) {
    const isModified =
      JSON.stringify(initialListValue.current) !==
      JSON.stringify(reorderedList);

    if (!listModified && isModified) {
      setListModified(isModified);
    } else if (listModified && !isModified) {
      setListModified(isModified);
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
