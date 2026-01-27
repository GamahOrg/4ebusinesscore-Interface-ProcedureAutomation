import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "../../../partials/DeletePopup";
import EditSubItemPopup from "../popup/EditSubItemPopup";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../../../redux/features/item/itemSlice";
import { fetchMainClassificationTree } from "../../../../redux/features/mainClassification/mainClassificationTreeSlice";
import { showSuccessAlert } from "@4eplatform/shared/index";

type ActionProps = {
  id: string;
  parentId?: string | Number | number;
};

export const SubClassification3Actions: FC<ActionProps> = ({
  id,
  parentId,
}) => {
  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(deleteItem(id) as any).then((res: any) => {
      if (res?.payload.statusEnum === 1) {
        setshowDelete(false);
        showSuccessAlert(
          true,
          "DeletedSuccessfully",
          intl
          //  () =>
          // window.location.reload()
        );
        dispatch(fetchMainClassificationTree(parentId as string) as any);
      }
    });
  };
  const intl = useIntl();
  const [showDelete, setshowDelete] = useState<boolean>(false);
  const [showEditSubItem, setshowEditSubItem] = useState<boolean>(false);

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
                className="menu-link fs-6 px-3 text-primary"
                onClick={() => setshowEditSubItem(true)}
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG
                    path={"/media/icons/duotune/general/gen087.svg"}
                    // alt="Edit Icon"
                  />
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
          handleDelete={handleDeleteItem}
        />
      </div>

      {showEditSubItem ? (
        <EditSubItemPopup
          handleClose={() => setshowEditSubItem(false)}
          show={showEditSubItem}
          id={id}
          parentId={parentId as string}
        />
      ) : (
        <></>
      )}
    </>
  );
};
