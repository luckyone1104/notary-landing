import React from 'react';
import PropTypes from 'prop-types';
import useAdminAccordion from './useAdminAccordion';
import AccordionCategory from './AccordionCategory.jsx';
import './admin-accordion.css';
function AdminAccordion(props) {
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
          return <AccordionCategory key={category.id} category={category} />;
        })}
    </div>
  );
}

AdminAccordion.propTypes = {
  initialListValue: PropTypes.object,
  listModified: PropTypes.bool,
  setListModified: PropTypes.func,
  workInProgressList: PropTypes.array,
  setWorkInProgressList: PropTypes.func,
};

export default React.memo(AdminAccordion);
