export const ADMIN_USER = {
  username: "medicart",
  password: "admin",
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem("admin_auth") === "true";
};

export const loginAdmin = (username, password) => {
  if (
    username === ADMIN_USER.username &&
    password === ADMIN_USER.password
  ) {
    localStorage.setItem("admin_auth", "true");
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem("admin_auth");
};
