import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { UserObjType } from "components/App";

interface NavigationProps {
  userObj: UserObjType;
}
const Navigation = ({ userObj }: NavigationProps) => {
  return (
    <nav>
      <Ul>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          <Slink to="/profile">
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : "Profile"}
            </span>
          </Slink>
        </li>
      </Ul>
    </nav>
  );
};

export default Navigation;

const Ul = styled.ul`
  display: flex;
  justify-content: flex;
  margin-top: 50px;
`;

const Slink = styled(Link)`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
