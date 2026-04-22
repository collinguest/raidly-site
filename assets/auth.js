const AUTH = {
  getUser() {
    return JSON.parse(localStorage.getItem("raidly_user"));
  },

  isLoggedIn() {
    return !!localStorage.getItem("raidly_user");
  },

  login() {
    localStorage.setItem("raidly_user", JSON.stringify({
      name: "Demo User",
      avatar: ""
    }));
  },

  logout() {
    localStorage.removeItem("raidly_user");
  }
};