import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "../config/FireBaseUrl";

function FirebaseImageUpload() {
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImgUrl((prevUrls) => [...prevUrls, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files")).then((result) => {
      result.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImgUrl((prevUrls) => [...prevUrls, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input className="upload" type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={handleClick}>Upload</button>
      <br />
      {imgUrl.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Image ${index}`} height="200px" width="200px" />
          <br />
        </div>
      ))}
    </div>
  );
}

export default FirebaseImageUpload;
