import React from "react";
import FileInput from "../../components/FileInput/FileInput";
import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const [showDoc, setShowDoc] = React.useState(false);
  const user = useSelector((state) => state.auth.token); 
  console.log(user);
  return (
    <div className="convert__section">
      <FileInput showDoc={showDoc} setShowDoc={setShowDoc} />
    </div>
  );
};

export default Home;
