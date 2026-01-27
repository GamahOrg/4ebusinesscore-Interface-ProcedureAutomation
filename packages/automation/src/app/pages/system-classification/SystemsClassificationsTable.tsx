import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "../partials/DeletePopup";
import { useDispatch, useSelector } from "react-redux";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable , DropResult} from "@hello-pangea/dnd";
import { getColorClass } from '@4eplatform/shared/functions/getColor';
import { ResponseStatus } from "../../enums/response-status";
import { SubSystemClassificationActions } from "./SubSystemClassificationActions";
import SubSystemClassification from "../../models/SubSystemClassification";
import { editSubsystemSettingsMainClassificationSequence, GetAllSubSystemSettingsMainClassificationByRowCount } from "../../redux/features/subsytemSettingsMainClassification";
import { AppDispatch, RootState } from "../../redux/store/store";

const SystemsClassificationsTable: FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch<AppDispatch>();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10000);
  const [searchTerm, setSearchTerm] = useState("");
  const [homeSettingsAfterConversion, setHomeSettingsAfterConversion] =
    useState<any>([]);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  let params: any = {
    pageSize: pageSize,
    pageNumber: pageIndex,
    searh: searchTerm,
  };

  let subsystemMainClassification = useSelector((state: RootState) => {
    return state?.subsystemSettingsClassification?.items;
  });

  useEffect(() => {
    setHomeSettingsAfterConversion(subsystemMainClassification);
  }, [subsystemMainClassification]);

  useEffect(() => {
    dispatch(
      GetAllSubSystemSettingsMainClassificationByRowCount(params) as any
    );
  }, [pageSize, pageIndex, searchTerm, dispatch]);

  const reorder = (
    list: SubSystemClassification[],
    startIndex: number,
    endIndex: number
  ): SubSystemClassification[] => {
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

    const editedSubSystemSequence = {
      subsytemSettingsMainClassificationsSequnce: items.map((item, index) => ({
        id: item.id,
        squence: index,
      })),
    };

    dispatch(
      editSubsystemSettingsMainClassificationSequence(editedSubSystemSequence)
    )?.then((res: any) => {
      if (
        res?.payload?.message ===
          "SubsytemSettingsMainClassificationUpdatedSuccessfully" ||
        res?.payload?.statusEnum === ResponseStatus.SavedSuccessfully
      ) {
        dispatch(
          GetAllSubSystemSettingsMainClassificationByRowCount(params) as any
        );
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
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fa-solid fa-light fa-magnifying-glass my-magnify fs-3 text-muted fa-fw position-absolute"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-5 taskLogs">
                  <div className="table-responsive">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                      <Droppable droppableId="droppable-systems">
                        {(provided) => (
                          <table
                            className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 dark-table-head"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <thead>
                              <tr className="fw-bolder text-muted">
                              <th className="min-w-100px text-center">
                                  {intl.formatMessage({
                                    id: "Icon",
                                  })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({
                                    id: "ClassificationName",
                                  })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({
                                    id: "Status",
                                  })}
                                </th>
                                <th className="min-w-100px text-center">
                                  {intl.formatMessage({ id: "TheProcedures" })}
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {subsystemMainClassification?.map(
                                (
                                  system: SubSystemClassification,
                                  index: number
                                ) =>
                                  index === 0 ? (
                                    <tr key={index}>
                                       <td className="text-center DefaultIconSize">
                                       <div className="symbol symbol-50px mb-2 toolsIcon">
                                      <span
                                        className={`symbol-label bg-light-${getColorClass(system?.color)}`}
                                      >
                                        <span
                                          className={`svg-icon svg-icon-4x svg-icon-${getColorClass(system?.color)}`}
                                          dangerouslySetInnerHTML={{ __html: system?.icon }}
                                        ></span>
                                      </span>
                                    </div>
                                      </td>
                                      <td className="text-center text-primary">
                                        <span className="text-primary">
                                          {intl.locale === "ar"
                                            ? system?.nameAr
                                            : system?.nameEn}
                                        </span>
                                      </td>
                                      <td className="text-center">
                                        <span className="text-primary">
                                          {!system?.isHide?intl.formatMessage({id:"Shown"}):intl.formatMessage({id:"Hidden"})}
                                        </span>
                                      </td>
                                      <td className="text-center">
                                        <SubSystemClassificationActions
                                          id={system?.id}
                                          searchTerm={searchTerm}
                                          sysName={intl.locale === "ar" ? system?.nameAr : system?.nameEn}
                                          deletionAllowed={false}
                                        />
                                      </td>
                                    </tr>
                                  ) : (
                                    <Draggable
                                      key={index}
                                      draggableId={String(system?.id)}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <tr
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                    <td className="text-center DefaultIconSize">
                                    <div className="symbol symbol-50px mb-2 toolsIcon">
                                      <span
                                        className={`symbol-label bg-light-${getColorClass(system?.color)}`}
                                      >
                                        <span
                                          className={`svg-icon svg-icon-4x svg-icon-${getColorClass(system?.color)}`}
                                          dangerouslySetInnerHTML={{ __html: system?.icon }}
                                        ></span>
                                      </span>
                                    </div>
                                      </td>
                                          <td className="text-center text-primary">
                                            <span className="text-primary">
                                              {intl.locale === "ar"
                                                ? system?.nameAr
                                                : system?.nameEn}
                                            </span>
                                          </td>
                                          <td className="text-center">
                                        <span className="text-primary">
                                          {!system?.isHide?intl.formatMessage({id:"Shown"}):intl.formatMessage({id:"Hidden"})}
                                        </span>
                                      </td>
                                          <td className="text-center">
                                            <SubSystemClassificationActions
                                              id={system?.id}
                                              searchTerm={searchTerm}
                                              sysName={intl.locale === "ar" ? system?.nameAr : system?.nameEn}
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
      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
        />
      </div>
    </>
  );
};

export { SystemsClassificationsTable };
