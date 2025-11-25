import { motion } from "framer-motion";

const MenuButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="
      w-full max-w-[260px] h-[62px]
      rounded-[40px] 
      bg-[#2463FF] 
      text-white text-[24px] md:text-[32px] font-normal tracking-[5%] leading-[120%]
      shadow-[inset_0px_-2px_0_3px_#140E66,inset_0px_1px_0px_6px_#3C74FF] 
      cursor-pointer
      whitespace-nowrap
    "
    >
      {children}
    </motion.button>
  );
};

export default MenuButton;
