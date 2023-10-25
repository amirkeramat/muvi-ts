"use client";
import PropagateLoader from "react-spinners/PropagateLoader";
const Loading = ({ color }: { color?: string }) => {
  return (
    <PropagateLoader
      aria-label="Loading Spinner"
      data-testid="loader"
      color={color}
    />
  );
};

export default Loading;
