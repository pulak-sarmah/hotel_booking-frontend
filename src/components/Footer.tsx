const Footer = () => {
  return (
    <div className="bg-primary py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-md mr-4 sm:text-2xl text-textPrimary font-bold tracking-tight">
          Holidays.com
        </span>
        <div className="flex flex-row gap-2 md:gap-4  items-center ">
          <span className="text-textPrimary font-bold tracking-tight">
            <p className="cursor-pointer text-xs sm:text-sm">
              Terms of Services
            </p>
          </span>
          <span className="text-textPrimary font-bold tracking-tight">
            <p className="cursor-pointer text-xs sm:text-sm">Privacy Policy</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
