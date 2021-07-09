import React from 'react';
import { useState, useCallback } from 'react';
import { useDatabase } from '../../../contexts/DatabaseContext';
import AdminAccordion from './AdminAccordion';
import { SaveButton } from './FormComponents';
import Loading from '../../common/Loading';
import CreateCategoryButton from './CreateCategoryButton';
import LinkToMainPage from './LinkToMainPage';

export default function ServiceList() {
  const [loading, setLoading] = useState(false);
  const [listModified, setListModified] = useState(false);
  const { serviceList, fetchServiceList, updateServiceList } = useDatabase();

  async function handleClick() {
    setLoading(true);
    await updateServiceList(getReorderedList(serviceList, getDOMList()));
    await fetchServiceList();
    setLoading(false);
    setListModified(false);
  }

  const getReorderedList = useCallback(function getReorderedList(
    originalArr,
    editedArr
  ) {
    return originalArr.map((item, i) => {
      if (item.id !== editedArr[i].id) {
        const newItem = originalArr.find(item => item.id === editedArr[i].id);
        if (newItem.services) {
          newItem.services = getReorderedList(
            newItem.services,
            editedArr[i].services
          );
        }
        return newItem;
      } else {
        if (item.services) {
          const newItem = { ...item };
          newItem.services = getReorderedList(
            newItem.services,
            editedArr[i].services
          );
          return newItem;
        }
        return item;
      }
    });
  },
  []);

  const checkIfListIsModified = useCallback(
    serviceList => {
      const isModified =
        JSON.stringify(serviceList) !==
        JSON.stringify(getReorderedList(serviceList, getDOMList()));

      setListModified(isModified);
    },
    [getReorderedList]
  );

  function getDOMList() {
    const categories = document.querySelectorAll(
      '.accordion__category-wrapper'
    );
    return Array.from(categories).map((category, index) => {
      const services = Array.from(
        categories[index].querySelectorAll('.accordion__item')
      );
      return {
        id: category.id,
        services: services.map(service => ({ id: service.id })),
      };
    });
  }

  return (
    <div className="content-container admin__container">
      <CreateCategoryButton />

      {serviceList ? (
        <AdminAccordion
          loading={loading}
          checkIfListIsModified={checkIfListIsModified}
          categories={serviceList}
        />
      ) : (
        <div style={{ padding: '32px 0 0', boxSizing: 'border-box' }}>
          <Loading />
        </div>
      )}

      <div className="admin__buttons-wrapper d-grid gap-2 col-6 mx-auto">
        <SaveButton
          loading={loading}
          disabled={!listModified}
          onClick={handleClick}
          stylingClasses="admin__save-button"
        />

        <LinkToMainPage />
      </div>
    </div>
  );
}
