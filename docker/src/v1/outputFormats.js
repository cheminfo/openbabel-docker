import formatsToJSON from './utils/formatsToJSON.js';
import getOutputFormats from './utils/getOutputFormats.js';

export default function outputFormats(fastify) {
  fastify.get(
    '/v1/outputFormats',
    {
      schema: {
        summary: 'List of input formats',
        description: 'Get the list of all the allowed input formats',
      },
    },
    (request, response) => {
      response.send({ result: formatsToJSON(getOutputFormats()), log: '' });
    },
  );
}
