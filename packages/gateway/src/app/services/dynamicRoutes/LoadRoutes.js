export const LoadRoutes = async () => {
  let components = [];
  try {
    let { AppShared } = await import("@4eplatform/shared");
    components.push(AppShared);
  } catch (error) {
    console.error("Error loading shared:", error);
  }

  try {
    let { Connect } = await import(
      "@4eplatform/connect"
    );
    components.push(Connect);
  } catch (error) {
    console.error("Error loading connect:", error);
  }


  try {
    let { Automation } = await import(
      "@4eplatform/automation"
    );
    components.push(Automation);
  } catch (error) {
    console.error("Error loading automation:", error);
  }
  return components;
};
