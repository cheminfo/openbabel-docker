import convert from './convert.js';
import inputFormats from './inputFormats.js';
import outputFormats from './outputFormats.js';

export default function v1(fastify) {
  convert(fastify);
  inputFormats(fastify);
  outputFormats(fastify);
}
