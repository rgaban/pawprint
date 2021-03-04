import React, { useState, useRef } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setIsLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
                .then(setIsLoading(false));
            history.push('/');
        } catch {
            setError('Failed to create an account');
        }
    }

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
                        <h2 className="text-center mb-4">Sign Up</h2>
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
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={isLoading} variant="info" className="w-100" type="submit">Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="login">Log In</Link>
                </div>
            </div>
        </Container>
    )
}

export default Signup;
