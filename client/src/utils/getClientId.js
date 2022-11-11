import { clientId } from "../devEnv";

export const getClientId = () => {
  if (import.meta.env.MODE === "development") {
    return clientId;
  }
  return import.meta.env.VITE_CLIENT_ID;
};
