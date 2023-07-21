import { Rings } from "react-loader-spinner";

const LoadingWheel = () => {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <Rings
        height="80"
        width="80"
        color="#7A5FC8"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default LoadingWheel;
