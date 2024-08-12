import React from "react";
import { useTranslation } from "react-i18next";

const Options = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[185px] h-[40px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#b1abab9f] transition duration-300">
        <div>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png?_nc_eui2=AeFBwRXRpdNeaiB14CY-v298VnUPE18ZZ-dWdQ8TXxln54lO8eVJ8IS2EVd449YKRYcSHBnSy0nHybzQAVns3WiJ"
            alt="icon"
          />
        </div>
        <div className="ml-2 text-[#757779] font-medium mr-2">
          {t("HomePage.MiddleSideBar.VideoStreaming")}
        </div>
      </div>

      <div className="w-[185px] h-[40px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#b1abab9f] transition duration-300">
        <div>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png?_nc_eui2=AeGWfZPpqbXYHP17Ocs9DLBFPL4YoeGsw5I8vhih4azDkhAkC4jdJ23lJMF0dIdq-M-BquWZr_E3FXEdZjDyG2DD"
            alt="icon"
          />
        </div>
        <div className="ml-2 text-[#757779] font-medium mr-2">
          {t("HomePage.MiddleSideBar.Photo/video")}
        </div>
      </div>

      <div className="w-[185px] h-[40px] rounded-md flex items-center justify-center cursor-pointer hover:bg-[#b1abab9f] transition duration-300">
        <div>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png?_nc_eui2=AeEjgTO3pVvKYltJQemm--9WvPIN-OmHLJy88g346YcsnPxLKrBq6laXd03pOG5SlK6Jl3WqSndNdEZEGB6N4BHe"
            alt="icon"
          />
        </div>
        <div className="ml-2 font-sm text-[#757779] font-medium mr-2">
          {t("HomePage.MiddleSideBar.Feeling/action")}
        </div>
      </div>
    </div>
  );
};

export default Options;
