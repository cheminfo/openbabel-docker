import getOutputFormats from './getOutputFormats.js';

export default function outputFormats(fastify) {
  fastify.get('/v1/inputFormat', {}, (request, response) => {
    response.send(getOutputFormats());
  });
}
