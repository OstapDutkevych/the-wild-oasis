import { useUser } from '@features/authentication/useUser.js';
import Spinner from '@ui/Spinner.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isPending, isAuth } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuth && !isPending) navigate('/login');
  }, [isAuth, isPending, navigate]);

  // 3.Show spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is user, render the app
  if (isAuth) return children;
}

export default ProtectedRoute;
