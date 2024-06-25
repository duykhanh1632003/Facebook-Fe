import Options from "./Options";
import Posts from "./Posts";
const Status = () => {
  return (
    <div className="h-[123px] w-[587px] bg-white mt-[24px] flex flex-col rounded-lg">
      <Posts />
      <div className="w-full pl-4 pr-4 mt-1 rounded-xl">
        <div className="border-b border-gray-200 w-full"></div>
      </div>
      <div className="h-[56px] w-full">
        <Options />
      </div>
    </div>
  );
};

export default Status;
