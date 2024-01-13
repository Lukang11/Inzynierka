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
        const googleUserDataResponse = await fetch(`http://localhost:7000/users/user-data-email/${decodedToken.email}`);
        const googleUserData = await googleUserDataResponse.json();

        return { isAuthenticated: true, user: googleUserData };
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