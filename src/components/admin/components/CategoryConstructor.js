import React, { useCallback } from 'react';
import { useState, useRef } from 'react';
import { useDatabase } from '../../../contexts/DatabaseContext';
import useQuery from '../../../helpers/useQuery';
import Modal from '../../common/BootstrapModal';
import { DeleteButton, BootstrapInput, FormFooter } from './FormComponents';

export default function CategoryConstructor(props) {
  const {
    fetchServiceList,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryInfoWithId,
  } = useDatabase();

  const isEditMode = props.match.params.action === 'edit';

  const [modalProps, setModalProps] = useState();
  const [loading, setLoading] = useState(false);

  const titleInput = useRef();
  const inputModified = useRef(false);

  const { category } = getCategoryInfoWithId(useQuery().get('id'));

  const checkIfTitleModified = useCallback(function checkIfTitleModified(e) {
    if (!isEditMode) return;

    if (!inputModified.current && e.currentTarget.value !== category.title) {
      inputModified.current = true;
    } else if (inputModified && e.currentTarget.value === category.title) {
      inputModified.current = false;
    }
  }, []);

  const modalPropsOnDelete = {
    show: true,
    title: 'Бажаєте видалити категорію?',
    body: 'Категорія видалиться з сайту та більше не буде показуватись її користувачам.',
    clickOnSecondButton: async () => {
      await deleteCategory(category.id);
      await fetchServiceList();
      props.goBack();
    },
  };

  const handleDeleteClick = useCallback(function handleDeleteClick() {
    setModalProps(modalPropsOnDelete);
  }, []);

  const modalPropsOnGoBack = {
    show: true,
    title: 'Ви впевнені, що хочете повернутися?',
    body: 'Будь-які внесені вами зміни не будуть збережені!',
    clickOnSecondButton: () => props.goBack(),
  };

  const handleGoBackClick = useCallback(function handleGoBackClick() {
    if (inputModified.current) {
      setModalProps(modalPropsOnGoBack);
    } else {
      props.goBack();
    }
  }, []);

  const handleModalClose = useCallback(
    () => setModalProps({ show: false }),
    []
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isEditMode) {
      setLoading(true);
      await createCategory(titleInput.current.value);
      await fetchServiceList();
      props.goBack();
    } else {
      editCategory(titleInput.current.value);
    }
  }

  async function editCategory(categoryTitle) {
    if (!inputModified.current) {
      props.goBack();
    } else {
      setLoading(true);
      await updateCategory({ id: category.id, title: categoryTitle });
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
          title="Назва категорії"
          placeholder="Нотаріальні дії"
          value={category?.title}
          checkIfModified={checkIfTitleModified}
        />

        <FormFooter loading={loading} handleClick={handleGoBackClick} />
      </form>

      <Modal {...modalProps} handleClose={handleModalClose} />
    </div>
  );
}
