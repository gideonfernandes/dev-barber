import AsyncStorage from '@react-native-community/async-storage';
const baseAPI = 'https://api.b7web.com.br/devbarber/api';

export default {
  verifyToken: async (token) => {
    const request = await fetch(`${baseAPI}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const response = await request.json();
    return response;
  },

  signIn: async (email, password) => {
    const request = await fetch(`${baseAPI}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const response = await request.json();
    return response;
  },

  signUp: async (name, email, password) => {
    const request = await fetch(`${baseAPI}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });

    const response = await request.json();
    return response;
  },

  getBarbers: async () => {
    const token = await AsyncStorage.getItem('token');
    const request = await fetch(`${baseAPI}/barbers?token=${token}`);
    const response = await request.json();
    return response;
  },
};
