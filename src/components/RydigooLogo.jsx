import logo from "../assets/rydigoo-logo.svg";

const RydigooLogo = ({ size = "md", showText = true, className = "" }) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
    xl: "h-20 w-20",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt="Rydigoo logo"
        className={`${sizes[size] || sizes.md} rounded-xl shadow-sm`}
      />
      {showText && (
        <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-xl font-bold tracking-tight text-transparent">
          Rydigoo
        </span>
      )}
    </div>
  );
};

export default RydigooLogo;
