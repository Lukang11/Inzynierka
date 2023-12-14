import { jwtDecode } from "jwt-decode";

export const isUserAuthenticated = async () => {

  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  if (!accessToken) {
    return false;
  }

  try {
    const response = await fetch('http://localhost:7000/users/verify-token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { isUserAuthenticated } = await response.json();
    const decodedToken = jwtDecode(accessToken);

    if (!isUserAuthenticated) {
      const googleResponse = await fetch('http://localhost:7000/users/verify-google-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { isUserAuthenticated: isGoogleAuthenticated } = await googleResponse.json();

      if (isGoogleAuthenticated) {
        const adaptedUser = {
          email: decodedToken.email,
          fname: decodedToken.given_name,
          lname: decodedToken.family_name,
      };
        return { isAuthenticated: true, user: adaptedUser };
      }
    }
    else{
      return { isAuthenticated: isUserAuthenticated, user: decodedToken };
    }

  } catch (error) {
    console.error('Błąd weryfikacji tokenu:', error);
    throw error;
  }
};