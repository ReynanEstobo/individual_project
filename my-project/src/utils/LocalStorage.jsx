// -----------------------
// Users
// -----------------------
export const getUsers = () => {
  try {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error parsing users from localStorage:", error);
    return [];
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage:", error);
  }
};

// -----------------------
// Logged-in User
// -----------------------
export const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem("loggedUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing loggedUser from localStorage:", error);
    return null;
  }
};

export const saveLoggedInUser = (user) => {
  try {
    localStorage.setItem("loggedUser", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving loggedUser to localStorage:", error);
  }
};

export const removeLoggedInUser = () => {
  localStorage.removeItem("loggedUser");
};

// -----------------------
// Jobs
// -----------------------
export const getJobs = () => {
  try {
    const jobs = localStorage.getItem("jobs");
    return jobs ? JSON.parse(jobs) : [];
  } catch (error) {
    console.error("Error parsing jobs from localStorage:", error);
    return [];
  }
};

export const saveJobs = (jobs) => {
  try {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  } catch (error) {
    console.error("Error saving jobs to localStorage:", error);
  }
};
