import {LoginPage} from "@/pages/LoginPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {RegisterPage} from "@/pages/RegisterPage";
import {ResetPasswordPage} from "@/pages/ResetPasswordPage/ui/ResetPasswordPage";
import {SetNewPasswordPage} from "@/pages/SetNewPasswordPage";
import {RouteProps} from "react-router-dom";

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};
export const routeConfig: Record<string, AppRoutesProps> = {
  login: {
    path: "/login",
    element: <LoginPage />,
  },
  register: {
    path: "/register",
    element: <RegisterPage />,
  },
  resetPassword: {
    path: "/reset_password",
    element: <ResetPasswordPage />,
  },
  setNewPassword: {
    path: "/set_new_password",
    element: <SetNewPasswordPage />,
  },

  notFound: {
    path: "/*",
    element: <NotFoundPage />,
  },
};
