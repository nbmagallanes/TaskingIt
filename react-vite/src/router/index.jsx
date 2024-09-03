import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
// import UserLayout from './UserLayout';
import TodayPage from '../components/TodayPage/TodayPage';
import Inbox from '../components/Inbox/Inbox'
import Upcoming from '../components/Upcoming';
import MyProjects from '../components/MyProjects';
import Project from '../components/Project'
import Navigation from "../components/Navigation/Navigation";
import NewUserLayout from './NewUserLayout';
import Landing from '../components/Landing';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <> <Navigation /> <Landing /> </>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/:userId",
        element: <NewUserLayout />,
        children: [
          {
            path: 'today',
            element: <TodayPage />,
          },
          {
            path: "inbox",
            element: <Inbox />,
          },
          {
            path: "upcoming",
            element: <Upcoming />
          },
          {
            path: "projects",
            element: <MyProjects />
          },
          {
            path: "projects/:projectId",
            element: <Project />
          }
        ]
      }
    ],
  },
]);