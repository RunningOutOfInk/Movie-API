import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    props.onLoggedIn(username)
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    console.log("New User");
    /* Send a request to the server for authentication */
    props.onNewUser()
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter email address" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        {' '}
        <Button variant="secondary" type="link" onClick={handleNewUser}>New User?</Button>
      </Form.Group>
    </Form >
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onNewUser: PropTypes.func.isRequired
};