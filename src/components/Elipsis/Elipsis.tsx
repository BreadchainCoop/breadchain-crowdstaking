import React from "react";

const Elipsis: React.FC = () => {
  // const [hide, setHide] = React.useState([0]);
  // let interval: NodeJS.Timeout;
  // React.useEffect(() => {
  //   interval = setInterval(() => {
  //     setHide((hide) => hide.map((num) => (num + 1 === 3 ? 0 : num + 1)));
  //   }, 300);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });
  return (
    <span className="ml-2">
      <span className="elip-1">.</span>
      <span className="elip-2">.</span>
      <span className="elip-3">.</span>
    </span>
  );
};

export default Elipsis;
