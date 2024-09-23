const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const path = require("path");

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    helloJuan(message: String!): String
    helloIvan(message: String!): String
    helloSebastian(message: String!): String
    helloLeandro(message: String!): String
    helloAnaSofia(message: String!): String
    helloOtto(message: String!): String
    helloVenus(message: String!): String
    helloEsteban(message: String!): String
    helloNicolas(message: String!): String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte del profe `;
    },
    helloJuan: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Juan `;
    },
    helloIvan: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Ivan `;
    },
    helloSebastian: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Sebastian `;
    },
    helloLeandro: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Leandro `;
    },
    helloAnaSofia: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Ana Sofia `;
    },
    helloOtto: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Otto `;
    },
    helloVenus: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Venus `;
    },
    helloEsteban: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Esteban `;
    helloNicolas: (_, { message }) => {
      return `¡Hola, ${message}! Un saludo por parte de Nicolas `;
    },
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: "/graphql" });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
  const reactAppPath = path.join(__dirname, "saludofront-app", "dist");
  app.use(express.static(reactAppPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(reactAppPath, "index.html"));
  });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer();
