import React from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  redirect: string;
  children: React.ReactNode;
}

const AuthRoute: React.FC<IProps> = (props) => {
  const login = true;
  const { children, redirect } = props;
  return login ? <>{children}</> : <Navigate to={redirect} />;
};

export default AuthRoute;