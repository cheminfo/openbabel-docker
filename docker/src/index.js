import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifySensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyPkg from 'fastify';

import v1 from './v1/v1.js';

const fastify = fastifyPkg({
  logger: false,
});

fastify.register(fastifyCors, {
  maxAge: 86400,
});

fastify.register(fastifyMultipart, { attachFieldsToBody: true });

fastify.register(fastifySensible);

fastify.get('/', (_, reply) => {
  reply.redirect('/documentation');
});

await fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Convert chemical file format using OpenBabel',
      description: ``,
      version: '1.0.0',
    },
    produces: ['application/json'],
  },
  exposeRoute: true,
});

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
});

v1(fastify);

await fastify.ready();
fastify.swagger();

// eslint-disable-next-line no-console
console.log('http://localhost:20808')
fastify.listen({ port: 20808, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
