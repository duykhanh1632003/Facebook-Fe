import BestSelling from "../BestSelling/BestSelling";
import CharHead from "./CharHead/CharHead";

const Dashboard = () => {
  return (
    <div className=" z-1">
      <CharHead />
      <BestSelling />
    </div>
  );
};

export default Dashboard;
