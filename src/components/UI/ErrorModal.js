import React from "react";
import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";
import ReactDom from 'react-dom';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>Ï
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      on ReactDom we create a createPortal Methode wich takes 2 arguments (the react node (JSX: <Backdrop />) & pointeur vers le vrai dom)
{ReactDom.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
    </React.Fragment>
  );
};

export default ErrorModal;
