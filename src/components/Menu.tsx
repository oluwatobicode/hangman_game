const Menu = () => {
  return (
    <div className="h-[481px] w-[324px] md:w-[592px] md:h-[500px] rounded-[72px] relative border bg-linear-30 shadow-2xs">
      <div className="absolute transform -translate-y-10 translate-x-10 -left-10 md:left-20">
        <img
          className="w-[355.98px] h-[163.91px]"
          src="/images/logo.svg"
          alt="Logo for the game"
        />
      </div>
    </div>
  );
};

export default Menu;
