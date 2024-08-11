import { useAuthContext } from "../../context/AuthContext";
import "./HomeProfile.css";

import { useParams } from "react-router-dom";
import HeaderProfileMe from "./ProFileOfMe/HeaderProfileMe";
import HeaderProfileAnother from "./ProFileAnother/HeaderProfileAnother";
import LeftPostOfUser from "./PostOfUser/LeftPostOfUser/IntroduceOfUser/LeftPostOfUser";
import RightPostOfUser from "./PostOfUser/RightPostOfUser";
import { axiosHaveAuth } from "../../util/axios";
import { useEffect, useState } from "react";

const HomeProfile = () => {
  const { id, params } = useParams();
  const instance = axiosHaveAuth();
  const [friends, setFriends] = useState([]);
  const [numberOfFriends, setNumberOfFriends] = useState(0);

  const { authUser } = useAuthContext();
  useEffect(() => {
    const fetchNumberOfFriends = async () => {
      try {
        const response = await instance.get(`/api/number/friend/${id}`);
        console.log("Check data", response);
        setNumberOfFriends(response.data.metadata.numberOfFriends);
        setFriends(response.data.metadata.friends.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch number of friends", error);
      }
    };
    fetchNumberOfFriends();
  }, [authUser.user._id, params]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white">
        {id === authUser.user._id ? (
          <HeaderProfileMe
            id={id}
            friends={friends}
            numberOfFriends={numberOfFriends}
          />
        ) : (
          <HeaderProfileAnother
            id={id}
            friends={friends}
            numberOfFriends={numberOfFriends}
          />
        )}
      </div>
      <div className="flex overscroll-auto mt-[225px] bg-[#F0F2F5] w-full] ">
        <LeftPostOfUser
          userId={id}
          friends={friends}
          numberOfFriends={numberOfFriends}
        />
        <RightPostOfUser userId={id} />
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default HomeProfile;
