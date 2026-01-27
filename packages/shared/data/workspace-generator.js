import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

function generateUniqueId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}
function renderIcon(iconInput, size = "") {
  if (iconInput.includes(".svg") || iconInput.startsWith("/")) {
    return <KTSVG path={iconInput} className={size} />;
  } else {
    return <i className={`${iconInput} ${size}`}></i>;
  }
}

export const createWorkspaceItem = ({
  name,
  dept,
  title,
  subTitle,
  icon,
  iconSizes = ["fs-2x", "fs-3x", "fs-2x"], // import icon sizes of [toolbox, card, table] items
  subIcon = "bi bi-tools",
  link,
  color,
  background,
  checked = true,
  count,
  lastUpdate,
  lastLogin,
}) => {
  const baseItem = {
    id: generateUniqueId(),
    name,
    title,
    color: `svg-icon-${color}`,
    link: link ?? "#",
    isShow: checked,
  };
  const toolboxItem = {
    ...baseItem,
    icon: renderIcon(icon, iconSizes[0]),
    transition: `text-hover-${color}`,
    isChecked: checked,
  };
  const card = {
    ...baseItem,
    dept,
    icon: renderIcon(icon, iconSizes[1]),
    subIcon: renderIcon(subIcon),
    subTitle: subTitle ?? "Description",
    count: count ?? ": 0",
    lastUpdate: lastUpdate ?? "20/04/2022",
    lastLogin: lastLogin ?? "25/03/2022",
    background: `bg-light-${background ?? color}`,
  };

  const tableRow = {
    ...baseItem,
    dept,
    icon: renderIcon(icon, iconSizes[2]),
    lastUpdate: lastUpdate ?? "20/04/2022",
    lastLogin: lastLogin ?? "25/03/2022",
    background: `bg-light-${color}`,
  };

  return { card, tableRow, toolboxItem };
};

export const createWorkspaceItems = (name, items) => {
  return items.map((item) =>
    createWorkspaceItem({
      name,
      ...item,
    })
  );
};
