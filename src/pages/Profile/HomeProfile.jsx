import { useAuthContext } from "../../context/AuthContext";
import "./HomeProfile.css";

import { useParams } from "react-router-dom";
import HeaderProfileMe from "./ProFileOfMe/HeaderProfileMe";
import HeaderProfileAnother from "./ProFileAnother/HeaderProfileAnother";
import LeftPostOfUser from "./PostOfUser/LeftPostOfUser/IntroduceOfUser/LeftPostOfUser";
import RightPostOfUser from "./PostOfUser/RightPostOfUser";

const HomeProfile = () => {
  const { id } = useParams();
  const { authUser } = useAuthContext();

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white">
        {id === authUser.user._id ? (
          <HeaderProfileMe id={id} />
        ) : (
          <HeaderProfileAnother id={id} />
        )}
      </div>
      <div className="flex overscroll-auto mt-[225px] bg-[#F0F2F5] w-full] ">
        <LeftPostOfUser />
        <RightPostOfUser />
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default HomeProfile;
