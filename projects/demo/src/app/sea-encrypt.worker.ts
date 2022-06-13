/// <reference lib="webworker" />
import * as Gun from 'gun';

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});
