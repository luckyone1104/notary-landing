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
  const [modalShow, setModalShow] = useState(false);
  const [inputModified, setInputModified] = useState(false);
  const [loading, setLoading] = useState(false);

  const titleInput = useRef();

  const { category } = getCategoryInfoWithId(useQuery().get('id'));

  function checkIfTitleModified(e) {
    if (!isEditMode) return;
    setInputModified(e.currentTarget.value !== category.title);
  }

  const modalPropsOnDelete = {
    title: 'Бажаєте видалити категорію?',
    body: 'Категорія видалиться з сайту та більше не буде показуватись її користувачам.',
    clickOnSecondButton: async () => {
      await deleteCategory(category.id);
      await fetchServiceList();
      props.goBack();
    },
  };

  function handleDeleteClick() {
    setModalProps(modalPropsOnDelete);
    setModalShow(true);
  }

  const modalPropsOnGoBack = {
    title: 'Ви впевнені, що хочете повернутися?',
    body: 'Будь-які внесені вами зміни не будуть збережені!',
    clickOnSecondButton: () => props.goBack(),
  };

  function handleGoBackClick() {
    if (inputModified) {
      setModalProps(modalPropsOnGoBack);
      setModalShow(true);
    } else {
      props.goBack();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!isEditMode) {
      await createCategory(titleInput.current.value);
      await fetchServiceList();
      props.goBack();
    } else {
      editCategory(titleInput.current.value);
    }
  }

  async function editCategory(categoryTitle) {
    if (!inputModified) {
      props.goBack();
    } else {
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

      <Modal
        {...modalProps}
        show={modalShow}
        handleClose={() => {
          setModalShow(false);
        }}
      />
    </div>
  );
}
