import { useEffect, useState } from "react";
import { axiosHaveAuth } from "../../util/axios";
import "./conversation.css";

const Conversation = ({conversation,userId}) => {
  console.log(conversation);
  console.log(userId);
  const [receiver,setReceiver] = useState();
  const instance  = axiosHaveAuth();
  const receiverId = conversation.members.find((id)=>{
    return id != userId;
  });

  console.log(receiverId);
  useEffect(()=>{
    const handleGetReceiver = async()=>{
      try{
        const response = await instance.get(`/api/user/get/${receiverId}`);
        const data = await response.data.metadata;
        console.log("hhh");
        console.log(data);
        if(data?.error){
          throw new Error(data?.error);
        }
        console.log("hhh");
        setReceiver(data[0]);
        console.log(data?.message);
      }catch(error){
        console.log(error);
      }
    }
    handleGetReceiver();
  },[conversation]);
  console.log(receiver);
  return (
    <div className="conversation">
      <div className="image">
        <img
          src={receiver?.avatar ? receiver?.avatar : "https://scontent.fhan14-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeGlPbtxHZ-Eyoy_gRWyFFClso2H55p0AlGyjYfnmnQCUWY1JXVqc9JApdXz6KOPLLeTjnCmTXJuQccTwTQepc4K&_nc_ohc=-dp4r5TMT70Q7kNvgH8z7SX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan14-4.fna&oh=00_AYBp1gKtZM-ib1NATOMZUvp-12Twwjn-i80JQCKjKucjrQ&oe=66B74738"}
          alt=""
        />
      </div>
      <div className="nameUser">{receiver?.firstName + " " + receiver?.lastName}</div>
      <div className="currentMessage">
        <div className="message">Alo Alo Alo</div>
        <div className="timeSend">10 minutes ago</div>
      </div>
      <div className="statusSeen">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Conversation;
