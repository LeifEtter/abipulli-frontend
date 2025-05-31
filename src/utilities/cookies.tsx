export const retrieveStoredCredentials = (): string | null => {
  const storage: Storage = window.localStorage;
  const email: string | null = storage.getItem("email");
  return email;
};

export const storeEmail = (email: string): void => {
  const storage: Storage = window.localStorage;
  storage.setItem("email", email);
};
