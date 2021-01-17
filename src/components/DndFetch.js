import React, { useState, useEffect, onChange } from 'react';
import { Col, Row, Alert, Image, Form, Button } from 'react-bootstrap';
import facade from '../apiFacade';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from 'react-router-dom';

function RemoteServerFetch() {
    const history = useHistory();
    const [serverRes, setServerRes] = useState(null);
    const [serverRes2, setServerRes2] = useState(null);
    const [error, setError] = useState(null);
    const init = { name: 'john doe', race: 'Dragonborn', klasse: 'Barbarian'};
    const [char, setChar] = useState(init);

    useEffect(() => {
        facade
            .fetchData('/info/classes', 'GET')
            .then((data) => {
                setServerRes(data);
            })
            .catch((err) => {
                setError(
                    'Something went wrong while fetching data from remote servers, statusCode: ' +
                    err.status
                );
            });
    }, []);

    useEffect(() => {
        facade
            .fetchData('/info/races', 'GET')
            .then((data) => {
                setServerRes2(data);
            })
            .catch((err) => {
                setError(
                    'Something went wrong while fetching data from remote servers, statusCode: ' +
                    err.status
                );
            });
    }, []);

    const saveChar = (event) => {
        event.preventDefault();
        console.log(char)
        facade.saveChar(char).then(() => {

            history.push('/dashboard');

        }).catch((err) => {
            if (err.status == 403) {
                setError('Wrong username or password!');
            } else {
                setError('Something went wrong while saving in');
            }
        });
    }

    const onChange = (event) => {
        if (event.target[0] != null) {
            setChar({
                ...char,
                [event.target[0].id]: event.target.value,
            });
        } else {
            setChar({
                ...char,
                [event.target.id]: event.target.value,
            });
        }

    }

    return (
        <>
            {serverRes && serverRes2 ? (


                <Form.Row>
                    <Form onChange={onChange}>

                        <Form.Group>
                            <Form.Control type="text" placeholder="name" id="name" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Classes</Form.Label>
                            <Form.Control as="select">
                                {serverRes.results.map((classes, index) => (

                                    <option id="klasse" key={index.toString()} value={classes.name}>{classes.name}</option>

                                ))}
                            </Form.Control>
                        </Form.Group>


                        <Form.Group as={Col}>
                            <Form.Label>Races</Form.Label>
                            <Form.Control as="select">
                                {serverRes2.map((races, index) => (

                                    <option id="race" key={index.toString()} value={races.name}>{races.name}</option>

                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={saveChar}>Submit</Button>
                    </Form>
                </Form.Row>


            ) : (
                    <>
                        {error ? (
                            <Alert variant="danger">{error}</Alert>
                        ) : (
                                <ClipLoader size={150} color={'#123abc'} loading={true} />
                            )}
                    </>
                )}
        </>
    );
}

export default RemoteServerFetch;