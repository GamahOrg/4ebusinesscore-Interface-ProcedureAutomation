import { FC, Fragment, useEffect, useState, useReducer } from "react";
import { useIntl } from "react-intl";
import { getCurrentSystemLanguage } from "../../../../../app/partials/functions/language";
import AddBasicClassificationPopup from "../popup/AddBasicClassificationPopup";
import { MainClassificationActions } from "./main-classification-actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { fetchMainClassificationById } from "../../../../redux/features/mainClassification/mainClassificationByIdSlice";
import ItemsTab from "./ItemTab";
import MainClassificationTab from "./MainClassificationTab";
import ServiceCatalogTab from "./ServiceCatalogTab";
import CategoryTab from "./CategoryTab";
import { Link, useLocation, useParams } from "react-router-dom";
import { getClassification } from "../../../../redux/features/mainClassification/classificationsSlice";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { ServiceCatalog } from "./ServiceCatalog";
import { getColorClass } from "@4eplatform/shared/functions/getColor";

type StateType = {
  serviceCatalogs: boolean;
  categories: Record<string, boolean>;
  items: Record<string, boolean>;
  mainClassificationTree: Record<string, boolean>;
};

type ActionType =
  | { type: typeof OPEN_SERVICE_CATALOGS }
  | { type: typeof OPEN_CATEGORIES; itemId: string }
  | { type: typeof OPEN_ITEMS; itemId: string }
  | { type: typeof OPEN_MAIN_CLASSIFICATION_TREE; itemId: string };

// Action types
const OPEN_SERVICE_CATALOGS = "OPEN_SERVICE_CATALOGS";
const OPEN_CATEGORIES = "OPEN_CATEGORIES";
const OPEN_ITEMS = "OPEN_ITEMS";
const OPEN_MAIN_CLASSIFICATION_TREE = "OPEN_MAIN_CLASSIFICATION_TREE";

const initialState: StateType = {
  serviceCatalogs: false,
  categories: {},
  items: {},
  mainClassificationTree: {},
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case OPEN_SERVICE_CATALOGS:
      return {
        ...state,
        serviceCatalogs: !state.serviceCatalogs,
      };
    case OPEN_CATEGORIES:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.itemId]: !state.categories[action.itemId],
        },
      };
    case OPEN_ITEMS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.itemId]: !state.items[action.itemId],
        },
      };
    case OPEN_MAIN_CLASSIFICATION_TREE:
      return {
        ...state,
        mainClassificationTree: {
          ...state.mainClassificationTree,
          [action.itemId]: !state.mainClassificationTree[action.itemId],
        },
      };
    default:
      return state;
  }
};


const CreateNewService: FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation()
  const { systemId } = useParams()
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [state, dispatch2] = useReducer(reducer, initialState);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [AddBasicClassificationShow, setAddBasicClassificationShow] = useState<boolean>(false);
  const [hierarchyState, setHierarchyState] = useState<any>({});

  useEffect(() => {
    dispatch(
      getClassification({
        pageNumber: pageIndex,
        pageSize: pageSize,
        ...(systemId && { subSystemId: systemId }),
      }) as any
    );
  }, [pageIndex, pageSize, systemId]);

  let [selectedId, setSelectedId] = useState<string>("");
  let mainClassifications = useSelector((state: RootState) => {
    return state?.classifications?.data?.mainClassifications;
  });

  let totalPages = useSelector((state: RootState) => {
    return state?.classifications?.totalPages;
  });
  let totalItems = useSelector((state: RootState) => {
    return state?.classifications?.totalItems;
  });

  let mainClassificationTree = useSelector((state: RootState) => {
    return state?.mainClassificationTree?.data;
  });

  const getAllItemIds = (data: any) => {
    let itemIds = [];

    const processCategories = (categories: any) => {
      for (const category of categories) {
        itemIds.push(...(category?.items || []).map((item: any) => item?.id));
        processCategories(category?.subCategories || []);
      }
    };

    for (const catalog of data?.serviceCatalogs || []) {
      itemIds?.push(...(catalog?.items || []).map((item: any) => item?.id));
      processCategories(catalog?.categories || []);
    }

    return itemIds;
  };

  let [allTrees, setAllTrees] = useState<any>([]);
  let [selectedIds, setSelectedIds] = useState<any>([]);

  useEffect(() => {
    const FilteredTree = allTrees?.filter(
      (tree: any) => tree?.id != mainClassificationTree?.id
    );
    setAllTrees(() => {
      return [...FilteredTree, mainClassificationTree];
    });
  }, [mainClassificationTree]);

  type CustomAction = {
    type:
    | "OPEN_SERVICE_CATALOGS"
    | "OPEN_CATEGORIES"
    | "OPEN_ITEMS"
    | "OPEN_MAIN_CLASSIFICATION_TREE";
    itemId: string;
  };

  const handleItemClick = (itemId: string, itemType: string, e?: any) => {
    const targetElement = e?.target as HTMLElement;
    const isMainClassificationClicked = targetElement?.closest(
      "#mainClassification"
    );
    if (isMainClassificationClicked) {
      dispatch(fetchMainClassificationTree(itemId) as any);
      dispatch(fetchMainClassificationById(itemId) as any).then((res: any) => {
        setSelectedIds((prevIds: any) => [...prevIds, itemId]);
        setSelectedId(itemId);
      });
    }
    dispatch2({
      type: itemType,
      itemId: state[itemType] === itemId ? null : itemId,
    } as CustomAction);
  };

  return (
    <>
      <div className="card card-xl-stretch mb-xl-0">
        <div className="card-header px-3 pt-3 pb-2 mb-3  d-flex justify-content-between">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fs-4 my-5 ">
              {" "}
              {intl.formatMessage({ id: "CreateNewService" })}{" "}
            </span>
            <span className="mt-1 fw-semibold fs-6 text-muted my-5">
              {intl.formatMessage({ id: "ProcedureAutomationCategories" })}{" "}
            </span>
          </h3>

          <div className="d-flex align-items-center px-1 gap-2 flex-wrap mb-3">
            <button
              className="btn btn-primary  m-0  d-flex align-items-center justify-content-center gap-3 w-250px"
              onClick={() => {
                setAddBasicClassificationShow(true);
              }}
            >
              <span>+</span>
              <span>{intl.formatMessage({ id: "AddServiceCategory", })}</span>
            </button>
            <Link
                to={`/create-new-service/excluded-users`}
                state={{ ...location?.state, systemId: systemId }}
                className="btn btn-primary d-flex align-items-center gap-2 w-250px text-nowrap"
              >
                <i className="fas fa-cogs fs-4"></i>
                {intl.formatMessage({ id: "ExceptionEmployeeSettings", })}
              </Link>
          </div>
        </div>
        <div className="card-body py-3 px-3 mb-5">
          <div className="tab-content">
            <div className="row h-100 w-100">
              <div className="col-md-6">
                <div
                  className={`h-100 border   border-bottom-0  border-top-0 border-secondary ${getCurrentSystemLanguage() == "ar"
                      ? "border-end-0 border-start-1"
                      : "border-end-1 border-start-0"
                    }`}
                >
                  {mainClassifications?.map(
                    (mainClassification: any, index: number) => {
                      const isHierarchyOpen =
                        hierarchyState[mainClassification?.id as string];

                      return (
                        <Fragment key={mainClassification?.id}>
                          <div className="tree_main mb-5 ">
                            <ul
                              id="tree1"
                              className="  tree tree3 list-unstyled"
                            >
                              <div
                                id="mainClassification"
                                className="bg-light cursor-pointer fs-3 mx-2 mb-7 d-flex justify-content-between align-items-center p-3"
                                onClick={(e) => {
                                  setHierarchyState((prevState: any) => ({
                                    ...prevState,
                                    [mainClassification?.id as string]:
                                      !prevState[
                                      mainClassification?.id as string
                                      ],
                                  }));
                                  handleItemClick(
                                    mainClassification?.id as string,
                                    OPEN_MAIN_CLASSIFICATION_TREE,
                                    e
                                  );
                                }}
                              >
                                <div>
                                  <span
                                    className={`symbol-label p-8px bg-light-${getColorClass(mainClassification?.color)}`}
                                  >
                                    {mainClassification?.icon && (
                                      <span
                                        className={`svg-icon svg-icon-4x svg-icon-${getColorClass(mainClassification?.color)}`}
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            mainClassification?.icon.includes(
                                              "fs-"
                                            )
                                              ? mainClassification?.icon.replace(/fs-\d+x?/, "fs-3")
                                              : mainClassification?.icon.replace(/class=["']/, 'class="fs-3 ')
                                        }}
                                      ></span>
                                    )}
                                    <a
                                      className="basic-item mx-2"
                                      role="button"
                                      onClick={(e) => {
                                        handleItemClick(
                                          mainClassification?.id as string,
                                          "OPEN_SERVICE_CATALOGS",
                                          e
                                        );
                                      }}
                                    >
                                      {intl.locale == "ar" ? mainClassification?.name:(mainClassification?.nameEn ||"Classification Name")}
                                      {mainClassification?.hasServiceCatalog ? (
                                        state.mainClassificationTree[
                                          mainClassification?.id
                                        ] ? (
                                          <i className="fa-solid fa-angle-up mx-1"></i>
                                        ) : (
                                          <i className="fa-solid fa-angle-down mx-1"></i>
                                        )
                                      ) : null}
                                    </a>
                                  </span>
                                </div>
                                <MainClassificationActions
                                  id={mainClassification?.id as string}
                                  fetchData={() => {
                                    dispatch(
                                      getClassification({
                                        pageNumber: pageIndex,
                                        pageSize: pageSize,
                                        ...(systemId && { subSystemId: systemId }),
                                      }) as any
                                    );
                                  }}
                                />
                              </div>

                              {isHierarchyOpen &&
                                selectedIds?.filter((id: string) => {
                                  return mainClassification?.id == id;
                                })?.length > 0 && (
                                  <li className=" branch">
                                    <ServiceCatalog
                                      parentId={mainClassification?.id}
                                      serviceCatalogs={
                                        allTrees?.find((tree: any) => {
                                          return (
                                            tree?.id == mainClassification?.id
                                          );
                                        })?.serviceCatalogs
                                      }
                                      setSelectedId={setSelectedId}
                                    />
                                  </li>
                                )}
                            </ul>
                          </div>
                        </Fragment>
                      );
                    }
                  )}
                  <SystemPagination
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                  />
                </div>
              </div>
              {Array.isArray(mainClassifications) && mainClassifications
                ?.map((item: any) => {
                  return item?.id;
                })
                ?.filter((item: any) => {
                  return item == selectedId;
                })?.length > 0 ? (
                <>
                  <MainClassificationTab id={selectedId} />
                </>
              ) : Array.isArray(mainClassificationTree?.serviceCatalogs) && mainClassificationTree?.serviceCatalogs
                ?.map((item :any) => {
                  return item?.id;
                })
                ?.filter((item:any) => {
                  return item == selectedId;
                })?.length > 0 ? (
                <>
                  <ServiceCatalogTab id={selectedId} />
                </>
              ) : Array.isArray(mainClassificationTree?.serviceCatalogs) && mainClassificationTree?.serviceCatalogs
                ?.map((item:any) => item?.categories)
                ?.flat()
                ?.map((category:any) => category?.id)
                ?.filter((categoryId:any) => categoryId == selectedId)?.length >
                0 ? (
                <>
                  <CategoryTab id={selectedId} />
                </>
              ) : getAllItemIds(mainClassificationTree)?.filter((id) => {
                return id == selectedId;
              })?.length > 0 ? (
                <>
                  <ItemsTab id={selectedId} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Rega_modal_add">
      </div>
      <AddBasicClassificationPopup
        show={AddBasicClassificationShow}
        handleClose={() => setAddBasicClassificationShow(false)}
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
      />
    </>
  );
};

export default CreateNewService;
