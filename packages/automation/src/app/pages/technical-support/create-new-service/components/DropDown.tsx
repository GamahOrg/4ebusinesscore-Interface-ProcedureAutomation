import { FC } from "react";
import { useIntl } from "react-intl";
type hideProps = {
  OutIndex: any;
  clickedIndex: any;
  questionsList: any;
  dropDownList: any;
  setDropDownList: any;
};
const DropDown: FC<hideProps> = ({
  OutIndex,
  clickedIndex,
  questionsList,
  dropDownList,
  setDropDownList,
}) => {
  const intl = useIntl();

  return (
    <>
      {dropDownList[OutIndex]?.map((item: any, index: any) => {
        return (
          <div className={`d-flex gap-4 align-items-center pb-4`} key={index}>
            {index + 1}.
            <div className="w-100 position-relative">
              <input
                className={`new-questionnaire1 ${
                  OutIndex !== clickedIndex ? "border border-0" : ""
                }`}
                placeholder={
                  intl.formatMessage({
                    id: "OptionNo",
                  }) + ++index
                }
                value={dropDownList[OutIndex][index - 1] || ""}
                onChange={(e) => {
                  setDropDownList(() => {
                    return JSON.parse(localStorage.getItem("dropDownList")).map(
                      (li, i) =>
                        i === OutIndex
                          ? li.map((item, j) =>
                              j === index - 1 ? e.target.value : item
                            )
                          : li
                    );
                  });
                }}
              />
              <div className="border-highlight"></div>
            </div>
            {OutIndex === clickedIndex && (
              <i
                className="fas fa-times icon-gray fs-2 cursor-pointer"
                onClick={() => {
                  setDropDownList(() => {
                    return JSON.parse(localStorage.getItem("dropDownList")).map(
                      (li, i) => {
                        // Check if the current array is the one you want to filter
                        if (i === OutIndex) {
                          // Use filter to create a new array excluding the element at the specified index
                          return li.filter((item, j) => j !== index - 1);
                        } else {
                          return li; // Return the unchanged array for other indices
                        }
                      }
                    );
                  });
                  // setDropDownList(() => {
                  //   return dropDownList.filter((li) => {
                  //     return li !== dropDownList[index];
                  //   });
                  // });
                }}
              ></i>
            )}
          </div>
        );
      })}

      {OutIndex === clickedIndex && (
        <div className="d-flex gap-4 align-items-center">
          {dropDownList[OutIndex]?.length + 1}.
          <div className="w-100 position-relative">
            <div
              className="new-questionnaire3 cursor-pointer text-muted"
             
              // name={OutIndex}
              onClick={() => {
                // setDropDownList([...dropDownList, addOption]);
                setDropDownList(() => {
                
                  const updatedList = JSON.parse(
                    localStorage.getItem("dropDownList") as string
                  ).map((li, i) => {
                    return i === OutIndex
                      ? [
                          ...li,
                          `${
                            intl.formatMessage({
                              id: "OptionNo",
                            }) + ++li.length
                          }`,
                        ]
                      : li;
                  });
                  return updatedList;
                });
              }}
            >
              {intl.formatMessage({
                id: "AddOption",
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { DropDown };
