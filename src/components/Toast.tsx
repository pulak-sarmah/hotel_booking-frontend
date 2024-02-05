import { useEffect } from "react";

type TostProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Tost = ({ message, type, onClose }: TostProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "success"
      ? "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md max-w-md z-50 p-4 "
      : "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md max-w-md z-50 p-4 ";

  return (
    <div className={styles}>
      <div className="flex items-center justify-center rounded-none">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Tost;
