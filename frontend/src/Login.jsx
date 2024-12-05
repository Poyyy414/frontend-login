import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import logo from './assets/ncf_logo.png';

import { API_ENDPOINT } from './Api.jsx';

function LoginSignup() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup

  /* Verify if User In Session in LocalStorage */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
          setUser(token.data);
          navigate('/dashboard');
        } else {
          throw new Error('No token found');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  /* Login State and Methods */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', JSON.stringify(response));
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  /* Signup State and Methods */
  const [fullname, setFullname] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/register`, {
        fullname,
        username,
        password,
      });

      localStorage.setItem('token', JSON.stringify(response));
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>
        </Container>
      </Navbar>
      <br /> <br /> <br /> <br /> <br /> <br />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <div className="login_signup_form">
              <div className="container">
                <div className="login-logo" style={{ textAlign: 'center' }}>
                  <img src={logo} width="38%" alt="Logo" />
                </div>
                <center>
                  MCFi: A Proposed Enrollment Systems <br /> Using Serverless Computing
                </center>
                &nbsp;
                <div className="card">
                  <div className="card-body login-card-body">
                    {isSignup ? (
                      <Form onSubmit={handleSignup}>
                        <Form.Group controlId="formFullname">
                          <Form.Label>Full Name:</Form.Label>
                          <Form.Control
                            className="form-control-sm rounded-0"
                            type="text"
                            placeholder="Enter Full Name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                          <Form.Label>Username:</Form.Label>
                          <Form.Control
                            className="form-control-sm rounded-0"
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                          <Form.Label>Password:</Form.Label>
                          <Form.Control
                            className="form-control-sm rounded-0"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formsButton">
                          {error && <p style={{ color: 'red' }}>{error}</p>}
                          <Button
                            variant="success"
                            className="btn btn-block bg-custom btn-flat rounded-0"
                            size="sm"
                            type="submit"
                          >
                            Signup
                          </Button>
                        </Form.Group>
                      </Form>
                    ) : (
                      <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formUsername">
                          <Form.Label>Username:</Form.Label>
                          <Form.Control
                            className="form-control-sm rounded-0"
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                          <Form.Label>Password:</Form.Label>
                          <Form.Control
                            className="form-control-sm rounded-0"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="formsButton">
                          {error && <p style={{ color: 'red' }}>{error}</p>}
                          <Button
                            variant="success"
                            className="btn btn-block bg-custom btn-flat rounded-0"
                            size="sm"
                            type="submit"
                          >
                            Login
                          </Button>
                        </Form.Group>
                      </Form>
                    )}
                    <div className="mt-3 text-center">
                      <Button
                        variant="link"
                        onClick={() => setIsSignup(!isSignup)}
                      >
                        {isSignup
                          ? 'Already have an account? Login'
                          : "Don't have an account? Signup"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginSignup;
