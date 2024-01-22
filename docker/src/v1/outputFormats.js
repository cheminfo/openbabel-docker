import formatsToJSON from './utils/formatsToJSON.js';
import getOutputFormats from './utils/getOutputFormats.js';

export default function outputFormats(fastify) {
  fastify.route({
    url: '/v1/outputFormats',
    method: ['GET', 'POST'],
    handler: getFormats,
    schema: {
      summary: 'List of input formats',
      description: 'Get the list of all the allowed input formats',
    },
  });
}

function getFormats(request, response) {
  response.send({ result: formatsToJSON(getOutputFormats()), log: '' });
}
