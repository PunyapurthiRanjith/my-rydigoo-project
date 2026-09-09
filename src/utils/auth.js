const AUTH_KEY = "rydigoo_user";

export const setLoggedInUser = (user) => {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getLoggedInUser = () => {
  const data = sessionStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

export const isLoggedIn = () => Boolean(getLoggedInUser());

export const logout = () => {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem("rydigoo_rides");
  sessionStorage.removeItem("rydigoo_ride_draft");
  sessionStorage.removeItem("rydigoo_applied_offer");
};
