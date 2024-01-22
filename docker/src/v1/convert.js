import { spawnSync } from 'child_process';

import getBabel from './utils/getBabel.js';
import getInputFormats from './utils/getInputFormats.js';
import getOutputFormats from './utils/getOutputFormats.js';

const BABEL = getBabel();

export default function convert(fastify) {
  fastify.post(
    '/v1/convert',
    {
      schema: {
        summary: 'Convert chemical file formats',
        description:
          'Convert between various chemical file formats using OpenBabel',
        consumes: ['multipart/form-data'],
        body: {
          type: 'object',
          properties: {
            input: {
              description: 'Input file',
              format: 'binary',
            },
            inputFormat: {
              description: 'Input format',
              type: 'string',
              enum: getInputFormats(),
            },
            outputFormat: {
              description: 'Output format',
              type: 'string',
              enum: getOutputFormats(),
            },
            hydrogens: {
              description:
                'Specify if hydrogens should not be touched (leave empty), deleted or added',
              type: 'string',
              enum: ['', 'Delete', 'Add'],
            },
            coordinates: {
              description:
                'Specify if 3D coordinates should not be touched (leave empty), calculate for 2D or 3D',
              type: 'string',
              enum: ['', '2D', '3D'],
            },
            ph: {
              description:
                'pH at which the molecule should be protonated, leave empty for no change',
              type: 'string',
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
  if (body.ph) flags.push(`-p ${body.ph}`);
  if (body.coordinates && body.coordinates === '2D') flags.push('--gen2D');
  if (body.coordinates && body.coordinates === '3D') flags.push('--gen3D');
  flags.push(`-i${body.inputFormat.replace(/ .*/, '')}`);
  flags.push(`-o${body.outputFormat.replace(/ .*/, '')}`);

  try {
    const result = spawnSync(BABEL, flags, {
      stdio: ['pipe', 'pipe', 'pipe'],
      input: body.input,
      encoding: 'utf-8',
      timeout: 10000,
    });

    response.send({ result: result.stdout, log: result.stderr });
  } catch (e) {
    response.send({ result: {}, log: e.toString() });
  }
}
