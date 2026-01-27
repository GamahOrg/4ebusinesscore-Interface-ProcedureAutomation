import { useReducer } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { fetchServiceCatalogById } from "../../../../redux/features/serviceCatalog/serviceCatalogByIdSlice";
import { getCategoryById } from "../../../../redux/features/category/categoryByIdSlice";
import { fetchItemById } from "../../../../redux/features/item/itemByIdSlice";
import { SubClassification1Actions } from "./sub-classification1-actions";
import { SubClassification2Actions } from "./sub-classification2-actions";
import { SubClassification3Actions } from "./sub-classification3-actions";
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

export const ServiceCatalog = ({
  serviceCatalogs,
  setSelectedId,
  parentId,
}: any) => {
  const [state, dispatch2] = useReducer(reducer, initialState);
  let dispatch = useDispatch();
  let intl = useIntl();

  let mainClassificationTreeStatus = useSelector((state: RootState) => {
    return state?.mainClassificationTree?.status;
  });
  const renderCategories = (categories: any) => {
    return (
      <ul>
        {categories?.map((category: any) => (
          <li key={category?.id} className="branch fs-4 mb-10">
            <label
              onClick={() => {
                dispatch(
                  fetchServiceCatalogById(category?.id as string) as any
                ).then((res: any) => {
                  setSelectedId(category?.id);
                });
              }}
              className="bg-light w-100 px-2 position-relative d-flex justify-content-between align-items-center"
            >
              {category?.icon && (
                <div
                  onClick={() =>
                    dispatch2({
                      type: OPEN_CATEGORIES,
                      itemId: category?.id as string,
                    })
                  }
                  role="button"
                >
                  <span
                    className={`p-8px symbol-label bg-light-${getColorClass(category?.color)}`}
                  >
                    <span
                      className={`svg-icon svg-icon-4x  mx-2 svg-icon-${getColorClass(category?.color)}`}
                      dangerouslySetInnerHTML={{
                        __html:   category?.icon.includes(
                                              "fs-"
                                            )
                                              ? category?.icon.replace(/fs-\d+x?/, "fs-3")
                                              : category?.icon.replace(/class=["']/, 'class="fs-3 ')
                      }}
                    ></span>
                    {intl.locale=="ar" ? category?.name :(category?.nameEn || "Service Catalog Name") }
                  </span>
                  {category?.categories && category?.categories.length > 0 ? (
                    state.categories[category?.id] ? (
                      <i className="fa-solid fa-angle-up mx-1"></i>
                    ) : (
                      <i className="fa-solid fa-angle-down mx-1"></i>
                    )
                  ) : null}
                </div>
              )}

              <SubClassification1Actions
                parentId={parentId}
                id={category?.id}
              />
            </label>
            {category?.categories &&
              category?.categories?.length > 0 &&
              state.categories[category?.id] && (
                <ul>
                  {category?.categories?.map((item: any) => (
                    <li key={item?.id} className="branch fs-5 mb-10">
                      <label
                        onClick={(e) => {
                          const targetElement = e.target as HTMLElement;
                          const isCategoryClicked =
                            targetElement.closest("#category");
                          if (isCategoryClicked) {
                            dispatch(
                              getCategoryById(item?.id as string) as any
                            ).then((res: any) => {
                              setSelectedId(item?.id);
                            });
                          }
                        }}
                        id="category"
                        className="bg-light w-100 px-2 position-relative d-flex justify-content-between align-items-center my-3"
                      >
                        <div
                          onClick={() =>
                            dispatch2({
                              type: OPEN_ITEMS,
                              itemId: item?.id as string,
                            })
                          }
                          role="button"
                        >
                          {intl.locale=="ar"?item?.name:(item?.nameEn||"Category Name")}
                          {item?.items && item?.items?.length > 0 ? (
                            state.items[item?.id] ? (
                              <i className="fa-solid fa-angle-up mx-1"></i>
                            ) : (
                              <i className="fa-solid fa-angle-down mx-1"></i>
                            )
                          ) : null}
                        </div>
                        <SubClassification2Actions
                          parentId={parentId}
                          id={item?.id}
                          serviceCatalogId={category?.id}
                          categoryId={item?.id}
                        />
                      </label>
                      {item?.items &&
                        item?.items?.length > 0 &&
                        state.items[item?.id] && (
                          <ul>
                            {item?.items?.map((ele: any) => (
                              <li key={ele?.id} className="branch fs-6 mb-10">
                                <label
                                  onClick={(e) => {
                                    const targetElement =
                                      e.target as HTMLElement;
                                    const isItemClicked =
                                      targetElement.closest("#item");
                                    if (isItemClicked) {
                                      setSelectedId(ele?.id);
                                      dispatch(
                                        fetchItemById(ele?.id) as any
                                      ).then((res: any) => {
                                        setSelectedId(ele?.id);
                                      });
                                    }
                                  }}
                                  id="item"
                                  className="bg-light w-100 px-2 position-relative d-flex justify-content-between align-items-center my-3"
                                >
                                  {intl.locale=="ar"?ele?.name:(ele?.nameEn || "Item Name")}{" "}
                                  
                                  <SubClassification3Actions
                                    parentId={parentId}
                                    id={ele?.id}
                                  />
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {mainClassificationTreeStatus == "loading" ? (
        <></>
      ) : (
        <div>{renderCategories(serviceCatalogs)}</div>
      )}
    </>
  );
};
