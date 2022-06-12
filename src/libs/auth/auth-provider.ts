const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const error = {
  notFound: "Could not found this user in the database",
};

export const login = async (identifiant: string, password: string) => {
  if (!identifiant || !password) {
    return;
  }
  const response = await fetch(`${BACKEND_ENDPOINT}/auth`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ identifiant, password }),
  });
  if (response.ok) {
    const result = await response.json();
    return result.session_token;
  }
  if (response.status === 404) {
    throw new Error(error.notFound);
  }
  throw new Error(await response.text());
};

export const logout = async (token: string) => {
  const response = await fetch(`${BACKEND_ENDPOINT}/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ session_token: token }),
  });
  if (response.ok) {
    return;
  }
  if (response.status === 404) {
    throw new Error(error.notFound);
  }
  throw new Error(await response.text());
};
