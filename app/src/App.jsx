import { useEffect, useReducer } from "react";

import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoAddForm";

/*
{
  id: 123,
  text: 'Foo',
  isDone: false
}
*/
function App() {
  const [todos, dispatch] = useReducer(todoReducer, saveToLocalStorage());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   dispatch({ type: "LOAD_TODOS", value: saveToLocalStorage() });
  // }, []);

  function saveToLocalStorage() {
    const storedValues = localStorage.getItem("todos");
    if (storedValues) {
      return JSON.parse(storedValues);
    } else {
      return [];
    }
  }

  function todoReducer(todos, action) {
    switch (action.type) {
      // case "LOAD_TODOS": {
      //   return action.value;
      // }

      case "TODO_ADD": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.value,
            isDone: false,
            isEdit: false,
          },
        ];
      }
      case "TODO_DELETE": {
        const filtered = todos.filter((t) => t.id != action.value);
        return [...filtered];
      }
      case "TODO_EDIT": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isEdit"] = true;
        }
        return newTodos;
      }
      case "TODO_UPDATE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value.id);
        if (idx !== -1) {
          newTodos[idx]["text"] = action.value.text;
          newTodos[idx]["isEdit"] = false;
        }
        return newTodos;
      }
      case "TODO_DRAG": {
        return action.value;
      }
      case "TODO_DONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = true;
        }
        return newTodos;
      }
      case "TODO_UNDONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = false;
        }
        return newTodos;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAdd(value) {
    dispatch({
      type: "TODO_ADD",
      value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TODO_DELETE",
      value: id,
    });
  }
  function handleEdit(id) {
    dispatch({
      type: "TODO_EDIT",
      value: id,
    });
  }
  function handleUpdate(text, id) {
    dispatch({
      type: "TODO_UPDATE",
      value: { text, id },
    });
  }
  function dragUpdate(newTodos) {
    dispatch({
      type: "TODO_DRAG",
      value: newTodos,
    });
  }
  function handleDone(id, type) {
    if (type == "done") {
      dispatch({
        type: "TODO_DONE",
        value: id,
      });
    } else {
      dispatch({
        type: "TODO_UNDONE",
        value: id,
      });
    }
  }

  return (
    <>
      <h1>My todo</h1>

      <TodoAddForm handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleDone={handleDone}
        handleEdit={handleEdit}
        handleUpdate={handleUpdate}
        dragUpdate={dragUpdate}
      />
    </>
  );
}

export default App;
