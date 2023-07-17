import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from '@/utils';

interface IProps {
  redirect: string;
  children: React.ReactNode;
}

const AuthRoute: React.FC<IProps> = (props) => {
  const login = isLogin();
  const { children, redirect } = props;

  return login ? <>{children}</> : <Navigate to={redirect} replace={true} />;
};

export default AuthRoute;