import { FC } from "react";
import { useIntl } from "react-intl";
type hideProps = {
  OutIndex: any;
  clickedIndex: any;
  questionsList: any;
  checkBoxList: any;
  setCheckBoxList: any;
};
const CheckBox: FC<hideProps> = ({
  OutIndex,
  clickedIndex,
  questionsList,
  checkBoxList,
  setCheckBoxList,
}) => {
  const intl = useIntl();

  return (
    <>
      {checkBoxList[OutIndex]?.map((item: any, index: any) => {
        return (
          <div className={`d-flex gap-4 align-items-center pb-4`} key={index}>
            <input
              type="checkbox"
              className="form-check-input option-border-color"
              name="type"
              value="has"
            />
            <div className="w-100 position-relative">
              <input
                key={`question-${index}`}
                className={`new-questionnaire1 ${
                  OutIndex !== clickedIndex ? "border border-0" : ""
                }`}
                placeholder={
                  intl.formatMessage({
                    id: "OptionNo",
                  }) + ++index
                }
                value={checkBoxList[OutIndex][index - 1] || ""}
                onChange={(e) => {
                  setCheckBoxList(() => {
                    return JSON.parse(
                      localStorage.getItem("checkBoxList") as string,
                    ).map((li: any, i: any) =>
                      i === OutIndex
                        ? li.map((item: any, j: any) =>
                            j === index - 1 ? e.target.value : item,
                          )
                        : li,
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
                  // setCheckBoxList(() => {
                  //   return checkBoxList.filter((li) => {
                  //     return li !== checkBoxList[index];
                  //   });
                  // });
                  setCheckBoxList(() => {
                    return JSON.parse(
                      localStorage.getItem("checkBoxList") as string,
                    ).map((li: any, i: any) => {
                      // Check if the current array is the one you want to filter
                      if (i === OutIndex) {
                        // Use filter to create a new array excluding the element at the specified index
                        return li.filter(
                          (item: any, j: any) => j !== index - 1,
                        );
                      } else {
                        return li; // Return the unchanged array for other indices
                      }
                    });
                  });
                }}
              ></i>
            )}
          </div>
        );
      })}
      {OutIndex === clickedIndex && (
        <div className="d-flex gap-4 align-items-center">
          <input
            type="checkbox"
            className="form-check-input option-border-color"
            name="type"
            value="has"
            disabled
          />

          <div className="w-100 position-relative">
            <div
              className="new-questionnaire3 cursor-pointer text-muted"
              // name={OutIndex}
              onClick={() => {
                // setCheckBoxList([...checkBoxList, addOption]);
                setCheckBoxList(() => {
                  const updatedList = JSON.parse(
                    localStorage.getItem("checkBoxList") as string,
                  ).map((li: any, i: any) => {
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

export { CheckBox };
