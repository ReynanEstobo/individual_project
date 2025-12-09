// --- USERS STORAGE ---
export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// --- AUTH STORAGE ---
export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser")) || null;
};

export const saveLoggedInUser = (user) => {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
};
