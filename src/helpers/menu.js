/**
 * Menu configuration for SmartLV
 * icon: PrimeIcons class name
 * url: route name (matched with router)
 * submenu: nested children
 */
const menu = [
  {
    id: 1,
    name: "Main Menu",
    icon: null,
    url: null,
    submenu: [
      {
        id: 11,
        name: "Dashboard",
        icon: "pi-home",
        url: "dashboard",
      },
    ],
  },
];

export default menu;
