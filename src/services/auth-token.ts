export async function fetchCustomerAccessToken(
  email: string,
  password: string
): Promise<string> {
  const authUrl = `${import.meta.env.VITE_AUTH_URL}/oauth/token`;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const scopes = import.meta.env.VITE_SCOPES;

  if (!authUrl || !clientId || !clientSecret || !scopes) {
    throw new Error('Missing required environment variables');
  }

  const response = await fetch(authUrl, {
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
  console.log('OAuth response:', data);
  return data.access_token;
}
