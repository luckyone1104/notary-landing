import React, { useState, useRef } from 'react';
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
  const [workInProgressList, setWorkInProgressList] = useState(serviceList);
  const initialListValue = useRef(workInProgressList);

  async function handleClick() {
    setLoading(true);
    await updateServiceList(workInProgressList);
    await fetchServiceList();
    setLoading(false);
    setListModified(false);
    initialListValue.current = workInProgressList;
  }

  return (
    <div className="content-container admin__container">
      <CreateCategoryButton />

      {workInProgressList ? (
        <AdminAccordion
          workInProgressList={workInProgressList}
          setWorkInProgressList={setWorkInProgressList}
          listModified={listModified}
          setListModified={setListModified}
          initialListValue={initialListValue}
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
