import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Separate from "../../../components/Separate";
import MiddleLeftStory from "./MiddleLeftStory/MiddleLeftStory";

const LeftStory = ({ user }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };
  return (
    <div className=" w-[358px] fixed overflow-y-auto">
      <div className="w-full h-[54px] flex mt-[4px] items-center">
        <div
          onClick={handleGoBack}
          className="ml-[15px] text-[#999999] text-5xl mr-1 cursor-pointer"
        >
          <MdCancel />
        </div>
        <Link to={"/"} className="w-[41px] h-[41px] cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
            alt="Facebook Logo"
          />
        </Link>
      </div>
      <Separate />
      <div className="h-full w-full">
        <MiddleLeftStory user={user} />
      </div>
    </div>
  );
};

export default LeftStory;
