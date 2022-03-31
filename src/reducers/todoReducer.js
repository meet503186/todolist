const initialState = {
  list: [],
};

export const todoReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case "ADD_TODO":
      const { id, todo, checked } = action.payload;

      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            todo: todo,
            checked: checked,
          },
        ],
      };

    case "DELETE_TODO":
      const newList = state.list.filter(
        (element) => element.id !== action.payload.id
      );

      return {
        ...state,
        list: newList,
      };

    case "REMOVE_ALL_TODOS":
      return {
        list: [],
      };

    case "CHECK_TODO":
      state.list.map((elem) => {
        if (elem.id === action.payload.id) {
          elem.checked = !elem.checked;
        }
      });

      return {
        ...state,
        list: [
          ...state.list
        ],
      };

    default:
      return state;
  }
};
