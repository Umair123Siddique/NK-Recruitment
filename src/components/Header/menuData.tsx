import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Our Team",
    path: "/team",
    newTab: false,
  },
  {
    id: 4,
    title: "Services",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Recruitment Services",
        path: "/services/recruitment",
        newTab: false,
      },
      {
        id: 42,
        title: "Career Coaching",
        path: "/services/career-coaching",
        newTab: false,
      },
      {
        id: 43,
        title: "Resume Building",
        path: "/services/resume-building",
        newTab: false,
      },
      {
        id: 44,
        title: "Interview Preparation",
        path: "/services/interview-prep",
        newTab: false,
      },
      
    ],
  },
  {
    id: 5,
    title: "Jobs",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "IT & Technology",
        path: "/jobs/it",
        newTab: false,
      },
      {
        id: 42,
        title: "Finance & Banking",
        path: "/jobs/finance",
        newTab: false,
      },
      {
        id: 43,
        title: "Healthcare",
        path: "/jobs/healthcare",
        newTab: false,
      },
      {
        id: 44,
        title: "Engineering",
        path: "/jobs/engineering",
        newTab: false,
      },
      
    ],
  },
  {
    id: 6,
    title: "FAQ",
    path: "/faq",
    newTab: false,
  },
  {
    id: 7,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
