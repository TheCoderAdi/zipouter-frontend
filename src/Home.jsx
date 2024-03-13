import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./components/Loader";
import Lottie from "react-lottie";
import * as animationData from "./assets/zip.json";

const server = "http://localhost:3000";

const Home = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [options, setOptions] = useState({
    singleUpload: false,
    multipleUpload: false,
  });
  const [loading, setLoading] = useState(false);
  const [numFiles, setNumFiles] = useState(0);

  const sendDataToServer = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("file", file);
      const response = await axios.post(`${server}/upload`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        credentials: "include",
      });
      setLoading(false);
      navigate("/results", {
        state: { result: response.data.results, single: true },
      });
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
      }
      setLoading(false);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!file && !files.length) {
      toast.error("Please upload a file");
      return;
    }
    if (options.singleUpload) {
      if (file.name.endsWith(".zip")) {
        sendDataToServer();
      } else {
        toast.error("Please upload a zip file");
        setFile(null);
      }
    } else {
      let filesArray = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i].name.endsWith(".zip")) {
          filesArray.push(files[i]);
        } else {
          toast.error("Please upload a zip file");
          setFiles([]);
          return;
        }
      }
      sendMultipleFiles(filesArray);
    }
  };

  const sendMultipleFiles = async (filesArray) => {
    try {
      setLoading(true);
      const form = new FormData();
      filesArray.forEach((file) => {
        form.append("files", file);
      });
      const { data } = await axios.post(`${server}/upload-multiple`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        credentials: "include",
      });
      setLoading(false);
      navigate("/results", {
        state: { result: data.results, multiple: true },
      });
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
      }
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="home-container">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData.default,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={200}
        width={200}
      />
      <h1>Welcome to ZipOuter</h1>
      {!options.singleUpload && !options.multipleUpload && (
        <div className="upload-options">
          <button
            onClick={() =>
              setOptions({ singleUpload: true, multipleUpload: false })
            }
          >
            Single Upload
          </button>
          <button
            onClick={() =>
              setOptions({ singleUpload: false, multipleUpload: true })
            }
          >
            Multiple Upload
          </button>
        </div>
      )}
      {options.singleUpload && (
        <div className="upload">
          <label className="custum-file-upload" htmlFor="file">
            <div className="icon">
              <img
                src="https://img.icons8.com/ios/50/000000/zip.png"
                alt="zip"
              />
            </div>
            <div className="file-text">
              <span>{file ? file.name : "Click to upload zip files"}</span>
            </div>
            <input
              type="file"
              name="file"
              id="file"
              className="file-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <button onClick={handleOnSubmit}>Submit</button>
        </div>
      )}
      {options.multipleUpload && (
        <div className="upload">
          <label className="custum-file-upload" htmlFor="files">
            <div className="icon">
              <img
                src="https://img.icons8.com/ios/50/000000/zip.png"
                alt="zip"
              />
            </div>
            <div className="file-text">
              <span>
                {numFiles === 0
                  ? "Click to upload zip files"
                  : numFiles === 1
                  ? `${numFiles} file selected`
                  : `${numFiles} files selected`}
              </span>
            </div>
            <input
              type="file"
              id="files"
              className="file-input"
              onChange={(e) => {
                setFiles(e.target.files);
                setNumFiles(e.target.files.length);
              }}
              multiple
            />
          </label>
          <button onClick={handleOnSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Home;
