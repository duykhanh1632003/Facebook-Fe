import './Message.css';

const Message = ({data,side})=>{
    return (
        <div className={`message ${side}`}>
            <div className="image">
                {side === "me" ? "" : (<img src="https://scontent.fhan14-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeGlPbtxHZ-Eyoy_gRWyFFClso2H55p0AlGyjYfnmnQCUWY1JXVqc9JApdXz6KOPLLeTjnCmTXJuQccTwTQepc4K&_nc_ohc=-dp4r5TMT70Q7kNvgH8z7SX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan14-4.fna&oh=00_AYBp1gKtZM-ib1NATOMZUvp-12Twwjn-i80JQCKjKucjrQ&oe=66B74738" alt="" />)}
                </div>
                <div className="contentMessage">
                    {data.contentMessage}
            </div>
        </div>
    )
}

export default Message ;