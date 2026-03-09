const getBaseUrl = () =>
  import.meta.env.VITE_BACKEND_API_BASE_URL ?? 'http://localhost:8080';

export type ApiFetchInit = Omit<RequestInit, 'body'> & {
  body?: object | string;
};

/**
 * Fetch wrapper for SwinStudy backend. Uses credentials: 'include' so the
 * HttpOnly auth cookie is sent automatically with every request.
 */
export const apiFetch = async (
  path: string,
  init: ApiFetchInit = {}
): Promise<Response> => {
  const base = getBaseUrl().replace(/\/$/, '');
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...init.headers,
  };

  const { body, ...rest } = init;
  const fetchBody =
    body === undefined
      ? undefined
      : typeof body === 'string'
        ? body
        : JSON.stringify(body);

  return fetch(url, { ...rest, headers, body: fetchBody, credentials: 'include' });
};
