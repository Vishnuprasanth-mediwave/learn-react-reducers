import { useRef } from "react";
import EditForm from "./editForm";
const TodoList = ({
  todos,
  handleDelete,
  handleEdit,
  handleDone,
  handleUpdate,
  dragUpdate,
}) => {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let newTodos = [...todos];

    const dragItemContent = newTodos.splice(dragItem.current, 1)[0];

    newTodos.splice(dragOverItem.current, 0, dragItemContent);
    dragUpdate(newTodos);
  };
  function handleCheck(e, id) {
    // console.log(e.target.checked);
    // console.log(id);
    let type = "done";
    if (!e.target.checked) {
      type = "undone";
    }
    handleDone(id, type);
  }
  return (
    <div>
      <h1>My todos</h1>
      <div>
        {todos.map((t, index) => (
          <div
            key={t.id}
            // style={{ display: "flex", height: "30px", alignItems: "center" }}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
          >
            {t.isEdit ? (
              <>
                <EditForm
                  item={t}
                  handleUpdate={(text, id) => handleUpdate(text, id)}
                />
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={t.isDone}
                  onChange={(e) => handleCheck(e, t.id)}
                />
                <span
                  style={t.isDone ? { textDecoration: "line-through" } : {}}
                >
                  {t.text}
                </span>

                <button onClick={() => handleDelete(t.id)}>Delete</button>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* {todos.map((t) => (
        <div key={t.id}>
          <input type="text" name="" id="" value={t.text} />

          <button onClick={() => handleDelete(t.id)}>Update</button>
        </div>
      ))} */}
    </div>
  );
};

export default TodoList;
