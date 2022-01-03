import NwinterCreate from "components/NwinterCreate";
import AutoRead from "components/AutoRead";
import { UserObjType } from "components/App";

interface HomeProps {
  userObj: UserObjType;
}
const Home = ({ userObj }: HomeProps) => {
  return (
    <div className="container">
      <NwinterCreate userObj={userObj} />
      <AutoRead userObj={userObj} />
    </div>
  );
};

export default Home;
