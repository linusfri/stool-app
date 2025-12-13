{
  ...
}:

{
  config = {
    env = {
      /**
        Request over http (no ssl), certificate not valid for LAN adresses.
      */
      EXPO_PUBLIC_LOCAL_API_PORT = 8080;
      EXPO_PUBLIC_LOCAL_HTTPS = false;
      EXPO_PUBLIC_APP_LOCALE = "sv-SE";
    };
  };
}
