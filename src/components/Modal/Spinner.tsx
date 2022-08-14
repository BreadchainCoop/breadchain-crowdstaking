import React from "react";

type TProps = {
  size?: "lg";
  color?: string;
};
export const Spinner: React.FC<React.PropsWithChildren<TProps>> = (props) => {
  const squares = [
    { d: "M0 0h5.292v5.292H0z" },
    { d: "M5.292 0h5.292v5.292H5.292z" },
    { d: "M10.583 0h5.292v5.292h-5.292z" },
    { d: "M15.875 0h5.292v5.292h-5.292z" },
    { d: "M15.875 5.292h5.292v5.292h-5.292z" },
    { d: "M15.875 10.583h5.292v5.292h-5.292z" },
    { d: "M15.875 15.875h5.292v5.292h-5.292z" },
    { d: "M10.583 15.875h5.292v5.292h-5.292z" },
    { d: "M5.292 15.875h5.292v5.292H5.292z" },
    { d: "M0 15.875h5.292v5.292H0z" },
    { d: "M0 10.583h5.292v5.292H0z" },
    { d: "M0 5.292h5.292v5.292H0z" },
  ];
  const [hide, setHide] = React.useState([0, 1, 2, 3]);

  let interval: NodeJS.Timeout;

  React.useEffect(() => {
    interval = setInterval(() => {
      setHide((hide) =>
        hide.map((num) => (num + 1 === squares.length ? 0 : num + 1))
      );
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      className={
        props.size && props.size === "lg"
          ? `inline-block w-32 h-32`
          : `inline-block w-4 h-4`
      }
    >
      <svg
        className="w-full h-full"
        shapeRendering="crispEdges"
        viewBox="0 0 26 26"
        xmlns="http://www.w3.org/2000/svg"
      >
        {squares.map((square, i) => (
          <path
            key={`square_key_${i}`}
            fill={
              hide.includes(i) ? "none" : props.color ? props.color : "#151515"
            }
            d={square.d}
          />
        ))}
      </svg>
    </span>
  );
};

export default Spinner;
