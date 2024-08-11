import { useNavigate } from "react-router-dom";

const FriendOfUser = ({ friends, numberOfFriends }) => {
  const navigate = useNavigate();

  const handleOnClick = (userId) => {
    navigate(`/profile/${userId}`);
  };
  console.log("check friends", friends);
  return (
    <div className="w-full rounded-lg p-3 mt-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl">Bạn bè</div>
        <div className="text-md text-blue-500 w-[140px] h-[30px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#0a0a0a34]">
          Xem tất cả bạn bè
        </div>
      </div>
      <div className="mt-1">{numberOfFriends} người bạn</div>
      <div className="grid grid-cols-3 gap-2 mt-3 pb-3">
        {friends.map((friend, index) => (
          <div
            onClick={() => handleOnClick(friend._id)}
            key={index}
            className="mt-2 cursor-pointer"
          >
            <div className="w-[129px] h-[129px]">
              <img
                src={friend.avatar}
                className="w-full h-full object-cover rounded-lg"
                alt={`Ảnh của ${friend.firstName} ${friend.lastName}`}
              />
            </div>
            <div className="text-[14px] font-medium">
              {friend.firstName} {friend.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendOfUser;
