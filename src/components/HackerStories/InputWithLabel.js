import * as React from 'react';

const InputWithLabel = ({
    id,
    value,
    onInputChange,
    isFocused,
    children,
    type = "text",
    className='input',
  }) => {
    const inputRef = React.useRef();
  
    React.useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isFocused]);
  
    return (
      <>
        <label htmlFor={id} className="label">
          {children}
        </label>
        &nbsp;
        <input
          id={id}
          ref={inputRef}
          className={className}
          type={type}
          value={value}
          onChange={onInputChange}
          autoComplete="off"
        />
      </>
    );
  };

  export { InputWithLabel };