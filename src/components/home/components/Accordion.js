import React from 'react';
import './accordion.css';

export default function Accardion(props) {
  const category = props.category;
  return (
    <div className="services__category">
      <p className="services__title">{category.title}</p>

      <div
        className="block-shadow accordion accordion-flush"
        id={`accordion-${category.id}`}
      >
        {category.services.map(service => {
          return (
            <AccordionItem
              key={service.id}
              service={service}
              parent={`accordion-${category.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function AccordionItem(props) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`flush-heading-${props.service.id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#flush-collapse-${props.service.id}`}
          aria-expanded="false"
          aria-controls={`flush-collapse-${props.service.id}`}
        >
          {props.service.title}
        </button>
      </h2>
      <div
        id={`flush-collapse-${props.service.id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`flush-heading-${props.service.id}`}
        data-bs-parent={`#${props.parent}`}
      >
        <div className="accordion-body">{props.service.text}</div>
      </div>
    </div>
  );
}

export { AccordionItem };
