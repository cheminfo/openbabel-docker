import formatsToJSON from './utils/formatsToJSON.js';
import getInputFormats from './utils/getInputFormats.js';

export default function inputFormats(fastify) {
  fastify.get(
    '/v1/inputFormats',
    {
      schema: {
        summary: 'List of input formats',
        description: 'Get the list of all the allowed input formats',
      },
    },
    (request, response) => {
      response.send({ result: formatsToJSON(getInputFormats()), log: '' });
    },
  );
}
