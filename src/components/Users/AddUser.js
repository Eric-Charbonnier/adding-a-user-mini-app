import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef(); 

  // const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameInputRef);
    console.log(nameInputRef.current.value);

    const enteredName = nameInputRef.current.value;
    const enteredUserAge  = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) { // if empty string
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredUserAge < 1) { // avec le + on force la conversion en number
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    // console.log(enteredUsername, enteredAge);
    // props.onAddUser(enteredUsername, enteredAge); // lifting the state up in App 
    props.onAddUser(enteredName, enteredUserAge);
    // avec l'utilisation des refs on a donc plus besoin de reseter les states ci-dessous car on utilise plus les states pour recup nos values. donc on va retirer les states egalement en haut et on a plus besoin des deux handlers ci-dessdous egalement, idem pour la value property dans les inputs
    // setEnteredUsername('');
    // setEnteredAge('');
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    // pas conseillé mais pour reseter les values entrées par l'utilisateur, ca peut se faire
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null); // set to null afin d'avoir une valeur falthy pour ne pas afficher la condition dans le return ({error && (<ErrorModal) ....
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            // connection de la ref ci-dessous
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
