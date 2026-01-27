import { FC, useState } from "react";
import { useIntl } from "react-intl";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  selectedElectronicServicesIds: any;
  setSelectedElectronicServicesIds: any;
  options: any;
  placeholder?: string;
}

const CheckBoxDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  selectedElectronicServicesIds,
  setSelectedElectronicServicesIds,
  options,
  placeholder = "Choose",
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsCheck = (option: { id: number; name: string }) => {
    const optionName = option.name;
    const optionId = option.id;

    if (selectedOptions.includes(optionName)) {
      const updatedOptions = selectedOptions.filter(
        (value: string) => value !== optionName
      );
      const updatedRoleIds = selectedElectronicServicesIds.filter(
        (id: number) => id !== optionId
      );

      setSelectedOptions([...updatedOptions]);
      setSelectedElectronicServicesIds([...updatedRoleIds]);
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
      setSelectedElectronicServicesIds([
        ...selectedElectronicServicesIds,
        optionId,
      ]);
    }
  };

  return (
    <>
      <div className="position-relative">
        <button
          className="btn btn-light w-100 d-flex justify-content-start flex-wrap btn-dropdwon"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions.length > 0
            ? selectedOptions.join(" - ")
            : intl.formatMessage({ id: placeholder })}
        </button>
        {isOpen && (
          <ul
            className="list-unstyled border card custom-scrollbar border-1px p-0 border-radius position-absolute w-100 bg-light"
            style={{ zIndex: 9999, maxHeight: "300px" }}
          >
            {options.map((option: { id: number; name: string }) => (
              <li key={option.id}>
                <div
                  className="w-100 btn btn-light d-flex justify-content-between form-check"
                  onClick={() => handleIsCheck(option)}
                >
                  <label
                    className="form-check-label"
                    htmlFor={`Checkme${option.id}`}
                  >
                    {option.name}
                  </label>
                  <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      checked={selectedOptions.includes(option.name)}
                      onChange={() => handleIsCheck(option)}
                      type="checkbox"
                      value={option.name}
                      id={`Checkme${option.id}`}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen ? (
        <div
          className={"position-absolute w-100 h-100 top-0 left-0 "}
          style={{ zIndex: 10 }}
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default CheckBoxDropDown;
