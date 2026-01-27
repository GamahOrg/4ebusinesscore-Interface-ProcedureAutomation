import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { getColorClass } from "@4eplatform/shared/functions/getColor";
import { ShowSystemsClassifiActions } from "./ShowSystemsClassifiActions";
// import {
//   getAllSubsytemSettingsbyMainClassificationid,
//   postSubsytemSettingsMainClassificationSequence,
// } from "../slices/subsytemSettingsMainClassification";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable , DropResult} from "@hello-pangea/dnd";

import { AppDispatch, RootState } from "../../redux/store/store";
import { ResponseStatus } from "../../enums/response-status";
import SystemClassification from "../../models/SystemClassification";
import { getAllSubsytemSettingsbyMainClassificationid, postSubsytemSettingsMainClassificationSequence } from "../../redux/features/subsytemSettingsMainClassification";
import { getAllSubSystemSettingsMainClassification } from "../../redux/features/getAllSubsytemSettingsMainClassification";


const ViewSystemClassifi: FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [isChanges, setIsChanges] = useState(false);
  const [homeSettingsAfterConversion, setHomeSettingsAfterConversion] =
    useState<any>([]);
  const systemClassifications: any = useSelector(
    (state: RootState) =>
      state?.allSubsytemByClassificationId?.allSubsytemByClassificationid
  );
  const { pagination } = useSelector(
    (state: RootState) => state?.allSubsytemByClassificationId
  );
  const Subcategories = useSelector((state: RootState) => {
    return state?.subSystemSettingsMainClassification?.items;
  });

  let [systemClassificationsData, setSystemClassificationsData] = useState([]);

  useEffect(() => {
    if (id && (isChanges || !systemClassificationsData?.length)) {
      dispatch(getAllSubsytemSettingsbyMainClassificationid(id) as any).then(
        (res: any) => {
          setSystemClassificationsData(res?.payload?.result);
          if (isChanges) setIsChanges(false);
        }
      );
    }
  }, [id, isChanges]);
  
  useEffect(() => {
    dispatch(getAllSubSystemSettingsMainClassification({}) as any);
  }, [dispatch]);
  
  const totalPages = Math.ceil(systemClassificationsData?.length / pageSize);
  // Helper function to paginate
  const paginateArray = (data: any, currentPage: number, pageSize: number) => {
    const startIndex = (currentPage - 1) * pageSize;
    return data?.slice(startIndex, startIndex + pageSize);
  };
  // Get current page data
  const currentData: any = paginateArray(
    systemClassificationsData,
    pageIndex,
    pageSize
  );
  // Handle search input change
  const handleSearchChange = (value: any) => {
    setSearchTerm(value);
    // setPageIndex(1); // Reset to first page when searching
  };
  const filteredData = Array.isArray(systemClassifications) && systemClassifications?.filter((item: any) => {
    return intl.locale == "ar"
      ? item?.nameAr?.includes(searchTerm?.trim())
      : item?.nameEn
          ?.toLowerCase()
          ?.includes(searchTerm?.trim()?.toLowerCase());
  });

  useEffect(() => {
    if (JSON.stringify(homeSettingsAfterConversion) !== JSON.stringify(filteredData)) {
      setHomeSettingsAfterConversion(filteredData);
    }
  }, [filteredData, homeSettingsAfterConversion]);
  
  
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
    const items = reorder(
      homeSettingsAfterConversion,
      result.source.index,
      result.destination.index
    );
    setHomeSettingsAfterConversion(items);
    const sequences = {
      sequences: items?.map((item, index) => ({
        mainClassificationId: item?.mainClassificationId,
        subSystemId: item?.subSystemId,
        squence: index,
        isSubSystem: item?.isSubSystem || false,
      })),
    };

    dispatch(
      postSubsytemSettingsMainClassificationSequence(sequences)
    )?.then((res: any) => {
      if (res?.payload?.message === "Success" ||
        res?.payload?.statusEnum === ResponseStatus.Success
      ) {
        setIsChanges(true)
      }
    });
  };

  return (
    <>
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
                          onChange={(e) => {
                            handleSearchChange(e?.target?.value);
                          }}
                        />
                        <i className="fa-solid fa-light fa-magnifying-glass my-magnify fs-3 text-muted fa-fw position-absolute"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-5 taskLogs">
                  <div className="table-responsive">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="droppable-systems-mainclassification">
                        {(provided) => (
                          <table
                            className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 dark-table-head"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <thead>
                              <tr className="fw-bolder text-muted">
                                <th className="w-25 text-center">
                                  {intl.formatMessage({ id: "SystemName" })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({ id: "SystemType" })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({ id: "AccessMethod" })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({ id: "SubCategory" })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({ id: "SystemStatus" })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({ id: "TheProcedures" })}
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {Array.isArray(filteredData) &&
                                filteredData?.map(
                                  (
                                    sysClassification: SystemClassification,
                                    index
                                  ) => (
                                      <Draggable
                                        key={
                                          sysClassification?.mainClassificationId ===
                                          "00000000-0000-0000-0000-000000000000"
                                            ? sysClassification?.subSystemId
                                            : sysClassification?.mainClassificationId
                                        }
                                        draggableId={String(
                                          sysClassification?.mainClassificationId ===
                                            "00000000-0000-0000-0000-000000000000"
                                            ? sysClassification?.subSystemId
                                            : sysClassification?.mainClassificationId
                                        )}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <tr
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <td className="DefaultIconSize">
                                              <div>
                                                <div className="d-flex mx-10">
                                                  <div className="symbol symbol-50px mb-2 toolsIcon">
                                                    <span
                                                      className={`symbol-label bg-light-${getColorClass(sysClassification?.color)}`}
                                                    >
                                                      <span
                                                        className={`svg-icon svg-icon-4x svg-icon-${getColorClass(sysClassification?.color)}`}
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            sysClassification?.icon,
                                                        }}
                                                      ></span>
                                                    </span>
                                                  </div>
                                                  <div className="d-flex flex-column mx-3 justify-content-center align-items-start">
                                                    <span>
                                                      {intl.locale == "en"
                                                        ? sysClassification?.nameEn
                                                        : sysClassification?.nameAr}
                                                    </span>
                                                    <span className="text-muted fs-8">
                                                      {intl.locale == "en"
                                                        ? sysClassification?.mainNameEn
                                                        : sysClassification?.mainNameAr}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="text-center">
                                              {sysClassification?.isExternal
                                                ? intl.formatMessage({
                                                    id: "External",
                                                  })
                                                : intl.formatMessage({
                                                    id: "Internal",
                                                  })}
                                            </td>
                                            <td className="text-center">
                                              {sysClassification?.isExternal
                                                ? sysClassification?.isSinglSignOn
                                                  ? intl.formatMessage({
                                                      id: "SingleSignOn",
                                                    })
                                                  : intl.formatMessage({
                                                      id: "Redirect",
                                                    })
                                                : "-"}
                                            </td>
                                            <td className="text-center">
                                              {intl.locale == "en" ? sysClassification?.mainNameEn : sysClassification?.mainNameAr}
                                            </td>
                                            <td className="text-center">
                                              {intl.locale == "en"
                                                ? sysClassification?.subsytemMainLookupNameEn ||
                                                  "-"
                                                : sysClassification?.subsytemMainLookupNameAr ||
                                                  "-"}
                                            </td>
                                            <td className="text-center">
                                              <ShowSystemsClassifiActions
                                                id={
                                                  sysClassification.subSystemId
                                                }
                                                sysClassification={
                                                  sysClassification
                                                }
                                                mainClassificationId={sysClassification?.mainClassificationId}
                                                parentId={sysClassification?.parentId}
                                              />
                                            </td>
                                          </tr>
                                        )}
                                      </Draggable>
                                  )
                                )}
                                {provided.placeholder}
                            </tbody>
                          </table>
                        )}
                      </Droppable>
                    </DragDropContext>
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

export { ViewSystemClassifi };
