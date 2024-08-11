const decodeCredentials = (
  authHeader: string
): { email: string; password: string } => {
  const encodedCredentials = authHeader.split(' ')[1]; // Извлечение закодированной части
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString(
    'ascii'
  );
  const [email, password] = decodedCredentials.split(':'); // Разделение на email и пароль
  return { email, password };
};

export default decodeCredentials;
