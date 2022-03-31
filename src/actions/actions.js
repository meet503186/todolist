export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: new Date().getTime().toString(),
      todo: todo,
      checked: false
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: {
      id: id,
    },
  };
};

export const removeAllTodos = () => {
  return {
    type: "REMOVE_ALL_TODOS",
  };
};

export const checkTodo = (id) => {
  return {
    type: "CHECK_TODO",
    payload: {
      id: id,
    },
  };
};
