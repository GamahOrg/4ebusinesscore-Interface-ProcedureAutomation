export const searchSelectStylesModeStyles = (darkMode) => ({
    control: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? 'transperant' : '#fff',
      borderColor: darkMode ? '#555' : provided.borderColor,
      boxShadow: darkMode ? 'none' : provided.boxShadow,
      color: darkMode ? '#fff' : '#000',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: darkMode ? '#aaa' : provided.color,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: darkMode ? '#fff' : provided.color,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? (darkMode ? 'transperant' : provided.backgroundColor)
        : darkMode ? 'transperant' : provided.backgroundColor,
      color: darkMode ? 'transperant' : provided.color,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? 'transperant' : '#fff',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? 'transperant' : provided.backgroundColor,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: darkMode ? '#fff' : provided.color,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: darkMode ? '#fff' : provided.color,
      ':hover': {
        backgroundColor: darkMode ? '#555' : provided.backgroundColor,
        color: darkMode ? '#fff' : provided.color,
      },
    }),
  });