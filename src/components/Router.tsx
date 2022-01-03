import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import styled from "styled-components";
import { UserObjType } from "components/App";

const Container = styled.div`
  max-width: 890px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

interface AppRouterProps {
  refreshUser: () => void;
  isLoggedIn: Boolean;
  userObj: UserObjType;
}

function AppRouter({ refreshUser, isLoggedIn, userObj }: AppRouterProps) {
  return (
    <Router>
      {isLoggedIn && (
        <Container>
          <Navigation userObj={userObj} />
        </Container>
      )}
      <Container>
        <Routes>
          {isLoggedIn ? (
            // <Header refreshUser={refreshUser} userObj={userObj} />
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default AppRouter;
