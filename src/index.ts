import { DatabaseAdapter } from "./db-connection";
// Require the framework and instantiate it

import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

try {
  DatabaseAdapter.connect();
} catch (error) {
  console.log({ error });
}

// modules
import AWS from "aws-sdk";
var s3 = new AWS.S3();

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: `world ${process.env.APP_NAME}` });
});

fastify.get("/add", function (request, reply) {
  var params = {
    Bucket: "bucketsingapore-1203",
    Key: "12312312.txt",
    Body: "hello, another!",
  };

  // action
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
  reply.send({ hello: "oke" });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
