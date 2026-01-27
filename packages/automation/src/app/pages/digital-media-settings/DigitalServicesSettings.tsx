import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import moment from "moment";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable , DropResult} from "@hello-pangea/dnd";
import { getColorClass } from "@4eplatform/shared/functions/getColor";
import { ResponseStatus } from "../../enums/response-status";
import { editSubsytemMainClassificationSequence, GetSubsytemSettingsMainClassificationAgg } from "../../redux/features/mainClassification/subsytemSettingsMainClassificationSlice";
import { AppDispatch, RootState } from "../../redux/store/store";

const DigitalServicesSettings = () => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [pageSize, setPageSize] = useState(10000);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [digitalSettingsAfterConversion, setDigitalSettingsAfterConversion] =
    useState<any>([]);
  const [subsytemMainClassifications, setSubsytemMainClassifications] =
    useState<any[]>([]);
  const [filteredChildSystems, setFilteredChildSystems] = useState<any[]>([]);
  const digitalSettingsAfterConversionRef = useRef(
    digitalSettingsAfterConversion
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e?.target?.value?.toLowerCase());
  };

  useEffect(() => {
    const params = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(GetSubsytemSettingsMainClassificationAgg(params));
  }, [dispatch, pageSize, pageIndex, searchTerm]);

  const systemTree:any = useSelector(
    (state: RootState) =>
      state?.subsytemSettingsMainClassificationAggSlice?.items ?? []
  );

  useEffect(() => {
    if (systemTree?.[0]?.allSubsytemSettingsMainClassifications) {
      setSubsytemMainClassifications(
        systemTree[0].allSubsytemSettingsMainClassifications
      );
    }
  }, [systemTree]);

  useEffect(() => {
    if (systemTree?.[0]?.allSubsytemSettingsMainClassifications) {
      const allClassifications =
        systemTree[0].allSubsytemSettingsMainClassifications;
      setSubsytemMainClassifications(allClassifications);

      const filtered = allClassifications.filter((childSys: any) => {
        const childNameEn = childSys?.nameEn?.toLowerCase() || "";
        const childNameAr = childSys?.nameAr?.toLowerCase() || "";
        const childmainNameAr = childSys?.mainNameAr?.toLowerCase() || "";
        const childmainNameEn = childSys?.mainNameEn?.toLowerCase() || "";
        return (
          childNameEn.includes(searchTerm) ||
          childNameAr.includes(searchTerm) ||
          childmainNameAr.includes(searchTerm) ||
          childmainNameEn.includes(searchTerm)
        );
      });
      setFilteredChildSystems(filtered);

      setDigitalSettingsAfterConversion((prevState: any) => allClassifications);
    }
  }, [systemTree, searchTerm]);

  useEffect(() => {
    digitalSettingsAfterConversionRef.current = digitalSettingsAfterConversion;
  }, [digitalSettingsAfterConversion]);

  const reorder = (
    list: any[],
    startIndex: number,
    endIndex: number
  ): any[] => {
    const result = [...list];
    const [sequence] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, sequence);
    return result;
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const currentItems = digitalSettingsAfterConversionRef.current;
    const reorderedItems = reorder(
      currentItems,
      result.source.index,
      result.destination.index
    );
    setDigitalSettingsAfterConversion(reorderedItems);

    const editedSubSystemSequence = {
      sequences: reorderedItems.map((item, index) => ({
        mainClassificationId: item?.mainClassificationId,
        subSystemId: item?.subSystemId,
        squence: index,
        isVisible: item?.isShowInHomePage,
        isSubSystem: item?.isSubSystem,
      })),
    };

    const params = {
      pageSize: searchTerm ? 10000 : pageSize,
      pageNumber: searchTerm ? 1 : pageIndex,
    };

    dispatch(
      editSubsytemMainClassificationSequence(editedSubSystemSequence)
    )?.then((res: any) => {
      if (
        res?.payload?.message === "Success" ||
        res?.payload?.statusEnum === ResponseStatus.SavedSuccessfully
      ) {
        dispatch(GetSubsytemSettingsMainClassificationAgg(params)).then(() => {
          setSubsytemMainClassifications(
            systemTree[0].allSubsytemSettingsMainClassifications
          );
        });
      }
    });
  };

  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

   const breadcrumbItems = [
    { path: "", defaultName: "DigitalServicesSettings", name:"" , },
  ];
  return (
    <>
      <DynamicToolbar
        // defaultTitle={intl.formatMessage({ id: "DigitalServicesSettings" })}
        // fixedTitle={partTitle ? true : false}
        // extraTitle={partTitle}
        // breadcrumbItems={breadcrumbItems}
        // showWorkspace={true}
        // cardOption={cardName}
        // cardId={id}
        defaultTitle="DigitalServicesSettings"
        fixedTitle={true}
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={"DigitalServicesSettings"}
      />
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start  mt-4"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="row g-5 g-xl-8">
            <div className="col-xl-12">
              <div className="card card-xl-stretch mb-xl-8 card-body">
                <div className="card-header border-0 pt-3 pb-2 mb-2">
                  <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-start align-items-md-center w-100">
                    <div className="w-lg-50 w-md-50 w-sm-50 w-100 mb-3 mb-md-0">
                      <div className="w-100 position-relative">
                        <input
                          type="text"
                          name="search"
                          className="form-control form-control-solid ps-12 pr-12"
                          placeholder={intl.formatMessage({ id: "Search" })}
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                        <i className="fa-solid fa-light fa-magnifying-glass my-magnify fs-3 text-muted fa-fw position-absolute"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-5 taskLogs">
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 dark-table-head">
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th className="w-25 text-center">
                            {intl.formatMessage({ id: "SystemName" })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "EstablishedDate" })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "SystemType" })}
                          </th>
                          {/* <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "AccessMethod" })}
                          </th> */}
                        </tr>
                      </thead>
                      <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="droppable-digitalServices">
                          {(provided:any) => (
                            <tbody
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {filteredChildSystems
                                ? filteredChildSystems?.map(
                                    (card: any, index) => (
                                      <Draggable
                                        key={
                                          card?.subSystemId +
                                          index +
                                          card?.squence
                                        }
                                        draggableId={String(
                                          card?.subSystemId +
                                            index +
                                            card?.squence
                                        )}
                                        index={index}
                                      >
                                        {(provided:any) => (
                                          <tr
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <td className="DefaultIconSize">
                                              <div className="d-flex mx-10">
                                                <div className="symbol symbol-50px mb-2 toolsIcon">
                                                  <span
                                                    className={`symbol-label bg-light-${getColorClass(card?.color)}`}
                                                  >
                                                    <span
                                                      className={`svg-icon svg-icon-4x svg-icon-${getColorClass(card?.color)}`}
                                                      dangerouslySetInnerHTML={{
                                                        __html: card?.icon,
                                                      }}
                                                    ></span>
                                                  </span>
                                                </div>
                                                <div className="d-flex flex-column mx-3 justify-content-center align-items-center">
                                                  <span>
                                                    {intl.locale == "en"
                                                      ? card?.nameEn
                                                      : card?.nameAr}
                                                  </span>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="text-center">
                                              {moment(card?.createdOn).format(
                                                "YYYY-MM-DD"
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {card?.isExternal
                                                ? intl.formatMessage({
                                                    id: "External",
                                                  })
                                                : intl.formatMessage({
                                                    id: "Internal",
                                                  })}
                                            </td>
                                            {/* <td className="text-center">
                                              {card?.isExternal
                                                ? card?.isSinglSignOn
                                                  ? intl.formatMessage({
                                                      id: "SingleSignOn",
                                                    })
                                                  : intl.formatMessage({
                                                      id: "Redirect",
                                                    })
                                                : "-"}
                                            </td> */}
                                          </tr>
                                        )}
                                      </Draggable>
                                    )
                                  )
                                : Array.isArray(filteredChildSystems) &&
                                  subsytemMainClassifications?.map(
                                    (card: any, index) => (
                                      <Draggable
                                        key={
                                          card?.subSystemId +
                                          index +
                                          card?.squence
                                        }
                                        draggableId={String(
                                          card?.subSystemId +
                                            index +
                                            card?.squence
                                        )}
                                        index={index}
                                      >
                                        {(provided:any) => (
                                          <tr
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <td className="">
                                              <div className="d-flex mx-10">
                                                <div className="symbol symbol-50px mb-2 toolsIcon">
                                                  <span
                                                    className={`symbol-label bg-light-${getColorClass(card?.color)}`}
                                                  >
                                                    <span
                                                      className={`svg-icon svg-icon-4x svg-icon-${getColorClass(card?.color)}`}
                                                      dangerouslySetInnerHTML={{
                                                        __html: card?.icon,
                                                      }}
                                                    ></span>
                                                  </span>
                                                </div>
                                                <div className="d-flex flex-column mx-3 justify-content-center align-items-center">
                                                  <span>
                                                    {intl.locale == "en"
                                                      ? card?.nameEn
                                                      : card?.nameAr}
                                                  </span>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="text-center">
                                              {moment(card?.createdOn).format(
                                                "YYYY-MM-DD"
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {card?.isExternal
                                                ? intl.formatMessage({
                                                    id: "External",
                                                  })
                                                : intl.formatMessage({
                                                    id: "Internal",
                                                  })}
                                            </td>
                                            {/* <td className="text-center">
                                              {card?.isExternal
                                                ? card?.isSinglSignOn
                                                  ? intl.formatMessage({
                                                      id: "SingleSignOn",
                                                    })
                                                  : intl.formatMessage({
                                                      id: "Redirect",
                                                    })
                                                : "-"}
                                            </td> */}
                                          </tr>
                                        )}
                                      </Draggable>
                                    )
                                  )}
                              {provided.placeholder}
                            </tbody>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { DigitalServicesSettings };
