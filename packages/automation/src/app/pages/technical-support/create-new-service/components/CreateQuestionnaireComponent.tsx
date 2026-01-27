import { FC, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "../../../partials/DeletePopup";
import { AddPopup } from "../../../partials/AddPopup";
import { MultiChoice } from "./MultiChoice";
import { CheckBox } from "./CheckBox";
import { DropDown } from "./DropDown";
import { TurnOffPopup } from "../../../partials/TurnOffPopup";
import { TurnOnPopup } from "../../../partials/TurnOnPopup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type CreateQuestionnaireComponentProps = {
  clickedIndex: number;
  setClickedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  questionsList: any[];
  setQuestionsList: React.Dispatch<React.SetStateAction<any[]>>;
  removeQuestion: (indexToRemove: number) => void;
  dynamicFormRef: any;
};

const CreateQuestionnaireComponent: FC<CreateQuestionnaireComponentProps> = ({
  clickedIndex,
  setClickedIndex,
  questionsList,
  setQuestionsList,
  removeQuestion,
  dynamicFormRef
}) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number>(0);
  const [isTurndeOn, setIsTurndeOn] = useState<boolean>(false);
  const [showTurnOffModel, setShowTurnOffModel] = useState<boolean>(false);
  const [descriptionClicked, setDescriptionClicked] = useState(
    JSON.parse(localStorage.getItem("descriptionClicked") as string) ||
      Array(questionsList.length).fill(false)
  );
  const [open, setOpen] = useState<boolean>(false);
  const [itemStates, setItemStates] = useState(
    JSON.parse(localStorage.getItem("itemStates") as string) ||
      Array(questionsList.length).fill("3")
  );

  //Options States
  const [multiChoiceList, setMultiChoiceList] = useState(
    JSON.parse(localStorage.getItem("multiChoiceList") as string) || [
      [
        `${intl.formatMessage({
          id: "OptionNo",
        })}1`,
      ],
    ]
  );
  const [checkBoxList, setCheckBoxList] = useState(
    JSON.parse(localStorage.getItem("checkBoxList") as string) || [
      [
        [
          `${intl.formatMessage({
            id: "OptionNo",
          })}1`,
        ],
      ],
    ]
  );
  const [dropDownList, setDropDownList] = useState(
    JSON.parse(localStorage.getItem("dropDownList") as string) || [
      [
        [
          `${intl.formatMessage({
            id: "OptionNo",
          })}1`,
        ],
      ],
    ]
  );

  // Set questionsList with question when all questions deleted
  useEffect(() => {
    localStorage.setItem("questionsList", JSON.stringify(questionsList));
    if (questionsList.length === 0)
      setQuestionsList([
        intl.formatMessage({
          id: "UnTitledQuestion",
        }),
      ]);
  }, [questionsList]);

  useEffect(() => {
    localStorage.setItem("itemStates", JSON.stringify(itemStates));
  }, [itemStates]);

  useEffect(() => {
    localStorage.setItem(
      "descriptionClicked",
      JSON.stringify(descriptionClicked)
    );
  }, [descriptionClicked]);

  //Set Options in Local Storage
  useEffect(() => {
    localStorage.setItem("multiChoiceList", JSON.stringify(multiChoiceList));
  }, [multiChoiceList]);
  useEffect(() => {
    localStorage.setItem("checkBoxList", JSON.stringify(checkBoxList));
  }, [checkBoxList]);
  useEffect(() => {
    localStorage.setItem("dropDownList", JSON.stringify(dropDownList));
  }, [dropDownList]);

  //Set Options with [OptionNo1] when adding question
  useEffect(() => {
    if (questionsList.length > multiChoiceList.length)
      setMultiChoiceList([
        ...multiChoiceList,
        [
          `${intl.formatMessage({
            id: "OptionNo",
          })}1`,
        ],
      ]);
    if (questionsList.length > checkBoxList.length)
      setCheckBoxList([
        ...checkBoxList,
        [
          `${intl.formatMessage({
            id: "OptionNo",
          })}1`,
        ],
      ]);
    if (questionsList.length > dropDownList.length)
      setDropDownList([
        ...dropDownList,
        [
          `${intl.formatMessage({
            id: "OptionNo",
          })}1`,
        ],
      ]);

  }, [questionsList]);

  const toggleItemState = (i, e) => {
    const updatedStates = [...itemStates];
    updatedStates[i] = e;
    setItemStates(updatedStates);
  };

  const deleteItemState = (i) => {
    const updatedStates = [...itemStates];

    //Delete the Option from ItemStates
    setItemStates(() => {
      return updatedStates.filter((state, index) => {
        return index !== i;
      });
    });

    //Delete the arrays of all Options
    setMultiChoiceList(() => {
      return multiChoiceList.filter((li, ind) => {
        return ind !== i;
      });
    });
    setCheckBoxList(() => {
      return checkBoxList.filter((li, ind) => {
        return ind !== i;
      });
    });
    setDropDownList(() => {
      return dropDownList.filter((li, ind) => {
        return ind !== i;
      });
    });

    // setItemStates(updatedStates);
  };

  const ref = useRef<HTMLInputElement>();
  const refImg = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const handleIconClick = () => {
    // Trigger a click event on the file input
    refImg?.current.click();
  };

  const handleFileChange = (e) => {
    // Handle the file change event here
    const selectedFile = e.target.files[0];
  };

  function onDragEnd(result) {
    let { source, destination, type } = result;
    // steps for reorder
    // if no destination nothing will be happened
    if (!result.destination) {
      return;
    }

    // if the same dropable and source index equal to destination index nothing will be happened
    if (
      source.index == destination.index &&
      source.draggableId == destination.draggableId
    ) {
      return;
    }

    let sourceIndex = source.index;
    let destinationIndex = destination.index;

    // Reorder Questions State
    let reorderState1 = [...questionsList];
    let [removedItems1] = reorderState1.splice(sourceIndex, 1);
    reorderState1.splice(destinationIndex, 0, removedItems1);

    // Reorder Options State
    let reorderState2 = [...itemStates];
    let [removedItems2] = reorderState2.splice(sourceIndex, 1);
    reorderState2.splice(destinationIndex, 0, removedItems2);

    // Check If the Current Options is MultiChoice, CheckBox or DropDown to Modify Their Arrays
    // if (itemStates[sourceIndex] === "3") {
    //I Removed the Conditions Because it makes mistakes in the other positions
    let reorderState3 = [...multiChoiceList];
    let [removedItems3] = reorderState3.splice(sourceIndex, 1);
    reorderState3.splice(destinationIndex, 0, removedItems3);
    setMultiChoiceList(reorderState3);
    // } else if (itemStates[sourceIndex] === "4") {
    let reorderState4 = [...checkBoxList];
    let [removedItems4] = reorderState4.splice(sourceIndex, 1);
    reorderState4.splice(destinationIndex, 0, removedItems4);
    setCheckBoxList(reorderState4);
    // } else if (itemStates[sourceIndex] === "5") {
    let reorderState5 = [...dropDownList];
    let [removedItems5] = reorderState5.splice(sourceIndex, 1);
    reorderState5.splice(destinationIndex, 0, removedItems5);
    setDropDownList(reorderState5);
    // }

    // Reorder Show Description
    let reorderState6 = [...descriptionClicked];
    let [removedItems6] = reorderState6.splice(sourceIndex, 1);
    reorderState6.splice(destinationIndex, 0, removedItems6);
    setDescriptionClicked(reorderState6);

    setItemStates(reorderState2);
    return setQuestionsList(reorderState1);
  }
  //   let dynamicFormContent=document.getElementById("mmm")

  return (
    <>
      <div
          id="dynamic_form"
          className="d-flex flex-column-fluid align-items-start container-xxl p-0 test"
          ref={dynamicFormRef}
          style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="card">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="card-body p-lg-20">
                <div
                    className="flex-lg-row-fluid"
                    data-select2-id="select2-data-129-tmo1"
                >
                  <div className="tab-content">
                    <div
                        id="kt_project_users_table_pane"
                        className="tab-pane fade active show"
                    >
                      <div>
                        {/* <div className="shadow-sm card form-card-border mb-6 mb-xl-7">
                          <div
                            className={`card-body py-3
                           colored-border-top ${
                             clicked === -1 ? "colored-border-right" : ""
                           }
                          `}
                            onClick={() => {
                              setClicked(-1);
                              setClickedIndex(-1);
                            }}
                          >
                            <div className="mb-2 pb-3">
                              <div className="my-6 position-relative">
                                <input
                                  className="new-questionnaire1 fs-2x"
                                  placeholder={intl.formatMessage({
                                    id: "ModelTitle",
                                  })}
                                />
                                <div className="border-highlight"></div>
                              </div>

                              <div className="my-6 position-relative">
                                <input
                                  className="new-questionnaire1"
                                  placeholder={intl.formatMessage({
                                    id: "ModelDescription",
                                  })}
                                />
                                <div className="border-highlight"></div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        {/*The start of the form questions*/}

                        {questionsList?.map((question: any, index: any) => {
                          return (
                              <div key={index}>
                                <Droppable droppableId={`question${index}`}>
                                  {(provided, snapshot) => (
                                      <div
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                      >
                                        <Draggable
                                            key={`question${index}`}
                                            draggableId={`question${index}`}
                                            index={index}
                                        >
                                          {(provided) => (
                                              <div
                                                  className=""
                                                  {...provided.draggableProps}
                                                  ref={provided.innerRef}
                                              >
                                                {/* {index === clickedIndex && (
                                            <button
                                              onClick={() =>
                                                removeQuestion(index)
                                              }
                                            >
                                              Remove Question
                                            </button>
                                          )} */}
                                                {index === clickedIndex && (
                                                    <div
                                                        className="position-relative p-4 pb-8"
                                                        id="plus_form"
                                                    >
                                                      <div
                                                          className="z-1 btn btn-active-light-primary position-absolute left-0 shadow-sm card w-45px h-45px rounded-2 d-flex justify-content-center align-items-center"
                                                          onClick={() => {
                                                            // setAddQuestion(
                                                            //   addQuestion + 1
                                                            // );
                                                            setClickedIndex(
                                                                questionsList.length
                                                            );
                                                            //Add a New Option as MultiChoice
                                                            setItemStates([
                                                              ...itemStates,
                                                              "3",
                                                            ]);

                                                            //Add a New Description State
                                                            setDescriptionClicked([
                                                              ...descriptionClicked,
                                                              false,
                                                            ]);

                                                            // Add the Question
                                                            setQuestionsList([
                                                              ...questionsList,
                                                              intl.formatMessage({
                                                                id: "UnTitledQuestion",
                                                              }),
                                                            ]);
                                                          }}
                                                          style={{zIndex: 1}}
                                                      >
                                                        <i className="bi bi-plus-circle icon-gray fs-2"></i>
                                                      </div>
                                                    </div>
                                                )}

                                                <div
                                                    className="shadow-sm card form-card-border mb-6 mb-xl-7 position-relative z-1"
                                                    onClick={() => {
                                                      setClickedIndex(index);
                                                    }}
                                                    id="test"
                                                >
                                                  <div
                                                      className={`card-body pb-3 pt-1 ${
                                                          clicked === index
                                                              ? "colored-border-right"
                                                              : ""
                                                      }`}
                                                      onClick={() => {
                                                        setClicked(index);
                                                      }}
                                                  >
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="text-muted text-center fs-2"
                                                    >
                                                      <i className="fas fa-grip-horizontal"></i>
                                                    </div>
                                                    <div className="pb-1">
                                                      <div className="d-flex w-100 align-items-center gap-6">
                                                        <div className="mt-4 mb-2 position-relative w-60">
                                                          <input
                                                              // name={`question-${index}`}
                                                              autoFocus={
                                                                index === clickedIndex
                                                                    ? true
                                                                    : false
                                                              }
                                                              className={`new-questionnaire2 ${
                                                                  index !== clickedIndex
                                                                      ? "bg-white border border-0"
                                                                      : ""
                                                              }`}
                                                              placeholder={intl.formatMessage(
                                                                  {
                                                                    id: "UnTitledQuestion",
                                                                  }
                                                              )}
                                                              onChange={(e) => {
                                                                setQuestionsList(
                                                                    (
                                                                        prevQuestionsList
                                                                    ) => {
                                                                      return prevQuestionsList.map(
                                                                          (li, i) =>
                                                                              i === index
                                                                                  ? e.target
                                                                                      .value
                                                                                  : li
                                                                      );
                                                                    }
                                                                );
                                                              }}
                                                              value={
                                                                  questionsList[index] ||
                                                                  ""
                                                              }
                                                          />
                                                          <div className="border-highlight"></div>
                                                        </div>
                                                        {index === clickedIndex && (
                                                            <>
                                                              <i
                                                                  className="bi bi-image fs-2x icon-gray cursor-pointer"
                                                                  onClick={
                                                                    handleIconClick
                                                                  }
                                                              ></i>
                                                              <input
                                                                  type="file"
                                                                  className="d-none"
                                                                  ref={refImg}
                                                                  onChange={
                                                                    handleFileChange
                                                                  }
                                                              />
                                                              <div className="w-40">
                                                                <select
                                                                    className="form-select form-select-solid bg-white iconic-select"
                                                                    name={index}
                                                                    value={
                                                                        itemStates[index] ||
                                                                        ""
                                                                    }
                                                                    onChange={(e) => {
                                                                      toggleItemState(
                                                                          index,
                                                                          e.target.value
                                                                      );
                                                                      // setItemStates([
                                                                      //   ...itemStates,
                                                                      // itemStates[index]:  e.target.value,
                                                                      // ]);
                                                                     
                                                                    }}
                                                                >
                                                                  <option
                                                                      value="1"
                                                                      className="iconic-select d-flex gap-4"
                                                                  >
                                                                    &#xf7a4; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "ShortAnswer",
                                                                        }
                                                                    )}
                                                                  </option>

                                                                  <option
                                                                      value="2"
                                                                      className="iconic-select d-flex gap-4"
                                                                  >
                                                                    &#xf039; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "Paragraph",
                                                                        }
                                                                    )}
                                                                  </option>
                                                                  <option
                                                                      value="3"
                                                                      className="iconic-select d-flex gap-4"
                                                                      selected
                                                                  >
                                                                    &#xf192; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "MultiChoices",
                                                                        }
                                                                    )}
                                                                  </option>
                                                                  <option
                                                                      value="4"
                                                                      className="iconic-select d-flex gap-4"
                                                                  >
                                                                    &#xf14a; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "CheckBoxes",
                                                                        }
                                                                    )}
                                                                  </option>
                                                                  {/* <option
                                                                      value="5"
                                                                      className="iconic-select d-flex gap-4"
                                                                  >
                                                                    &#xf150; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "Dropdown",
                                                                        }
                                                                    )}
                                                                  </option> */}
                                                                  {/* <option
                                                                      value="6"
                                                                      className="iconic-select d-flex gap-4"
                                                                  >
                                                                    &#xf381; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "UploadFile",
                                                                        }
                                                                    )}
                                                                  </option> */}
                                                                  <option
                                                                      value="7"
                                                                      className="iconic-select d-flex gap-4"
                                                                  >
                                                                    &#xf133; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "Date",
                                                                        }
                                                                    )}
                                                                  </option>
                                                                  <option
                                                                      value="8"
                                                                      className="iconic-select d-flex gap-4"
                                                                  >
                                                                    &#xf017; &nbsp;
                                                                    {intl.formatMessage(
                                                                        {
                                                                          id: "Time",
                                                                        }
                                                                    )}
                                                                  </option>
                                                                </select>
                                                              </div>
                                                            </>
                                                        )}
                                                      </div>
                                                      {descriptionClicked[index] && (
                                                          <div className="position-relative">
                                                            <input
                                                                className={`new-questionnaire1 pt-1 ${
                                                                    index !== clickedIndex
                                                                        ? "border border-0"
                                                                        : ""
                                                                }`}
                                                                placeholder={intl.formatMessage(
                                                                    {
                                                                      id: "Description",
                                                                    }
                                                                )}
                                                            />
                                                            <div className="border-highlight"></div>
                                                          </div>
                                                      )}

                                                      <div className="my-6 position-relative">
                                                        {itemStates[index] === "1" ? (
                                                            <div className="w-100 position-relative">
                                                              <input
                                                                  className="new-questionnaire1"
                                                                  placeholder={intl.formatMessage(
                                                                      {
                                                                        id: "ShortAnswerText",
                                                                      }
                                                                  )}
                                                              />
                                                              <div className="border-highlight"></div>
                                                            </div>
                                                        ) : itemStates[index] ===
                                                        "2" ? (
                                                            <textarea
                                                                className="form-control form-control-solid"
                                                                placeholder={intl.formatMessage(
                                                                    {
                                                                      id: "LongAnswerText",
                                                                    }
                                                                )}
                                                            />
                                                        ) : itemStates[index] ===
                                                        "3" ? (
                                                            <MultiChoice
                                                                OutIndex={index}
                                                                clickedIndex={
                                                                  clickedIndex
                                                                }
                                                                questionsList={
                                                                  questionsList
                                                                }
                                                                multiChoiceList={
                                                                  multiChoiceList
                                                                }
                                                                setMultiChoiceList={
                                                                  setMultiChoiceList
                                                                }
                                                            />
                                                        ) : itemStates[index] ===
                                                        "4" ? (
                                                            <CheckBox
                                                                OutIndex={index}
                                                                clickedIndex={
                                                                  clickedIndex
                                                                }
                                                                questionsList={
                                                                  questionsList
                                                                }
                                                                checkBoxList={
                                                                  checkBoxList
                                                                }
                                                                setCheckBoxList={
                                                                  setCheckBoxList
                                                                }
                                                            />
                                                        ) : itemStates[index] ===
                                                        "5" ? (
                                                            <DropDown
                                                                OutIndex={index}
                                                                clickedIndex={
                                                                  clickedIndex
                                                                }
                                                                questionsList={
                                                                  questionsList
                                                                }
                                                                dropDownList={
                                                                  dropDownList
                                                                }
                                                                setDropDownList={
                                                                  setDropDownList
                                                                }
                                                            />
                                                        ) : itemStates[index] ===
                                                        "6" ? (
                                                            <div
                                                                className="h-fit notice d-flex bg-light-primary rounded border-primary border border-dashed mb-1">
                                                              <label
                                                                  htmlFor="outputAttachment"
                                                                  className="form-label px-2  fontSz-6 dropzone-select   w-100 uploadFile-style inputAreaHeight"
                                                              >
                                                                <div className="row align-items-center">
                                                                  <div className="col-md-1">
                                                                    <img
                                                                        src="/media/pmo/uploadFile.png"
                                                                        className="img-fluid"
                                                                    />
                                                                  </div>
                                                                  <div className="col-md-8">
                                                                    <p className="text-primary fw-bolder my-1">
                                                                      {" "}
                                                                      {intl.formatMessage(
                                                                          {
                                                                            id: "QuickFileUploader",
                                                                          }
                                                                      )}
                                                                    </p>
                                                                    <p>
                                                                      {intl.formatMessage(
                                                                          {
                                                                            id: "DragAndDropOrChooseFilesFromComputer",
                                                                          }
                                                                      )}
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                              </label>
                                                              <div
                                                                  className="dropzone dropzone-queue mb-2"
                                                                  id="kt_dropzonejs_example_3"
                                                              >
                                                                <div className="dropzone-panel mb-lg-0 mb-2">
                                                                  <input
                                                                      multiple
                                                                      type="file"
                                                                      accept="image/*"
                                                                      id="outputAttachment"
                                                                      name="attachments"
                                                                      placeholder={intl.formatMessage(
                                                                          {
                                                                            id: "FileUpload",
                                                                          }
                                                                      )}
                                                                      className="dropzone-select w-100 uploadFile-style inputAreaHeight d-none"
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                        ) : itemStates[index] ===
                                                        "7" ? (
                                                            <input
                                                                type="date"
                                                                className="form-control w-25"
                                                            />
                                                        ) : itemStates[index] ===
                                                        "8" ? (
                                                            <input
                                                                type="time"
                                                                className="form-control w-25"
                                                            />
                                                        ) : (
                                                            <MultiChoice
                                                                OutIndex={index}
                                                                clickedIndex={
                                                                  clickedIndex
                                                                }
                                                                questionsList={
                                                                  questionsList
                                                                }
                                                                multiChoiceList={
                                                                  multiChoiceList
                                                                }
                                                                setMultiChoiceList={
                                                                  setMultiChoiceList
                                                                }
                                                            />
                                                        )}
                                                      </div>
                                                    </div>
                                                    {index === clickedIndex && (
                                                        <div>
                                                          <hr/>
                                                          <div
                                                              className="mb-2 pb-3 d-flex gap-9 justify-content-end icon-gray align-items-center">
                                                            <i
                                                                className="far fa-copy fs-2 cursor-pointer"
                                                                onClick={() => {
                                                                  // setAddQuestion(
                                                                  //   addQuestion + 1
                                                                  // );
                                                                  setClickedIndex(
                                                                      questionsList.length
                                                                  );

                                                                  //Copy the Option State
                                                                  toggleItemState(
                                                                      questionsList.length,
                                                                      itemStates[index]
                                                                  );

                                                                  // Copy the Description State
                                                                  setDescriptionClicked([
                                                                    ...descriptionClicked,
                                                                    descriptionClicked[
                                                                        index
                                                                        ],
                                                                  ]);

                                                                  //Add the Question to the list
                                                                  setQuestionsList([
                                                                    ...questionsList,
                                                                    questionsList[index],
                                                                  ]);

                                                                  //Copy the Array of Option State
                                                                
                                                                  if (
                                                                      itemStates[index] ===
                                                                      "3" ||
                                                                      itemStates[index] ==
                                                                      null
                                                                  ) {
                                                                    setMultiChoiceList([
                                                                      ...JSON.parse(
                                                                          localStorage.getItem(
                                                                              "multiChoiceList"
                                                                          ) as string
                                                                      ),
                                                                      multiChoiceList[
                                                                          index
                                                                          ],
                                                                    ]);
                                                                  } else if (
                                                                      itemStates[index] ===
                                                                      "4"
                                                                  ) {
                                                                    setCheckBoxList([
                                                                      ...JSON.parse(
                                                                          localStorage.getItem(
                                                                              "checkBoxList"
                                                                          ) as string
                                                                      ),
                                                                      checkBoxList[index],
                                                                    ]);
                                                                  } else if (
                                                                      itemStates[index] ===
                                                                      "5"
                                                                  ) {
                                                                    setDropDownList([
                                                                      ...JSON.parse(
                                                                          localStorage.getItem(
                                                                              "dropDownList"
                                                                          ) as string
                                                                      ),
                                                                      dropDownList[index],
                                                                    ]);
                                                                  }

                                                                 
                                                                }}
                                                            ></i>
                                                            <i
                                                                className="far fa-trash-alt fs-2 cursor-pointer"
                                                                onClick={() => {
                                                                  setQuestionsList(() => {
                                                                    return questionsList.filter(
                                                                        (li, i) => {
                                                                          return (
                                                                              i !== index
                                                                          );
                                                                        }
                                                                    );
                                                                  });
                                                                  deleteItemState(index);
                                                                  setDescriptionClicked(
                                                                      () => {
                                                                        return descriptionClicked.filter(
                                                                            (li, i) =>
                                                                                i !== index
                                                                        );
                                                                      }
                                                                  );
                                                                }}
                                                            ></i>
                                                            <div
                                                                className="h-30px border border-left-1 rounded line-border"></div>

                                                            <div
                                                                className="form-check form-switch form-check-custom form-check-solid d-flex gap-4 justify-content-center">
                                                      <span>
                                                        {intl.formatMessage({
                                                          id: "Required",
                                                        })}
                                                      </span>
                                                              <input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                  id="status"
                                                                  name="status"
                                                                  onClick={() => {
                                                                    setIsTurndeOn(
                                                                        !isTurndeOn
                                                                    );
                                                                    setShowTurnOffModel(
                                                                        true
                                                                    );
                                                                  }}
                                                                  defaultChecked={true}
                                                              />
                                                            </div>

                                                            <div
                                                                className="ms-2 me-4"
                                                                ref={ref}
                                                            >
                                                              <button
                                                                  type="button"
                                                                  className="btn btn-sm btn-icon btn-active-light-primary position-relative"
                                                                  onClick={() => {
                                                                    setOpen(!open);
                                                                  }}
                                                              >
                                                                <i className="fas fa-ellipsis-v fs-2 icon-gray"></i>
                                                              </button>
                                                              {open && (
                                                                  <div
                                                                      className={`menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-175px py-4 d-block position-absolute`}
                                                                  >
                                                                    <div className="text-muted pe-4 mb-2">
                                                            <span>
                                                              {intl.formatMessage(
                                                                  {
                                                                    id: "ShowForm",
                                                                  }
                                                              )}
                                                            </span>
                                                                    </div>
                                                                    <div className="menu-item px-3">
                                                                      <a
                                                                          href="#"
                                                                          className="menu-link px-3 d-flex align-items-center gap-4"
                                                                          onClick={() =>
                                                                              setDescriptionClicked(
                                                                                  () => {
                                                                                    return JSON.parse(
                                                                                        localStorage.getItem(
                                                                                            "descriptionClicked"
                                                                                        ) as string
                                                                                    ).map(
                                                                                        (
                                                                                            li,
                                                                                            i
                                                                                        ) => {
                                                                                          return i ===
                                                                                          index
                                                                                              ? !li
                                                                                              : li;
                                                                                        }
                                                                                    );
                                                                                  }
                                                                              )
                                                                          }
                                                                      >
                                                                        <i
                                                                            className={`fas fa-check fs-3 ${
                                                                                descriptionClicked[
                                                                                    index
                                                                                    ]
                                                                                    ? "visible"
                                                                                    : "invisible"
                                                                            }`}
                                                                        ></i>
                                                                        {intl.formatMessage(
                                                                            {
                                                                              id: "Description",
                                                                            }
                                                                        )}
                                                                      </a>
                                                                    </div>
                                                                  </div>
                                                              )}
                                                            </div>
                                                          </div>
                                                        </div>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                          )}
                                        </Draggable>
                                        {provided.placeholder}
                                      </div>
                                  )}
                                </Droppable>
                              </div>
                          );
                        })}

                        <div
                            className="modal fade"
                            id="Rega_modal_Delete"
                        >
                          <DeletePopup
                              handleCloseDelete={() => setModalDShow(false)}
                              showDelete={modalDShow}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {!footerShow && (
                  <div className="col-12 mb-3 col-lg-7 mx-auto my-10">
                    <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                      <div className="d-flex justify-content-center align-items-center w-50">
                        <div
                          className="btn btn-secondary mx-1 text-center w-100"
                          onClick={() => {
                            navigate("/questionnaires-details");
                          }}
                        >
                          {intl.formatMessage({ id: "Cancel" })}
                        </div>
                        <div
                          // data-bs-toggle="modal"
                          // data-bs-target="#Rega_modal_add"
                          onClick={() => setModalShow(true)}
                          className="btn btn-success mx-1 text-center w-100"
                        >
                          {intl.formatMessage({ id: "Add" })}
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Rega_modal_Delete">
        <DeletePopup
          handleCloseDelete={() => setModalDShow(false)}
          showDelete={modalDShow}
        />
      </div>
      <div className="modal fade" id="Rega_modal_add">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      {isTurndeOn ? (
        <div className="modal fade">
          <TurnOffPopup
            show={showTurnOffModel}
            handleClose={() => setShowTurnOffModel(false)}
          />
        </div>
      ) : (
        <div className="modal fade">
          <TurnOnPopup
            show={showTurnOffModel}
            handleClose={() => setShowTurnOffModel(false)}
          />
        </div>
      )}
    </>
  );
};

export { CreateQuestionnaireComponent };
