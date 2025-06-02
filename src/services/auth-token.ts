function toBase64(str: string): string {
  return globalThis.window === undefined
    ? Buffer.from(str).toString('base64')
    : btoa(str);
}

export async function fetchCustomerAccessToken(
  email: string,
  password: string
): Promise<string> {
  const authUrl = `${import.meta.env.VITE_AUTH_URL}/oauth/token`;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const scopes = import.meta.env.VITE_SCOPES;

  console.log('env:', { authUrl, clientId, clientSecret, scopes });

  if (!authUrl || !clientId || !clientSecret || !scopes) {
    throw new Error('Missing Commercetools environment configuration');
  }

  const credentials = toBase64(`${clientId}:${clientSecret}`);

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
      scope: scopes,
    }),
  });
  console.log('DEBUG — email:', email);
  console.log('DEBUG — password:', password);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error_description || 'Authentication failed');
  }

  const data = await response.json();
  console.log('access_token:', data.access_token);
  return data.access_token;
}
