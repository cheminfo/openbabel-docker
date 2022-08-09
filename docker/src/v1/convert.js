import { spawnSync } from 'child_process';

import getBabel from './getBabel.js';
import getInputFormats from './getInputFormats.js';
import getOutputFormats from './getOutputFormats.js';

const BABEL = getBabel();

export default function convert(fastify) {
  fastify.post(
    '/v1/convert',
    {
      schema: {
        consumes: ['multipart/form-data'],
        body: {
          type: 'object',
          properties: {
            input: {
              format: 'binary',
            },
            inputFormat: {
              type: 'string',
              enum: getInputFormats(),
            },
            outputFormat: {
              type: 'string',
              enum: getOutputFormats(),
            },
            hydrogens: {
              type: 'string',
              enum: ['Delete', 'Add'],
            },
            coordinates: {
              type: 'string',
              enum: ['', '2D', '3D'],
            },
            ph: {
              type: 'boolean',
            },
          },
        },
      },
    },
    doConvert,
  );
}

async function doConvert(request, response) {
  const body = request.body;
  let flags = [];
  if (body.hydrogens && body.hydrogens === 'Delete') flags.push('-d');
  if (body.hydrogens && body.hydrogens === 'Add') flags.push('-h');
  //  if (body.ph) flags.push(`-p ${body.ph}`);
  if (body.coordinates && body.coordinates === '2D') flags.push('--gen2D');
  if (body.coordinates && body.coordinates === '3D') flags.push('--gen3D');
  flags.push(`-i${body.inputFormat.replace(/ .*/, '')}`);
  flags.push(`-o ${body.outputFormat.replace(/ .*/, '')}`);

  const result = spawnSync(BABEL, flags, {
    stdio: ['pipe', 'pipe', 'pipe'],
    input: body.input,
    encoding: 'utf-8',
  });

  response.send({ result: result.stdout, log: result.stderr });
}
