import { UilBrowser, UilEllipsisH, UilLaptop, UilMicrophone, UilMissedCall, UilVideo } from '@iconscout/react-unicons';
import { useEffect, useRef, useState } from 'react';
import './VideoCall.css';


const VideoCall = ({socket,setCaller,setCallerSignal,setReceivingCall,videoUser,callAccepted}) => {
  const [stream1, setStream1] = useState(null);
  const [error, setError] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  console.log("socket: ",socket);

  useEffect(()=>{
    if(videoUser){
      userVideo.current.srcObject = videoUser ;
    }
  },[videoUser]);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        console.log("hhhh");
        const stream = await window.navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream1(stream);
        
        console.log("video");
        console.log(stream);
        myVideo.current.srcObject = stream;
        userVideo.current.srcObject = stream;
      } catch (error) {
        setError(error);
        console.error('Error accessing video:', error);
      }
    };

    socket.current?.on("callUser",(data)=>{
      setCaller(data.from);
      setCallerSignal(data.signal);
      setReceivingCall(true);
    })
    getUserMedia();

    // Cleanup to stop tracks when component unmounts
    return () => {
      if (stream1) {
        stream1.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  console.log(stream1);
  return (
    <div className="videoCall">
      <div className="headerVideoCall">
        <div className="infoCall">
        <div className="profile">
          <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=kWxeXr9no-YQ7kNvgFhxmvb&_nc_ht=scontent.fhan2-5.fna&oh=00_AYDvGo9Bx0p1pI21IkRBaIukPBYsRlXCLZDVgv76RHYbzA&oe=66E435FA" alt="" />
        </div>
        <div className="attendant">
          Khanh, QuangHuong
        </div>
      </div>
      <div className="option">
        <div className="game">
          <UilLaptop size={30}/>
        </div>
        <div className="toolCAll">
          <UilEllipsisH size={30}/>
        </div>
      </div>
      </div>
      {stream1 && (
        <div className="myVideo">
          <video playsInline muted autoPlay ref={myVideo} />
        </div>
      )}
      {videoUser && callAccepted && (
          <video playsInline muted autoPlay ref={userVideo} style={{position:'absolute',bottom:'10px',right:'10px',width:'250px',height:'150px',borderRadius:'20px',objectFit:'cover'}}/>
        
      )}

      <div className="toolCall">
        <div className="opt shareDestop">
            <UilBrowser/>
        </div>
        <div className="opt video">
            <UilVideo/>
        </div>
        <div className="opt microphone">
            <UilMicrophone/>
        </div>
        <div className="opt leaveCall">
          <UilMissedCall/>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
