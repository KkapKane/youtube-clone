import "../style/Settings.scss";
import React, { useState } from "react";

export default function Settings({ isSetting, updateApi, dbId, setIsSetting }) {
  const [title, setTitle] = useState("");

  const inputChange = (event) => {
    setTitle(event.target.value);
  };

  function handleClick(title) {
    updateApi(dbId, title);
    setIsSetting(false);
  }

  return (
    <div style={isSetting ? { display: "flex" } : {}} className='Settings'>
      <div className='Text'>Enter the new api key</div>
      <input onChange={inputChange} type='text' />
      <button onClick={() => handleClick(title)}>Submit</button>
    </div>
  );
}
