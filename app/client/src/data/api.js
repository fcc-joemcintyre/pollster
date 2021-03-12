// @ts-check

/**
 * Fetch HTTP GET
 * @param {string} path URI
 * @returns {Promise<any>} Reponse data
 * @throws Response
 */
export async function get (path) {
  const res = await fetch (`${window.location.origin}${path}`, {
    method: 'get',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (res.ok) {
    const data = await res.json ();
    return data;
  }
  throw res;
}

/**
 * Fetch HTTP POST
 * @param {string} path URI
 * @param {Object} body Data to pass in body
 * @returns {Promise<any>} Reponse data
 * @throws Response
 */
export async function post (path, body) {
  const res = await fetch (`${window.location.origin}${path}`, {
    method: 'post',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify (body),
  });
  if (res.ok) {
    const data = await res.json ();
    return data;
  }
  throw res;
}

/**
 * Fetch HTTP DELETE
 * @param {string} path URI
 * @returns {Promise<any>} Reponse data
 * @throws Response
 */
export async function remove (path) {
  const res = await fetch (`${window.location.origin}${path}`, {
    method: 'delete',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
  });
  if (res.ok) {
    const data = await res.json ();
    return data;
  }
  throw res;
}
