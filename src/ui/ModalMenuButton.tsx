import { motion } from "framer-motion";

interface MenuButtonProps {
  onClick: () => void;
  text: string;
  variant: "blue" | "pink";
}

const ModalMenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  text,
  variant,
}) => {
  const isBlue = variant === "blue";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden cursor-pointer
        flex items-center justify-center
        w-full max-w-[226px] h-[56px] md:h-[62px] lg:max-w-[275px]
        rounded-[40px]
        text-[20px] md:text-[28px] lg:text-[32px] 
        text-white tracking-[5%] leading-[120%]
        ${
          isBlue
            ? "bg-[#2463FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF]"
            : "bg-gradient-to-r from-[#FE71FE] to-[#7199FF] shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#C642FB]"
        }
      `}
    >
      {text}
    </motion.button>
  );
};

export default ModalMenuButton;
