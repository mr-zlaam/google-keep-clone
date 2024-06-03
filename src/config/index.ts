const config = {
  //firebase configuration
  API_KEY: import.meta.env.VITE_API_KEY as string,
  AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN as string,
  PROJECT_ID: import.meta.env.VITE_PROJECT_ID as string,
  STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET as string,
  MESSAGE_SENDER_ID: import.meta.env.VITE_MESSAGE_SENDER_ID as string,
  APP_ID: import.meta.env.VITE_APP_ID as string,
  //other app configuration *********************
};
export const {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGE_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} = config;
