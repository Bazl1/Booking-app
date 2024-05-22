import { FaWifi } from "react-icons/fa";
import { TbToolsKitchen3 } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidDryer, BiSolidWasher } from "react-icons/bi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { LuRefrigerator } from "react-icons/lu";

export interface IAmenities {
    icon: React.ReactNode;
    name: string;
    value: boolean;
}

export const amenitiesState: IAmenities[] = [
    {
        icon: <FaWifi />,
        name: "Wifi",
        value: false,
    },
    {
        icon: <MdOutlinePets />,
        name: "PetsAllowed",
        value: false,
    },
    {
        icon: <PiTelevisionSimpleBold />,
        name: "TV",
        value: false,
    },
    {
        icon: <LuRefrigerator />,
        name: "Refrigerator",
        value: false,
    },
    {
        icon: <TbToolsKitchen3 />,
        name: "Kitchen",
        value: false,
    },
    {
        icon: <BiSolidWasher />,
        name: "Washer",
        value: false,
    },
    {
        icon: <FaThermometerThreeQuarters />,
        name: "Heating",
        value: false,
    },
    {
        icon: <BiSolidDryer />,
        name: "Dryer",
        value: false,
    },
];
