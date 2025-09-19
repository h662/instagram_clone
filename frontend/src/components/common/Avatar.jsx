import { useState } from "react";
import { FiUser } from "react-icons/fi";

const SIZES = {
  "extra-small": { class: "w-7 h-7", icon: 14 },
  small: { class: "w-8 h-8", icon: 16 },
  medium: { class: "w-10 h-10", icon: 20 },
  large: { class: "w-20 h-20", icon: 40 },
  xlarge: { class: "w-24 h-24", icon: 48 },
};

const Avatar = ({
  user,
  size = "medium",
  className = "",
  showBorder = false,
  borderColor = "black",
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeConfig = SIZES[size];

  const borderClass = showBorder ? `ring-2 ring-${borderColor}` : "";
  const showImage = user?.profileImageUrl && !imageError;

  return (
    <div
      className={`${sizeConfig.class} rounded-full overflow-hidden bg-gray-300 flex-shrink-0 ${borderClass} ${className} relative`}
    >
      {showImage && (
        <img
          src={user.profileImageUrl}
          alt={user.username || user.fullName || "User"}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}

      {!showImage && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
          <FiUser size={sizeConfig.icon} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
