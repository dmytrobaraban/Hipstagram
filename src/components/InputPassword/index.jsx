import React, { useState, forwardRef } from 'react';
import Input from '../Input';

const InputPassword = forwardRef((props, ref) => {
  const [type, setType] = useState(props.type || 'password');

  const handleClick = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const style = {
    position: 'relative',
  };

  const styleButtonShow = {
    position: 'absolute',
    top: '35%',
    padding: '10px',
    right: '10px',
    border: 'none',
    background: 'url(assets/svg/f070_icon.svg) 0% 0% / 20px no-repeat',
  };

  const styleButtonHide = {
    ...styleButtonShow,
    background: 'url(assets/svg/f06e_icon.svg) 0% 0% / 20px no-repeat',
  };

  const newProps = { ...props, type, ref };

  return (
    <div style={style}>
      <Input {...newProps} />
      <button
        style={type === 'password' ? styleButtonShow : styleButtonHide}
        onClick={handleClick}
        type="button"
      ></button>
    </div>
  );
});

export default InputPassword;
