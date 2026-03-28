export const EditableTextField = () => (
  <div
    draggable
    contentEditable
    className="absolute border min-w-30 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none empty:before:absolute whitespace-pre-wrap"
    data-placeholder="asdasd"
    role="textbox"
    aria-label="text"
    onSelect={() => {}}
    onInput={() => {}}
    style={{}}
  />
);
