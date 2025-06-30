import Consultation from "../assets/image/consult.png";
import Health from "../assets/image/haelth.png";
import Appointment from "../assets/image/calendar.png";
import Profile from "../assets/image/user.png";
import MapImg from "../assets/image/map.png";
import Faq from "../assets/image/faq.png";
import { useRouter } from "expo-router";

const router = useRouter();

export const MENUS = [
  {
    id: 1,
    name: "Consultation",
    Icon: Consultation,
    fn: () => {
      console.log("Consultation");
    },
  },
  {
    id: 2,
    name: "Medical Records",
    Icon: Health,
    fn: () => {
      console.log("Medical Records");
    },
  },
  {
    id: 3,
    name: "Appointment",
    Icon: Appointment,
    fn: () => {
      router.replace("/schedule");
    },
  },
  {
    id: 4,
    name: "Map",
    Icon: MapImg,
    fn: () => {
      router.replace("/map");
    },
  },
  {
    id: 5,
    name: "FAQs",
    Icon: Faq,
    fn: () => {
      router.replace("/faqs");
    },
  },
  {
    id: 6,
    name: "Profile",
    Icon: Profile,
    fn: () => {
      router.replace("/profile");
    },
  },
];
