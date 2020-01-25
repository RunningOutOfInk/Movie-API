import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" value={username} onChange={e => createUsername(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" placeholder="01/01/1980" value={birthday} onChange={e => createBirthday(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Register Email Address</Form.Label>
        <Form.Control type="email" placeholder="Register email address" value={email} onChange={e => createEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Create Password</Form.Label>
        <Form.Control type="password" placeholder="Create Password" value={password} onChange={e => createPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form.Group>
    </Form>
  );
}