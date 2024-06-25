import { FaUserFriends } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { IoMdBookmark } from "react-icons/io";

export const sidebarLinks = [
  {
    icon: <FaUserFriends className="rounded-full bg-blue-300" />,
    route: "/",
    label: "Bạn bè",
  },
  {
    icon: <FaWarehouse className="rounded-full bg-pink-300" />,
    route: "/market",
    label: "Marketplace",
  },
  {
  icon: <RiGroupLine className="rounded-full bg-yellow-300" />,
    route: "/group",
    label: "Nhóm",
  },
  {
    icon: <PiClockCounterClockwiseBold className="rounded-full bg-blue-300" />,
    route: "/memory",
    label: "Kỷ niệm",
  },
  {
    icon: <IoMdBookmark className="rounded-full bg-pink-300" />,
    route: "/saved",
    label: "Đã lưu",
  },
];
