/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Fetch HTTP GET
 * @param path URI
 * @returns Response data
 * @throws Response
 */
export async function get (path: string): Promise<any> {
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
 * @param path URI
 * @param body Data to pass in body
 * @returns Response data
 * @throws Response
 */
export async function post (path: string, body: Record<string, unknown>): Promise<any> {
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
 * @param path URI
 * @returns Response data
 * @throws Response
 */
export async function remove (path: string): Promise<any> {
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
