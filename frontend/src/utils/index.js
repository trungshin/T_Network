import ProfileLayout from "../layouts/ProfileLayout";
import Login from "../pages/login";
import Newsfeed from "../pages/newsFeed";
import Profile from "../pages/profile";
import Register from "../pages/register";
import ActivationEmail from "../components/ActivationEmail";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import DefaultLayout from "../layouts/DefaultLayout";

export const APIBase = "https://t-network-316f.onrender.com/api";

export const APIPaths = {
	Auth: `${APIBase}/auth`,
	Users: `${APIBase}/users`,
	Posts: `${APIBase}/posts`,
	Search: `${APIBase}/search`
};

export const AuthRoutes = [
	{ path: "/newsfeed", page: Newsfeed, layout: DefaultLayout },
	{ path: "/user/:id", page: Profile, layout: ProfileLayout }
];

export const PublicRoutes = [
	{ path: "/", page: Login },
	{ path: "/register", page: Register },
	{ path: "/user/activate/:activationToken", page: ActivationEmail },
	{ path: "/user/forgotPassword", page: ForgotPassword },
	{ path: "/user/reset/:token", page: ResetPassword }
];
