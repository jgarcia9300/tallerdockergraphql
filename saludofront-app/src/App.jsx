import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  gql,
} from "@apollo/client";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const HELLO_QUERY = gql`
  query Hello($message: String!) {
    hello(message: $message)
    helloJuan(message: $message)
    helloIvan(message: $message)
    helloSebastian(message: $message)
    helloLeandro(message: $message)
    helloAnaSofia(message: $message)
    helloOtto(message: $message)
    helloVenus(message: $message)
    helloNicolas(message: $message)

  }
`;

function Hello() {
  const [message, setMessage] = useState("");
  const [getGreeting, { loading, error, data }] = useLazyQuery(HELLO_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    getGreeting({ variables: { message } });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
      {data && <h2 className="mt-3">{data.hello}</h2>}
      {data && <h2 className="mt-3">{data.helloJuan}</h2>}
      {data && <h2 className="mt-3">{data.helloIvan}</h2>}
      {data && <h2 className="mt-3">{data.helloSebastian}</h2>}
      {data && <h2 className="mt-3">{data.helloLeandro}</h2>}
      {data && <h2 className="mt-3">{data.helloAnaSofia}</h2>}
      {data && <h2 className="mt-3">{data.helloOtto}</h2>}
      {data && <h2 className="mt-3">{data.helloVenus}</h2>}
      {data && <h2 className="mt-3">{data.helloNicolas}</h2>}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="my-5">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h1>Aplicación React y GraphQL</h1>
            <Hello />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

export default App;
