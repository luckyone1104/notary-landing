import React, { useContext, useEffect } from 'react';
import useLocalStorage from '../helpers/useLocalStorage';
import { db } from '../api/firebase';

const DatabaseContext = React.createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const [serviceList, setServiceList] = useLocalStorage('serviceList');

  useEffect(() => {
    fetchServiceList();
  });

  async function fetchServiceList() {
    try {
      const serviceList = await (await db.ref('serviceList').get()).val();
      setServiceList(serviceList);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateServiceList(list) {
    try {
      await db.ref('serviceList').set(list);
    } catch (err) {
      console.error(err);
    }
  }

  async function createCategory(title) {
    const id = generateRandomId();
    const index = serviceList.length;

    try {
      await db.ref(`serviceList/${index}`).set({
        id: id,
        title: title,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function updateCategory(props) {
    const { categoryeRef } = getCategoryInfoWithId(props.id);
    if (!categoryeRef) return;

    try {
      await db.ref(categoryeRef).update({ title: props.title });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCategory(id) {
    const { categoryIndex } = getCategoryInfoWithId(id);
    categoryIndex > -1 && serviceList.splice(categoryIndex, 1);

    try {
      await db.ref('serviceList').set(serviceList);
    } catch (err) {
      console.error(err);
    }
  }

  async function createService(serviceValues, categoryId) {
    const id = generateRandomId();

    const { category, categoryIndex } = getCategoryInfoWithId(categoryId);
    const serviceIndex = category.services?.length ?? 0;

    try {
      await db
        .ref(`serviceList/${categoryIndex}/services/${serviceIndex}`)
        .set({
          ...serviceValues,
          id: id,
        });
    } catch (err) {
      console.error(err);
    }
  }

  async function updateService(props) {
    const { serviceRef } = getServiceInfoWithId(props.serviceId);

    try {
      await db.ref(serviceRef).update({
        title: props.title,
        text: props.text,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteService(props) {
    const { category, categoryRef, serviceIndex } = getServiceInfoWithId(
      props.serviceId
    );

    serviceIndex > -1 && category.services.splice(serviceIndex, 1);

    try {
      if (!categoryRef) throw new Error('Category reference is not valid!');
      await db.ref(categoryRef).set({ ...category });
    } catch (err) {
      console.error(err);
    }
  }

  function generateRandomId() {
    const currentIds = collectIds();
    let randomId;

    do {
      randomId = Math.random().toString(36).substr(2, 3);
    } while (currentIds.indexOf(randomId) !== -1);

    return randomId;
  }

  function collectIds() {
    const ids = [];

    serviceList.forEach(category => {
      ids.push(category.id);
      category.services?.forEach(service => {
        ids.push(service.id);
      });
    });

    return ids;
  }

  function getCategoryInfoWithId(id) {
    const category = serviceList.find(category => category.id === id);
    const categoryIndex = serviceList.indexOf(category);
    const categoryRef = `serviceList/${categoryIndex}`;

    return {
      category,
      categoryIndex,
      categoryRef,
    };
  }

  function getServiceInfoWithId(id) {
    if (!id) return {};

    const { category, service } = getCurrentCategoryAndServiceWithServiceId(id);
    const { categoryIndex, categoryRef } = getCategoryInfoWithId(category.id);
    const serviceIndex = category.services.indexOf(service);
    const serviceRef = `${categoryRef}/services/${serviceIndex}`;

    return {
      category,
      categoryIndex,
      categoryRef,
      service,
      serviceIndex,
      serviceRef,
    };
  }

  function getCurrentCategoryAndServiceWithServiceId(serviceId) {
    if (!serviceId) return {};
    let category;
    const service = serviceList.reduce(
      (prev, currentArray) =>
        prev ||
        currentArray.services?.find(service => {
          category = currentArray;
          return service.id === serviceId;
        }),
      null
    );

    return { category, service };
  }

  const value = {
    serviceList,
    fetchServiceList,
    updateServiceList,
    createCategory,
    updateCategory,
    deleteCategory,
    createService,
    updateService,
    deleteService,
    getCategoryInfoWithId,
    getServiceInfoWithId,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
