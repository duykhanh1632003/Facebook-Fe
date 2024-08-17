import { useAuthContext } from "../../context/AuthContext";
import "./HomeProfile.css";

import { useParams } from "react-router-dom";
import HeaderProfileMe from "./ProFileOfMe/HeaderProfileMe";
import HeaderProfileAnother from "./ProFileAnother/HeaderProfileAnother";

const HomeProfile = () => {
  const { id } = useParams();
  const { authUser } = useAuthContext();

  return (
    <div>
      {id === authUser.user._id ? (
        <HeaderProfileMe id={id} />
      ) : ( 
        <HeaderProfileAnother id={id} />
      )}
    </div>
  );
};

export default HomeProfile;
