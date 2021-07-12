const useAdminAccordion = () => {
  const collapse = button => {
    const content = button.classList.contains('accordion__button')
      ? button.nextElementSibling
      : button.parentNode.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  };

  const reorderList = (button, props) => {
    const { setWorkInProgressList } = props;
    const isDirectionUp = button.getAttribute('move') === 'up';
    const item = button.closest('[movable]');
    if (
      isDirectionUp & !hasItemAbove(item) ||
      !isDirectionUp & !hasItemBelow(item)
    )
      return;

    const reorderedList = getReorderedList({ item, isDirectionUp, props });

    setWorkInProgressList(reorderedList);
    markListAsModified(reorderedList, props);
  };

  function hasItemAbove(item) {
    return item.previousElementSibling?.hasAttribute('movable');
  }

  function hasItemBelow(item) {
    return item.nextElementSibling?.hasAttribute('movable');
  }

  function getReorderedList({ item, isDirectionUp, props }) {
    const { workInProgressList } = props;
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

  function markListAsModified(reorderedList, props) {
    const { initialListValue, listModified, setListModified } = props;
    const isModified =
      JSON.stringify(initialListValue.current) !==
      JSON.stringify(reorderedList);

    if (!listModified && isModified) {
      setListModified(isModified);
    } else if (listModified && !isModified) {
      setListModified(isModified);
    }
  }

  return { collapse, reorderList };
};

export default useAdminAccordion;
