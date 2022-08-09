import getInputFormats from './getInputFormats.js';

export default function inputFormats(fastify) {
  fastify.get('/v1/inputFormats', {}, (request, response) => {
    response.send(getInputFormats());
  });
}
