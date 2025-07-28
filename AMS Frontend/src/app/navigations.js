import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure you have the correct import

const useNavigation = () => {
  const [navigations, setNavigations] = useState([]);

  useEffect(() => {
    const decodeToken = (token) => {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.log('Invalid Token', error);
        return null;
      }
    };

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const decodedToken = token ? decodeToken(token) : null;
    // const userId = decodedToken?.user?.id || 'UnknownUser';
    const userRole = role || 'user';
    const userPageName = `${userRole} Dashboard`;

    let navItems = [
      // { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
      { label: "PAGES", type: "label" },
      {
        name: userPageName,
        icon: "person",
        path: `/dashboard`,
      },
    ];

    // Add role-specific navigation items
    switch (userRole) {
      case 'Admin':
        navItems = [
          ...navItems,
          { name: "Manage Users", path: "/allUsers", icon: "admin_panel_settings" },
          // { name: "Assets", path: "/admin/users", icon: "people" },
          {
            name:"Labs",path:"/labs",icon:"computer"
          },
          // Add more admin-specific items here
        ];
        break;

      case 'Lab Assistant':
        navItems = [
          ...navItems,

          { name: "Manage Assets", path: "/orders/Assets", icon: "bar_chart" },
          {
            name:"Labs",path:"/labs",icon:"computer"
          },
          {
            name:"Labs Assigned", path:"/labAssigned",icon:"task"
          }
          // { name: "Team Management", path: "/manager/team", icon: "group" },
          // Add more manager-specific items here
        ];
        break;

      case 'Coordinator':
        navItems = [
          ...navItems,
          // { name: "Asset Report", path: "/employee/tasks", icon: "assignment" },
          { name: "Track Asset Assignment", path: "/asset/assignment", icon: "person" },
          {
            name:"Labs",path:"/labs",icon:"computer"
          },
          // Add more employee-specific items here
        ];
        break;

      default:
        // Default or guest user navigation items
        navItems = [
          ...navItems,
          { name: "Help", path: "/help", icon: "help" },
        ];
        break;
    }

    setNavigations(navItems);

  }, []);

  return navigations;
};

export default useNavigation;
