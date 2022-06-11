/// <reference lib="webworker" />

// addEventListener('message', ({ data }) => {
//   const response = `worker response to ${data}`;
//   postMessage(response);
// });

addEventListener('connect', (e: any) => {
  console.log('connected');
  const port = e.ports[0];

  port.addEventListener('message', (command: any) => {
    console.log('got command');
    port.postMessage({
      command,
      result: true,
    });
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
});
