import getOutputFormats from './getOutputFormats.js';

export default function outputFormats(fastify) {
  fastify.get('/v1/outputFormats', {}, (request, response) => {
    response.send(getOutputFormats());
  });
}
