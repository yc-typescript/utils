export function fetch(
  method: string,
  url: string,
  params: any = {},
  headers: any = {},
  json: boolean = false
): Promise<any> {
  if (
    !~['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method.toUpperCase())
  ) {
    return Promise.reject('unsupported method:' + method);
  }
  return new Promise((resolve, reject) => {
    let formData: any;
    const xhr: XMLHttpRequest = new XMLHttpRequest();

    if (json) {
      formData = JSON.stringify(params);
    } else {
      formData = new FormData();
      if (params) {
        for (const key of Object.keys(params)) {
          if (params[key].constructor === Array) {
            for (const item of params[key]) {
              formData.append(key, item);
            }
          } else {
            formData.append(key, params[key]);
          }
        }
      }
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          try {
            const response: any = JSON.parse(xhr.response);
            resolve({
              statusCode: xhr.status,
              data: response,
              headers: parseHeaders(xhr),
            });
          } catch (e) {
            resolve({
              statusCode: xhr.status,
              data: xhr.response,
              headers: parseHeaders(xhr),
            });
          }
        } else {
          try {
            const response: any = JSON.parse(xhr.response);
            reject({
              statusCode: xhr.status,
              data: response,
              headers: parseHeaders(xhr),
            });
          } catch (e) {
            reject({
              statusCode: xhr.status,
              data: xhr.response,
              headers: parseHeaders(xhr),
            });
          }
        }
      }
    };

    xhr.open(method, url, true);
    if (headers) {
      for (const key of Object.keys(headers)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
    if (json) {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    }
    xhr.send(formData);
  });
}

function parseHeaders(xhr: XMLHttpRequest) {
  // Get the raw header string
  const headersStr = xhr.getAllResponseHeaders();

  // Convert the header string into an array
  // of individual headers
  const lines = headersStr.trim().split(/[\r\n]+/);

  // Create a map of header names to values
  const headers: { [x: string]: string } = {};
  for (const line of lines) {
    const parts = line.split(': ');
    const key = parts.shift().toLowerCase();
    const value = parts.join(': ');
    headers[key] = value;
  }
  return headers;
}
