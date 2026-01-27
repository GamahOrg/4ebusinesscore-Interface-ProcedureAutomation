const DynamicComponentsWrapper = ({ components }) => {
  return (
    <>
      {components?.map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  );
};

export default DynamicComponentsWrapper;
