import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import UserLayout from './UserLayout';
import TodayPage from '../components/TodayPage/TodayPage';
import Inbox from '../components/Inbox/Inbox'
import Upcoming from '../components/Upcoming';
import MyProjects from '../components/MyProjects';
import Project from '../components/Project'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: "/:userId/today",
        element: <TodayPage />
      },
      {
        path: "/:userId/inbox",
        element: <Inbox />
      },
      {
        path: "/:userId/upcoming",
        element: <Upcoming />
      },
      {
        path: "/:userId/projects",
        element: <MyProjects />
      },
      {
        path: "/:userId/projects/:projectId",
        element: <Project />
      },
    ]
  }
]);