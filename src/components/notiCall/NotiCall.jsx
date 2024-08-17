import { UilMultiply, UilVideo } from '@iconscout/react-unicons';
import './NotiCall.css';

const NotiCall = ({answerCall})=>{


    return (
        <div className="notiCall">
            <div className="boxNotiCall">
            <div className="closeNotiCall">
                <UilMultiply size={20}/>
            </div>
                <div className="title">
                    Incomming call
                </div>
                <div className="infoCaller">
                    <div className="profilePic">
                        <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/454609757_511428008112393_4057451389962477605_n.jpg?stp=dst-jpg_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=EGhG_tad2cEQ7kNvgFMe0oL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan2-4.fna&oh=00_AYBBrd0YChCHQyf67iiiSS8hIh1-2qOlSrbXXZ5BAY-DOA&oe=66C21538" alt="" />
                    </div>
                    <div className="nameCaller">
                        Khanh is calling for you
                    </div>
                </div>
                <div className="toolCall">
                    <div className="optTool decline">
                        <div className="icon">
                            <UilMultiply/>
                        </div>
                        <div className="nameTool">
                            Decline
                        </div>
                    </div>
                    <div className="optTool accept">
                        <div className="icon">
                            <UilVideo/>
                        </div>
                        <div className="nameTool" onClick={answerCall}>
                            Accept
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotiCall;