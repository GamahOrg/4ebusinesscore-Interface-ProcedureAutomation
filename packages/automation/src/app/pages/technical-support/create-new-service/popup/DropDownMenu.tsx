import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";

interface Props {
    option: any;
    setOption?: any;
    options: any;
    setOptions?: any;
    placeholder?: string;
    className?: string;
    optionsHandler?: any;
    selectedOption?: "";
    selectionAvailable?: boolean;
    display?: boolean;
    required?: boolean;
}

const DropDownMenu: FC<Props> = ({
    optionsHandler,
    options,
    option,
    setOption,
    placeholder = "Choices",
    className = "",
    selectionAvailable = false,
    display,
    required
}) => {
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const handleIsCheck = (optionName: string) => {
        setOption(optionName);
        setSelectedOption(optionName);
        setIsOpen(false);
    };
    const removeHandler = (optionName: string) => {
        let tempOptions = options.filter(
            (option: any) => option.name !== optionName
        );
        optionsHandler(tempOptions);
    };

    useEffect(() => {
        if (display) {
            setSelectedOption(option);
        }
    }, []);

    return (
        <>
            <div className={`position-relative ${className}`}>
                <input hidden value={selectedOption} required={required} />
                <button
                    className={`btn btn-light w-100 d-flex justify-content-start flex-wrap btn-dropdwon ${display && "cursor-default"
                        }`}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOption
                        ? selectedOption
                        :  placeholder }
                </button>
                {isOpen && !display && (
                    <ul
                        className="list-unstyled border border-1px p-0 border-radius position-absolute w-100 bg-white"
                        style={{ zIndex: 9999 }}
                    >
                        {options?.map((option: any) => (
                            <li key={option?.id}>
                                <div
                                    className="w-100 btn btn-white d-flex justify-content-between form-check"
                                    onClick={() =>
                                        selectionAvailable && handleIsCheck(option?.name)
                                    }
                                >
                                    <label className="form-check-label" htmlFor="Checkme1">
                                        {option?.name}
                                    </label>
                                    <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                        {!selectionAvailable && (
                                            <i
                                                onClick={() => removeHandler(option?.name)}
                                                className="fa-solid fa-xmark"
                                            ></i>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default DropDownMenu;
