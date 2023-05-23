import React from 'react';
import cx from 'classnames';

// @styles
import css from './Button.module.scss';

interface ButtonsPropsTypes {
    children:string,
    onClickHandler: () => void,
    disabled:boolean
    classes:string|string[]
}

const Button = ({ children, onClickHandler, disabled, classes }:ButtonsPropsTypes) => {
  return (
    <button
        data-testid="betButton"
        className={cx(css.Button, classes)}
        disabled={disabled}
        onClick={onClickHandler}
    >
        {children}
    </button>
  )
}

export default Button;
