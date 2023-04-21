import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Login from "./pages/login";
import Newsfeed from "./pages/newsFeed";
import Profile from "./pages/profile";
import Register from "./pages/register";
import ActivationEmail from "./components/ActivationEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

export const publicRoutes = [
	{ path: "/", page: Login, layout: AuthLayout },
	{ path: "/register", page: Register, layout: AuthLayout },
	{ path: "/newsfeed", page: Newsfeed },
	{ path: "/user/:id", page: Profile, layout: ProfileLayout },
	{ path: "/user/activate/:activationToken", page: ActivationEmail },
	{ path: "/user/forgotPassword", page: ForgotPassword },
	{ path: "/user/reset/:token", page: ResetPassword }
];
