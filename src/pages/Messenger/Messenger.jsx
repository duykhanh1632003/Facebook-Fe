import { UilAngleDown, UilEdit, UilEllipsisH, UilFileGraph, UilImageV, UilInfoCircle, UilMessage, UilPhone, UilPlusCircle, UilSearch, UilSmile, UilThumbsUp, UilUserCircle, UilVideo } from '@iconscout/react-unicons';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Peer } from 'peerjs';
import { useEffect, useRef, useState } from 'react';

import { io } from 'socket.io-client';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import NotiCall from '../../components/notiCall/NotiCall';
import VideoCall from '../../components/videoCall/VideoCall';
import { useAuthContext } from '../../context/AuthContext';
import { axiosHaveAuth } from '../../util/axios';
import Header from "../HomePage/Header";
import "./Messenger.css";


const Messenger = () => {
  globalThis.global = globalThis;
  const [listConversations,setListConversation] = useState([]);
  const [conversationId,setConversationId] = useState();
  const [listMessage,setListMessage] = useState([]);
  const [img,setImg] = useState("");
  const [file,setFile] = useState("");
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const [receiver,setReceiver] = useState({});
  const [contentMessage,setContentMessage] = useState("");
  const [hiddenIcon,setHiddenIcon] = useState(false);
  const {authUser} = useAuthContext();
  const [onCall,setOnCall] = useState(false);
  const [callAccepted,setCallAccepted] = useState(false);
  const [videoUser,setVideoUser] = useState();
  const [callerSignal,setCallerSignal] = useState();
  const [caller,setCaller] = useState();
  const [receivingCall,setReceivingCall] = useState(false);
  const connectionRef = useRef();
  const instance = axiosHaveAuth();
  console.log("Message authUser: ",authUser);
  const socket = useRef();

  useEffect(()=>{
    socket.current?.emit("addUser", authUser.user._id);
  },[authUser.user._id]);

  useEffect(()=>{
    socket.current?.on("callUser",(data)=>{
      setCaller(data.from);
      setCallerSignal(data.signal);
      setReceivingCall(true);
    })
    console.log("receivingCall: ",receivingCall);
  },[]);

  const callUser = ()=>{
    setOnCall(!onCall);
    const peer = new Peer({
      initiator:true,
      trickle:false,
      stream: stream
    });
    peer.on("signal",(data)=>{
      socket.emit("callUser",{
        signalData : data,
        from:authUser.user._id,
        userToCall:receiver._id,
      });
    });
    peer.on("stream",(stream)=>{
      setVideoUser(stream);
    });

    socket.on("callAccepted", (signal)=>{
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  }

  const answerCall = ()=>{
    setOnCall(true);
    setCallAccepted(true);
    const peer = new Peer(
      {
        initiator:false,
        trickle:false,
        stream : stream,
      }
    );
    peer.on("signal",(data)=>{
      socket.emit("answerCall",{signal:data,to:caller});
    });
    peer.on("stream",(stream)=>{
      setVideoUser(stream);
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  }



  useEffect(()=>{
    const handleGetListConversation = async()=>{
      try{
        
        const response = await instance.get(`/api/all/conversation/${authUser.user._id}`);
        const data = await response.data.metadata;
        console.log("data: ",data);
        console.log("hhhh");
        if(data?.error){
          throw new Error(data?.error);
        }
        setListConversation(data);
        console.log(data?.message);
      }catch(error){
        console.log(error);
      }
    }
    handleGetListConversation();

  },[authUser._id]);

  useEffect(()=>{
    const handleGetListMessage = async ()=>{
      try{
        const response = await instance.get(`/api/get/list/${conversationId}`);
        const data = await response.data.metadata;
        console.log("hhh");
        console.log("Data: ",data);
        setListMessage(data.listMessage);
        await console.log(response.data.message);
      }catch(error){
        console.log(error);
      }
    }
    handleGetListMessage();
  },[conversationId]);

  // console.log(listConversations);
  // console.log("List message: ",listMessage);
  useEffect(()=>{
    socket.current = io('http://localhost:5050');
    socket.current.on("getMessage",({newMessage})=>{
      setArrivalMessage(newMessage);
    })
  },[]);

  console.log("hhhh---",arrivalMessage);

  useEffect(()=>{
    console.log("ArrivalMessage: ", arrivalMessage);
    setListMessage(prev => [...prev,arrivalMessage]);
  },[arrivalMessage]);

  

  const handleSetConversationId = (id)=>{
    setConversationId(id);
  }

  const handleSendMessage = async()=>{
    
    try{
      const data = {
        conversationId,
        sender:authUser.user._id,
        contentMessage,
        img,
        file,
      };
      
      const res = await instance.post("/api/new/message", data);
      const resMessage = await res.data.message;
      const newMessage = await res.data.metadata;
      socket.current.emit("sendMessage", {newMessage,receiver});
      setListMessage(prev => [...prev,newMessage]);
      console.log("Message Response:");
      console.log(resMessage);
      console.log("new Mess : ",newMessage);
      setContentMessage("");
    }catch(error){
      console.log(error);
    };
  }

  const handleSetReceiver = async (receiverId)=>{
    try{
      const response = await instance.get(`/api/user/get/${receiverId}`);
      const data = await response.data.metadata;
      console.log("hhh");
      console.log("data:.. ",data);
      console.log("hhh");
      setReceiver(data[0]);
      console.log("receiver...",receiver);
      // console.log(data?.message);
    }catch(error){
      console.log(error);
    }
  }
  console.log("receiver: " , receiver);

  console.log("conversationId: ",conversationId);
  return (
    <>
    <Header />
    <div className="messenger">
      
      <div className="leftSideBar">
        <div className="menuChat">
          <div className="title">Đoạn Chat</div>
          <div className="setting">
            <div className="option"><UilEllipsisH size={20} /></div>
            <div className="createChat"><UilEdit size={20}/></div>
          </div>
        </div>
        <div className="searchBox">
          <div className="iconSearch"><UilSearch size={22} /></div>
          <input
            type="text"
            name="search"
            id="search"
            className="search"
            placeholder="Tìm kiếm trên messenger"
          />
        </div>

        <div className="statusBox">
          <div className="conversationList">Hộp thư</div>
          <div className="groupList">Cộng đồng</div>
        </div>

        <div className="listConversations">
          {listConversations.map((conversation,index)=>{
            return(
              <div className="boxConversation" onClick={()=>{handleSetConversationId(conversation._id);
                const receiverId = conversation.members.find((id)=>{
                  return authUser.user._id != id;
                });
                handleSetReceiver(receiverId);
              }}>
                <Conversation conversation={conversation} userId={authUser.user._id} key={index}/>
              </div>
            )
              
          })}
        </div>
      </div>
      {!conversationId ? (<div className='boxEmpty'>
        Start conversation with my friends
      </div>):(<div className="middleSideBar">
        <div className="toolBarChat">
            <div className="userInfo">
                <div className="image">
                <img src="https://scontent.fhan14-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeGlPbtxHZ-Eyoy_gRWyFFClso2H55p0AlGyjYfnmnQCUWY1JXVqc9JApdXz6KOPLLeTjnCmTXJuQccTwTQepc4K&_nc_ohc=-dp4r5TMT70Q7kNvgH8z7SX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan14-4.fna&oh=00_AYBp1gKtZM-ib1NATOMZUvp-12Twwjn-i80JQCKjKucjrQ&oe=66B74738" alt="" />
                </div>
                <div className="name">
                  Join Smith
                </div>
            </div>
            <div className="settingChat">
                <div className="call">
                  <UilPhone/>
                </div>
                <div className="videoCallIcon" onClick={callUser}>
                  <UilVideo/>
                </div>
                <div className="information">
                  <UilInfoCircle/>
                </div>
            </div>
        </div>
        <div className="boxChat">
            {listMessage?.map((message,index)=>{
              
              return(
                <div className="boxMessage">
                  <Message data={message} side={((message?.sender?._id === authUser.user._id) || (message?.sender === authUser.user._id))  ? "me" : "you"}/>
                </div>
              )
            })}
        </div>
        
        <div className="boxSendMessage">
            <div className="addVoice">
              <UilPlusCircle/>
            </div>
            {contentMessage === "" ?(<div className='boxAttached'>
              <div className="addImage">
              <UilImageV/>
            </div>
            <div className="addLabel">
              <UilFileGraph/>
            </div>
            <div className="addGif">
              <img src="" alt="" />
            </div>
            </div>
            ):""
            }
            <div className="boxInputMessage" style={contentMessage === "" ? {width:"70%"} : {width:"95%"}}>
                <input type="text" name="inputMess" id="inputMess" placeholder="Aa" onChange={(e)=>{setContentMessage(e.target.value)}} value={contentMessage}/>
                
                <UilSmile/>
                
            </div>
            
            <div className="like">
                {contentMessage === "" ? <UilThumbsUp/> : <UilMessage onClick={handleSendMessage}/>}
            </div>
        </div>
      </div>)
      }
      <div className="rightSideBar">
        <div className="boxNavigation">
          <div className="img">
          <img src="https://scontent.fhan14-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeGlPbtxHZ-Eyoy_gRWyFFClso2H55p0AlGyjYfnmnQCUWY1JXVqc9JApdXz6KOPLLeTjnCmTXJuQccTwTQepc4K&_nc_ohc=-dp4r5TMT70Q7kNvgH8z7SX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan14-4.fna&oh=00_AYBp1gKtZM-ib1NATOMZUvp-12Twwjn-i80JQCKjKucjrQ&oe=66B74738" alt="" />
          <span>.</span>
          </div>
          <div className="userName">
            John Smith
          </div>
          <div className="activeStatus">
            Active 10 minutes ago
          </div>
          <div className="navigationChat">
            <div className="dProfile">
              <div className="iconProfile">
                <UilUserCircle/>
              </div>
              <div className="title">
                Trang ca nhan
              </div>
            </div>
            <div className="switchNoti">
              <div className="iconNoti">
                <NotificationsIcon/>
              </div>
              <div className="title">
                Tat thong bao
              </div>
            </div>
          </div>
          <div className="optionInformationChat">
              <div className="item">
                <div className="titleOption">
                  Thong tin ve doan chat
                </div>
                <div className="dropIcon">
                  <UilAngleDown/>
                </div>
              </div>
          </div>
          <div className="optionInformationChat">
              <div className="item">
                <div className="titleOption">
                  Thong tin ve doan chat
                </div>
                <div className="dropIcon">
                  <UilAngleDown/>
                </div>
              </div>
          </div>
          <div className="optionInformationChat">
              <div className="item">
                <div className="titleOption">
                  Thong tin ve doan chat
                </div>
                <div className="dropIcon">
                  <UilAngleDown/>
                </div>
              </div>
          </div>
          <div className="optionInformationChat">
              <div className="item">
                <div className="titleOption">
                  Thong tin ve doan chat
                </div>
                <div className="dropIcon">
                  <UilAngleDown/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    {onCall && <VideoCall socket={socket} setCaller={setCaller} setCallerSignal={setCallerSignal} setReceivingCall={setReceivingCall} videoUser={videoUser} callAccepted={callAccepted}/>}
    {receivingCall && <NotiCall answerCall={answerCall}/>}
    </>
  );
};

export default Messenger;
