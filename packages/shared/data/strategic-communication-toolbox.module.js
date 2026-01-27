import { createWorkspaceItems } from "./workspace-generator";

const name = "StrategicCommunicationSystem";
const items = [
  {
    dept: "Services",
    title: "MedalsSettings",
    icon: "fa-solid fa-gears",
    link: "/medals-settings",
    color: "warning",
  },
  {
    dept: "Services",
    title: "MedalsInfo",
    icon: "fa-solid fa-award",
    link: "/medals-info",
    color: "success",
  },
  {
    dept: "Services",
    title: "MedalsList",
    icon: "fa-solid fa-medal",
    link: "/medals-list",
    color: "primary",
  },
  {
    dept: "Services",
    title: "Gallery",
    icon: "bi bi-shop-window",
    link: "/gallery",
    color: "info",
  },
  {
    dept: "Services",
    title: "AddOns",
    icon: "bi bi-plus",
    link: "/add-ons-view",
    color: "success",
  },
  {
    dept: "Services",
    title: "CongratulationsList",
    icon: "fa-solid fa-rectangle-list",
    link: "/congratulation-list",
    color: "info",
  },
  {
    dept: "Services",
    title: "Congratulations",
    icon: "fa-solid fa-square-pen",
    link: "/congratulations",
    color: "warning",
  },
  {
    dept: "Services",
    title: "CongratulationSetting",
    icon: "fa-solid fa-rectangle-list",
    link: "/congratulation-setting",
    color: "success",
  },
];

const createdItems = createWorkspaceItems(name, items);
export const CardsListData = () => createdItems.map((item) => item.card);
export const ToolsBoxDrawerData = () =>
  createdItems.map((item) => item.toolboxItem);
export const TableListData = () => createdItems.map((item) => item.tableRow);
