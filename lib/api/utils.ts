function publicApiUrlExists() {
  if (process.env.EXPO_PUBLIC_API_URL === undefined) {
    return false;
  }
  return true;
}

function getBaseUrl(): string {
  if (publicApiUrlExists()) {
    return process.env.EXPO_PUBLIC_API_URL as string;
  }

  if (!isHostPortEnvDefined())
    throw new Error('Could not get port of development host.');

  return getHostAddressAndPort();
}

function getHostAddressAndPort() {
  const hostAddress = process.env.EXPO_PUBLIC_LOCAL_API_URL;
  const port = process.env.EXPO_PUBLIC_LOCAL_API_PORT;

  if (hostAddress === undefined || port === undefined) {
    throw new Error('Could not get address or port of development host.');
  }

  const apiUrl = `${hostAddress}:${port}`;
  const protocol = process.env.EXPO_PUBLIC_LOCAL_HTTPS ? 'https' : 'http';

  return `${protocol}://${apiUrl}`;
}

function isHostPortEnvDefined() {
  if (process.env.EXPO_PUBLIC_LOCAL_API_PORT === undefined) return false;
  return true;
}

export {
  getBaseUrl,
  publicApiUrlExists,
  isHostPortEnvDefined,
  getHostAddressAndPort,
};
