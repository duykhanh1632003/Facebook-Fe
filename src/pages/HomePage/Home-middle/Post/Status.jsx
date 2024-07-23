import Options from "./Options";
import Posts from "./Posts";

const Status = () => {
  return (
    <div className=" bg-white  rounded-lg">
      <div className="h-[123px] w-[587px]  dark:bg-[#202122] flex flex-col rounded-lg">
        <Posts />
        <div className="w-full pl-4 pr-4 mt-1 rounded-xl">
          <div className="border-b border-gray-200 dark:border-gray-700 w-full"></div>
        </div>
        <div className="h-[56px] w-full dark:bg-[#202122] ">
          <Options />
        </div>
      </div>
    </div>
  );
};

export default Status;
