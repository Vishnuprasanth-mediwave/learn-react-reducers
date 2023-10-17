import { useState } from "react";

function EditForm({ item, handleUpdate }) {
  const [editValue, setEditValue] = useState(item.text);

  function handleOnSubmit(e) {
    e.preventDefault();
    handleUpdate(editValue, item.id);
  }

  return (
    <>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type="text"
          name="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          minLength={5}
          required
        />

        <button type="submit">Update</button>
      </form>
    </>
  );
}
export default EditForm;
