export async function fetchCustomerAccessToken(
  email: string,
  password: string
): Promise<string> {
  const authUrl = import.meta.env.VITE_AUTH_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const scopes = import.meta.env.VITE_SCOPES;

  if (!authUrl || !clientId || !clientSecret || !projectKey || !scopes) {
    throw new Error('Missing required environment variables');
  }

  const fullUrl = `${authUrl}/oauth/${projectKey}/customers/token`;

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
      scope: scopes,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error_description || 'Authentication failed');
  }

  const data = await response.json();
  return data.access_token;
}
