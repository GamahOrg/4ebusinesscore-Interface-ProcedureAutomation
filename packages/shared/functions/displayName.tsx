export const DisplayNameFourProps = (
  firstName: string | undefined,
  secondName: string | undefined,
  thirdName: string | undefined,
  forthName: string | undefined
) => {
  const names = [firstName, secondName, thirdName, forthName].filter(
    (name) => name !== "undefined"
  );
  
  // Check if the last name contains a space
  const lastNameHasSpace = forthName?.includes(" ");
  
  const uniqueNames = names?.filter(
    (name, index) => {
      if (lastNameHasSpace && index === names.length - 1) {
        return true;
      }
      return names?.indexOf(name) === index;
    }
  );
  return uniqueNames?.join(" ");
};

export const DisplayNameOneProps = (name: any) => {
    const uniqueName = name?.split(" ")?.filter((n: any, index: any, arr: any) => n !== "undefined" && arr?.indexOf(n) === index);
    return uniqueName?.join(" ");
  };
