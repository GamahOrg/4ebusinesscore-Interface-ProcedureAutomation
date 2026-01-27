import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "../../../partials/DeletePopup";
import AddSubItemPopup from "../popup/AddSubItemPopup";
import EditSubCategoryPopup from "../popup/EditSubCategoryPopup";
import { Dropdown } from "react-bootstrap";
import { deleteCategory } from "../../../../redux/features/category/categorySlice";
import { useAppDispatch } from "../../../../redux/store/store";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";

type ActionProps = {
  id: string;
  parentId?: number | Number | string;
  serviceCatalogId?: string;
  categoryId?: string;
};

export const SubClassification2Actions: FC<ActionProps> = ({
  id,
  parentId,
  serviceCatalogId,
  categoryId,
}) => {
  const intl = useIntl();
  const [showDelete, setshowDelete] = useState<boolean>(false);
  const [showAddSubCategory, setshowAddSubCategory] = useState<boolean>(false);
  const [showEditSubCategory, setshowEditSubCategory] =
    useState<boolean>(false);
  const [showAddSubItem, setshowAddSubItem] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const result = await dispatch(deleteCategory(id));

    if (result?.payload.statusEnum === 1) {
      dispatch(fetchMainClassificationTree(parentId as string) as any);
      setshowDelete(false);
      showSuccessAlert(
        true,
        "DeletedSuccessfully",
        intl
        //  () =>
        // window.location.reload()
      );
    }
  };

  return (
    <>
      <div className="d-flex w-fit">
        <button
          className="btn btn-sm border border-3 btn-icon btn-light fs-2 text-muted d-flex"
          type="button"
        >
          <i className="fa-solid fa-users"></i>{" "}
        </button>
        <Dropdown>
          <Dropdown.Toggle
            id={`org-actions-${id}`}
            variant="light"
            className="btn-sm btn-icon border border-3 btn-light fs-2 text-muted d-flex"
          >
            <i className="bi bi-three-dots fs-2"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="fw-bold w-200px py-3"
            aria-labelledby={`org-actions-${id}`}
          >
            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-success"
                onClick={() => setshowAddSubItem(true)}
              >
                <i className="bi bi-plus-lg fs-4 mx-1"></i>
                {intl.formatMessage({ id: "AddSubItem" })}
              </span>
            </Dropdown.Item>

            {/* <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link px-3 fs-6 text-muted"
                onClick={() => setshowAddSubCategory(true)}
              >
                <i className="bi bi-plus-lg fs-3 mx-1"></i>{" "}
                {intl.formatMessage({ id: "AddSub2Category" })}
              </span>
            </Dropdown.Item> */}

            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-primary"
                onClick={() => setshowEditSubCategory(true)}
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Edit" })}
              </span>
            </Dropdown.Item>

            <Dropdown.Item className="menu-item px-3">
              <span
                className="menu-link fs-6 px-3 text-danger"
                onClick={() => setshowDelete(true)}
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Delete" })}
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="modal fade" id="rega_modal_Delete" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={() => setshowDelete(false)}
          showDelete={showDelete}
          id={id}
          handleDelete={handleDelete}
        />
      </div>

      {/* <AddSub2CategoryPopup
        handleClose={() => setshowAddSubCategory(false)}
        show={showAddSubCategory}    
        parentId={categoryId} 
        serviceCategoryId={serviceCatalogId}   
      /> */}
      {showAddSubItem ? (
        <AddSubItemPopup
          handleClose={() => setshowAddSubItem(false)}
          show={showAddSubItem}
          categoryId={categoryId}
          parentId={parentId}
        />
      ) : (
        <></>
      )}

      <EditSubCategoryPopup
        handleClose={() => setshowEditSubCategory(false)}
        show={showEditSubCategory}
        id={id}
        parentId={parentId as string}
        serviceCatalogId={serviceCatalogId}
      />
    </>
  );
};
