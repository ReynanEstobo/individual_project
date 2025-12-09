// Users array
export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Logged-in user
export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedUser")) || null;
};

export const saveLoggedInUser = (user) => {
  localStorage.setItem("loggedUser", JSON.stringify(user));
};

export const removeLoggedInUser = () => {
  localStorage.removeItem("loggedUser");
};
