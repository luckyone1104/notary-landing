import React, { useCallback, useMemo } from 'react';
import { useState, useRef } from 'react';
import { useDatabase } from '../../../contexts/DatabaseContext';
import useQuery from '../../../helpers/useQuery';
import Modal from '../../common/BootstrapModal';
import {
  DeleteButton,
  BootstrapInput,
  BootstrapTextarea,
  FormFooter,
} from './FormComponents';

export default function ServiceConstructor(props) {
  const {
    fetchServiceList,
    createService,
    updateService,
    deleteService,
    getServiceInfoWithId,
  } = useDatabase();

  const isEditMode = props.match.params.action === 'edit';

  const [modalProps, setModalProps] = useState();
  const [loading, setLoading] = useState(false);

  const inputValuesModified = useRef(false);
  const textareaValuesModified = useRef(false);
  const formValuesModified = useRef(false);
  const titleInput = useRef();
  const textInput = useRef();

  const { service, category } = getServiceInfoWithId(useQuery().get('id'));

  const categoryId = useQuery().get('category') ?? category.id; // Create mode ?? Edit Mode

  const checkIfInputIsModified = useCallback(function checkIfInputIsModified(
    e
  ) {
    checkIfValueIsModified({
      value: e.currentTarget.value,
      initialValue: service?.title,
      modifiedFlag: inputValuesModified,
    });
  },
  []);

  const checkIfTextIsModified = useCallback(function checkIfTextIsModified(e) {
    checkIfValueIsModified({
      value: e.currentTarget.value,
      initialValue: service?.text,
      modifiedFlag: textareaValuesModified,
    });
  }, []);

  function checkIfValueIsModified(props) {
    if (!isEditMode) return;
    props.modifiedFlag.current = props.value !== props.initialValue;
    checkIfFormIsModified();
  }

  function checkIfFormIsModified() {
    formValuesModified.current =
      inputValuesModified.current || textareaValuesModified.current;
  }

  const modalPropsOnDelete = {
    show: true,
    title: 'Бажаєте видалити послугу?',
    body: 'Послуга видалиться з сайту та більше не буде показуватись її користувачам.',
    clickOnSecondButton: async () => {
      await deleteService({
        categoryId: categoryId,
        serviceId: service.id,
      });
      await fetchServiceList();
      props.goBack();
    },
  };

  const handleDeleteClick = useCallback(function handleDeleteClick() {
    setModalProps(modalPropsOnDelete);
  }, []);

  const modalPropsOnGoBack = useMemo(
    () => ({
      show: true,
      title: 'Ви впевнені, що хочете повернутися?',
      body: 'Будь-які внесені вами зміни не будуть збережені!',
      clickOnSecondButton: () => props.goBack(),
    }),
    []
  );

  const handleModalClose = useCallback(
    () => setModalProps({ show: false }),
    []
  );

  const handleGoBackClick = useCallback(function handleGoBackClick() {
    if (formValuesModified.current) {
      setModalProps(modalPropsOnGoBack);
    } else {
      props.goBack();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const inputValues = {
      title: titleInput.current.value,
      text: textInput.current.value,
    };

    if (!isEditMode) {
      await createService(inputValues, categoryId);
      await fetchServiceList();
      props.goBack();
    } else {
      editService(inputValues);
    }
  }

  async function editService(inputValues) {
    if (!formValuesModified.current) {
      props.goBack();
    } else {
      await updateService({
        ...inputValues,
        serviceId: service.id,
      });

      await fetchServiceList();
      props.goBack();
    }
  }

  return (
    <div className="content-container admin__container service-editing__wrapper">
      {isEditMode ? (
        <DeleteButton
          handleDeleteClick={handleDeleteClick}
          disabled={loading}
        />
      ) : null}

      <form onSubmit={handleSubmit}>
        <BootstrapInput
          inputRef={titleInput}
          title="Назва послуги"
          placeholder="Довіреності"
          value={service?.title}
          checkIfModified={checkIfInputIsModified}
        />

        <BootstrapTextarea
          inputRef={textInput}
          title="Опис послуги"
          value={service?.text}
          checkIfModified={checkIfTextIsModified}
        />

        <FormFooter //modal footer
          handleClick={handleGoBackClick}
          loading={loading}
        />
      </form>

      <Modal {...modalProps} handleClose={handleModalClose} />
    </div>
  );
}
