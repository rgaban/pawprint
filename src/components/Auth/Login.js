import React, { useState, useRef } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setError('');
            setIsLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
                .then(setIsLoading(false));
            history.push('/');
        } catch {
            setError('Failed to sign in');
        }
    };

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "40vh",
                paddingTop: "40px"
            }}
        >
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={isLoading} variant="info" className="w-100" type="submit">Log In</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </Container>
    );
};

export default Login;
