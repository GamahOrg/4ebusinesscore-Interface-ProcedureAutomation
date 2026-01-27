import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { getAllHiddenWorkspaces } from "../../redux/features/workspace/getAllHiddenWorkspacesSlice";
import { getFavouriteList } from "../../redux/features/workspace/favouritesListSlice";
import { RootState } from "../../redux/store/store";

const DynamicWorkSpace: FC = () => {
  const intl = useIntl();
  const [filteredCards, setFilteredCards] = useState<any>([]);
  const [filteredCardsFilter, setFilteredCardsFilter] = useState<any>([]);

  let userCardsByRolesWorkspace = useSelector((state: RootState) => {
    return state?.myComponents?.userCardsByRoles;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHiddenWorkspaces() as any);
    dispatch(getFavouriteList() as any);
  }, []);

  let enteredUserName = JSON.parse(
    localStorage.getItem("user") as string,
  )?.username;
  const [getCardsList, setCardsList] = useState([
    //Dynamic - My Tools
    {
      id: 0,
      name: intl.formatMessage({ id: "SystemName1" }),
      dept: intl.formatMessage({ id: "ManagementName" }),
      title: intl.formatMessage({ id: "CardName1" }),
      icon: <i className="fad fa-window-restore fs-3x"></i>,
      subIcon: <i className="bi bi-tools"></i>,
      subTitle: intl.formatMessage({ id: "CardDes1" }),
      count: "",
      lastUpdate: "20/04/2022",
      lastLogin: "25/03/2022",
      link: "#",
      color: "svg-icon-success",
      background: "bg-light-success",
      isShow: true,
      workspaceKey: 0,
    },
    //System Tools
  ]);

  const [getTableList, setTableList] = useState([
    //Dynamic - My Tools
    {
      id: 0,
      name: intl.formatMessage({ id: "SystemName1" }),
      dept: intl.formatMessage({ id: "ManagementName" }),
      title: intl.formatMessage({ id: "CardName1" }),
      icon: <i className="fad fa-window-restore fs-2x"></i>,
      subIcon: <i className="bi bi-tools"></i>,
      subTitle: intl.formatMessage({ id: "CardDes1" }),
      count: "",
      lastUpdate: "20/04/2022",
      lastLogin: "25/03/2022",
      link: "#",
      color: "svg-icon-info",
      background: "bg-light-info",
      isShow: true,
    },
    //System Tools
  ]);

  function onDragEnd(result: any) {
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
    let reorderState = [...getCardsList];
    let sourceIndex = source.index;
    let destinationIndex = destination.index;
    let [removedItems] = reorderState.splice(sourceIndex, 1);
    reorderState.splice(destinationIndex, 0, removedItems);
    return setCardsList(reorderState);
  }

  useEffect(() => {
    if (userCardsByRolesWorkspace?.length > 0) {
      setFilteredCardsFilter(userCardsByRolesWorkspace);
    } else {
      setFilteredCardsFilter([]);
    }
  }, []);

  return (
    <>
      <div
        className="container toolbar py-4 py-lg-15 px-6 d-flex flex-column align-items-start"
        id="kt_toolbar"
      >
        <div
          id="kt_toolbar_container"
          className="container-xxl d-flex flex-stack flex-wrap p-0"
        >
          <div className="d-flex align-items-center w-md-300px">
            <div className="position-relative  w-100">
              <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6">
                <KTSVG
                  path="/media/icons/duotune/general/gen065.svg"
                  className="text-white fs-2"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex-lg-row-fluid"
        data-select2-id="select2-data-129-tmo1"
      >
        <div className="tab-content">
          <div
            id="kt_project_users_card_pane"
            className="tab-pane fade active show"
          >
            <div className="container">
              {filteredCards?.length ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <div
                    className="row card-deck gap-10 "
                    style={{ minHeight: "45vh" }}
                  >
                    {enteredUserName == "SystemAdmin"
                      ? filteredCards?.map((card: any, index: any) =>
                          card.isChecked ? (
                            <Fragment key={card?.id}>
                              <Droppable droppableId={`droppable_${card.id}`}>
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="card mb-4"
                                  >
                                    <Draggable
                                      key={card.id}
                                      draggableId={card.id.toString()}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <div
                                          className=""
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          {" "}
                                        </div>
                                      )}
                                    </Draggable>
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </Fragment>
                          ) : null,
                        )
                      : filteredCards?.map((card: any, index: any) =>
                          card.isChecked ? (
                            <Fragment key={card?.id}>
                              <Droppable droppableId={`droppable_${card.id}`}>
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="card mb-4"
                                  >
                                    <Draggable
                                      key={card.id}
                                      draggableId={card.id.toString()}
                                      index={index}
                                    ></Draggable>
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </Fragment>
                          ) : null,
                        )}
                  </div>
                </DragDropContext>
              ) : (
                <div className="flex pt-20" style={{ minHeight: "45vh" }}>
                  <h2 className="text-center text-muted mt-20 ">
                    {intl.formatMessage({ id: "NotExist" })}
                  </h2>
                </div>
              )}
            </div>
          </div>

          <div id="kt_project_users_table_pane" className="tab-pane fade ">
            <div className="card card-flush">
              <div className="card-body pt-0">
                <div className="table-responsive">
                  <table
                    id="kt_project_users_table"
                    className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder"
                  >
                    <thead className="fs-7 text-gray-400 text-uppercase">
                      <tr>
                        <th className="min-w-250px">
                          {intl.formatMessage({ id: "Servicename" })}
                        </th>
                        <th className="min-w-90px">
                          {intl.formatMessage({ id: "Management" })}
                        </th>

                        <th className="min-w-50px text-end">
                          {intl.formatMessage({ id: "Details" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="fs-6">
                      {getTableList?.map((table) => (
                        <></>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { DynamicWorkSpace };
