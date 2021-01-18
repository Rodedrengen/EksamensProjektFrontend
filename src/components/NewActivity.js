import React, { useEffect, useState } from 'react';
import facade from '../apiFacade';
import { useHistory } from 'react-router-dom';
import utils from './utils';
import { Col, Row, Form, Button, Alert, Container, InputGroup } from 'react-bootstrap';

function NewActivity(props) {
    const history = useHistory();

    const init = { type: '', duration: 0, distance: 0, comment: '', city: ''};
    const [data, setData] = useState(init);
    const [error, setError] = useState(null);
    const [user, setUserData] = useState(null);

    const logActivity = (evt) => {
        evt.preventDefault();

        if (data.type !== '' && data.type !== 0 && data.distance !== 0) {
            
            facade
                .logActivity(data.type, data.duration, data.distance, data.comment, user.username, data.city)
                .catch((err) => {
                    utils.notify("something went wrong saving","error");
                })
        }
    }

    useEffect(() => {
        const user = facade.getUser();
        console.log(user)
        if (user) {
            setUserData(user);
            history.push('/newActivity');
        } else {
            history.push('/');
        }
    }, []);

    const logout = () => {
        facade.logout();
        props.setUser([]);
        props.setLoggedIn(false);
        props.setAdmin(false);
        history.push('/');
    };

    const handleChange = (evt) => {
        console.log(evt.target.id)
        setData({
            ...data,
            [evt.target.id]: evt.target.value,
        });
    };

    return (
        <>
            <Container>
                <Button variant="primary" onClick={() => logout()}>
                    Logout
                    </Button>
                <Form onChange={handleChange}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" placeholder="Enter type" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter city" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="duration">
                            <Form.Label>Duration</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" placeholder="Duration" />
                                <InputGroup.Append>
                                    <InputGroup.Text id="inputGroupPrepend">min</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} controlId="distance">
                            <Form.Label>Distance</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" placeholder="Distance" />
                                <InputGroup.Append>
                                    <InputGroup.Text id="inputGroupPrepend">km</InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="comment">
                            <Form.Label>Kommentar</Form.Label>
                            <Form.Control as="textarea" />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" onClick={logActivity}>
                        Gem aktivitet
                    </Button>
                </Form>

            </Container>
        </>
    )
}
export default NewActivity;

