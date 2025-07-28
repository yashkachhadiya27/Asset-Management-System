
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';

import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import { element } from 'prop-types';
import OrderForm from './views/OrderForm/order';
import OrderManagement from './views/Assests/AssestLayout';
import UpdateOrderForm from './views/OrderForm/updateOrder';
import { GeneralPage } from './views/general/generalPage';
import UserManagement from './views/Admin/UsersTable';
import { Products } from './views/Products/productsLayout';


import UpdateProductForm from "./views/Products/updateProduct";
import Sepcifications from "./views/Products/productSepec";
import IssueItemManagement from "./views/issueitems/issuetab";
import IssueForm from "./views/issueitems/issueitem";
import LabAssignmentForm from './views/AssetAssignment/AAssignement';
import LabAssistentLabs from './views/AssetAssignment/LabAssAssignement';
import GenerateQR from './views/QRCode/generateQR';
// SESSION PAGES
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
// Labs
const B301LabLayout1 = Loadable(lazy(() => import('app/views/labs/B301LabLayout1')));
const B309LabLayout1 = Loadable(lazy(() => import('app/views/labs/B309LabLayout1')));
const B305LabLayout1 = Loadable(lazy(() => import('app/views/labs/B305LabLayout1')));
const B203LabLayout1 = Loadable(lazy(() => import('app/views/labs/B203LabLayout2')));
const B302LabLayout3 = Loadable(lazy(() => import('app/views/labs/B302LabLayout3')));
const B201LabLayout = Loadable(lazy(() => import('app/views/labs/B201LabLayout4')));
const Labs = Loadable(lazy(() => import('app/views/labs/Labs')));

// Dynamic lab layout component
const DynamicLabLayout = Loadable(lazy(() => import('app/views/labs/DynamicLabLayout')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      { path: "/labs/B301", element: <B301LabLayout1 />, auth: authRoles.admin },
      { path: "/labs/B309", element: <B309LabLayout1 />, auth: authRoles.admin },
      { path: "/labs/B305", element: <B305LabLayout1 />, auth: authRoles.admin },
      { path: "/labs/B203", element: <B203LabLayout1 />, auth: authRoles.admin },
      { path: "/labs/B302", element: <B302LabLayout3 />, auth: authRoles.admin },
      { path: "/labs/B201", element: <B201LabLayout />, auth: authRoles.admin },
      { path: "/labs", element: <Labs />, auth: authRoles.admin },
      { path: "/labs/:labId", element: <DynamicLabLayout />, auth: authRoles.admin },

      {
        path: "/allUsers", element: <UserManagement />, auth: authRoles.admin
      },
      {
        path: "/dashboard", element: <GeneralPage />, auth: authRoles.admin
      },
      {
        path: "/orders/UpdateForm", element: <UpdateOrderForm />, auth: authRoles.admin
      },
      {
        path: "/orders/AddFrom", element: <OrderForm />, auth: authRoles.admin
      },
      {
        path: "/orders/Assets", element: <OrderManagement />, auth: authRoles.admin
      },
      {
        path : "products/add",element:<Products/>,auth:authRoles.admin
      },
      {
        path : "products/spec",element:<Sepcifications/>,auth:authRoles.admin
      },
      {
        path : "products/update",element:<UpdateProductForm/>,auth:authRoles.admin
      },
      {
        path : "/products/issue",element:<IssueForm/>,auth:authRoles.admin
      },
      {
        path : "products/updateissue",element:<IssueItemManagement/>,auth:authRoles.admin
      },
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor },
      {
        path: "/asset/assignment", element: <LabAssignmentForm/>, auth: authRoles.admin
      },
      {
        path:"/labAssigned",element:<LabAssistentLabs/>,auth:authRoles.admin
      },{
        path:"/generate-qr",element:<GenerateQR/>, auth:authRoles.admin
      }

    ],
  },
  // Session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
