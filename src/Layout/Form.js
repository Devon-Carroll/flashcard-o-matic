import React from "react";

function Form({ fields, handleSubmit, handleDone }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Render form fields based on the 'fields' prop */}
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <br />
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </div>
      ))}
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleDone}>Done</button>
      </div>
    </form>
  );
}

export default Form;
