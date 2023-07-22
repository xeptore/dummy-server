const crypto = require('node:crypto');
const fastify = require('fastify')({ logger: true })
const { v4: uuidv4 } = require('uuid');

function random() {
  const buf = new Uint8Array(1);
  crypto.getRandomValues(buf);
  if (buf[0] < 85) {
    return 0;
  } else if (buf[0] < 170) {
    return 1;
  } else {
    return 2;
  }
}

fastify.post('/verify', function handler(request, reply) {
  const r = random()
  if (r === 0) {
    // 431
    reply.send([
      1499040000000,
      "M",
      "0.80000000",
      431,
    ])
  } else if (r === 1) {
    // 360
    reply.send([
      1499040000000,
      "M",
      "0.80000000",
      360,
      uuidv4(),
      new Date().getTime(),
    ])
  } else {
    // bs
    reply.send({message: 'I do not know what I am doing!'})
  }
})

fastify.listen({ port: 3000, host: '::' }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})