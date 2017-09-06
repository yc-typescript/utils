import * as mx from 'mock-xmlhttprequest';
import '../__mock__/FormData';
import { fetch } from '../src/fetch';

global.XMLHttpRequest = mx;

test('Should throw error', async () => {
  try {
    await fetch('UNKNOWN', 'http://localhost');
  } catch (e) {
    expect(e).toBe('unsupported method:UNKNOWN');
  }
});

test('Should request success', async () => {
  mx.onSend = function(xhr) {
    var response = 'ok';
    var responseHeaders = {
      'Content-Type': 'application/json',
    };
    xhr.respond(200, responseHeaders, response);
  };
  const res = await fetch('GET', 'http://localhost');
  expect(res).toMatchObject({
    data: 'ok',
    statusCode: 200,
  });
});

test('Should request json success', async () => {
  mx.onSend = function(xhr) {
    var response = {
      result: 'success',
    };
    var responseHeaders = {
      'Content-Type': 'application/json',
    };
    xhr.respond(200, responseHeaders, JSON.stringify(response));
  };
  const res = await fetch('GET', 'http://localhost', null, null, true);
  expect(res).toMatchObject({
    data: { result: 'success' },
    statusCode: 200,
  });
});

test('Should request failure', async () => {
  mx.onSend = function(xhr) {
    var response = 'oops';
    var responseHeaders = {
      'Content-Type': 'application/json',
    };
    xhr.respond(400, responseHeaders, response);
  };
  try {
    await fetch('GET', 'http://localhost');
  } catch (e) {
    expect(e).toMatchObject({
      data: 'oops',
      statusCode: 400,
    });
  }
});

test('Should request json failure', async () => {
  mx.onSend = function(xhr) {
    var response = {
      result: 'failure',
    };
    var responseHeaders = {
      'Content-Type': 'application/json',
    };
    xhr.respond(400, responseHeaders, JSON.stringify(response));
  };
  try {
    await fetch('GET', 'http://localhost');
  } catch (e) {
    expect(e).toMatchObject({
      data: { result: 'failure' },
      statusCode: 400,
    });
  }
});

test('Should request success with headers', async () => {
  mx.onSend = function(xhr) {
    var response = {
      result: 'success',
    };
    var responseHeaders = {
      'Content-Type': 'application/json',
    };
    xhr.respond(200, responseHeaders, JSON.stringify(response));
  };
  const res = await fetch('GET', 'http://localhost', null, {
    'Content-Type': 'application/json',
  });
  expect(res).toMatchObject({
    data: { result: 'success' },
    statusCode: 200,
  });
});

test('Should request formData success', async () => {
  mx.onSend = function(xhr) {
    var response = 'ok';
    var responseHeaders = {
      'Content-Type': 'application/json',
    };
    xhr.respond(200, responseHeaders, response);
  };
  const res = await fetch('POST', 'http://localhost', { a: 1, b: [1, 2, 3] });
  expect(res).toMatchObject({
    data: 'ok',
    statusCode: 200,
  });
});
