const objToFormData = (data: any) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    if (value)
      //@ts-ignore
      formData.append(key, value);
  }
  return formData;
};
export default objToFormData;
