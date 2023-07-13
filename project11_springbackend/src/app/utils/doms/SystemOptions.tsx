const adminOptions = [
  { name: "About", icon: "bi bi-grid", route: "/home/about", sons: [], },
  { name: "Profiles", icon: "bi bi-clipboard-data", route: "", sons: [
      { name: "List", icon: "bi bi-circle", route: "/home/list", },
      { name: "New", icon: "bi bi-circle", route: "/home/create", },
      { name: "Admin", icon: "bi bi-circle", route: "/home/admin", },
      { name: "Delete", icon: "bi bi-circle", route: "/home/delete", },
      { name: "Update", icon: "bi bi-circle", route: "/home/update", },
    ]
  },
  { name: "Users", icon: "bi bi-person-lines-fill", route: "", sons: [
    { name: "List", icon: "bi bi-circle", route: "/home/listusers", },
    { name: "New", icon: "bi bi-circle", route: "/home/createusers", },
    { name: "Admin", icon: "bi bi-circle", route: "/home/adminusers", },
    { name: "Delete", icon: "bi bi-circle", route: "/home/deleteusers", },
    { name: "Update", icon: "bi bi-circle", route: "/home/updateusers", },
    ]
  },
  { name: "Tomato", icon: "bi bi-person-lines-fill", route: "", sons: [
    { name: "Fried", icon: "bi bi-circle", route: "/home/listusers", },
    { name: "Hate", icon: "bi bi-circle", route: "/home/adduser" },
    ]
  },
  { name: "Cites", icon: "bi bi-calendar", route: "", sons: [
    { name: "List", icon: "bi bi-circle", route: "/home/listma", },
    { name: "New", icon: "bi bi-circle", route: "/home/addma" },
    { name: "Admin", icon: "bi bi-circle", route: "/home/admma", },
    ]
  }
];

const guestOptions = [
  { name: "About", icon: "bi bi-grid", route: "/home/about", sons: [], },
  { name: "Bought", icon: "bi bi-clipboard-data", route: "", sons: [
      { name: "Pending", icon: "bi bi-circle", route: "/home/admuser", },
      { name: "Products", icon: "bi bi-circle", route: "/home/admuser" },
      { name: "Old", icon: "bi bi-circle", route: "/home/admuser", }
    ]
  }
];

export { adminOptions, guestOptions };