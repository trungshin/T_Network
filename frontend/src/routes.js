import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/login";
import Newsfeed from "./pages/newsFeed";
import Profile from "./pages/profile";
import Register from "./pages/register";

export const publicRoutes = [
	{ path: "/", page: Login, layout: AuthLayout },
	{ path: "/register", page: Register, layout: AuthLayout },
	{ path: "/newsfeed", page: Newsfeed },
	{ path: "/user/:id", page: Profile }
];
