import { FC } from "react";
import { useIntl } from "react-intl";
type hideProps = {
  OutIndex: any;
  clickedIndex: any;
  questionsList: any;
  multiChoiceList: any;
  setMultiChoiceList: any;
};
const MultiChoice: FC<hideProps> = ({
  OutIndex,
  clickedIndex,
  questionsList,
  multiChoiceList,
  setMultiChoiceList,
}) => {
  const intl = useIntl();

  return (
    <>
      {multiChoiceList[OutIndex]?.map((item: any, index: any) => {
        return (
          <div className={`d-flex gap-4 align-items-center pb-4`} key={index}>
            <input
              type="radio"
              className="form-check-input option-border-color"
              name={`radio-${OutIndex}`}
              // value="has"
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
                  // Array(multiChoiceStates[OutIndex])[index]
                }
                value={multiChoiceList[OutIndex][index - 1] || ""}
                onChange={(e) => {
                  setMultiChoiceList(() => {
                    return JSON.parse(
                      localStorage.getItem("multiChoiceList") as string,
                    ).map((li, i) =>
                      i === OutIndex
                        ? li.map((item, j) =>
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
                  setMultiChoiceList(() => {
                    return JSON.parse(
                      localStorage.getItem("multiChoiceList") as string,
                    ).map((li, i) => {
                      // Check if the current array is the one you want to filter
                      if (i === OutIndex) {
                        // Use filter to create a new array excluding the element at the specified index
                        return li.filter((item, j) => j !== index - 1);
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
            type="radio"
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
                setMultiChoiceList(() => {
                  const updatedList = JSON.parse(
                    localStorage.getItem("multiChoiceList") as string,
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

export { MultiChoice };
