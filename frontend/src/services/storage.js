const StorageKeys = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
};

const StorageService = {
  getAccessToken: () => localStorage.getItem(StorageKeys.ACCESS_TOKEN),
  setAccessToken: (token) =>
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, token),
};

export default StorageService;
