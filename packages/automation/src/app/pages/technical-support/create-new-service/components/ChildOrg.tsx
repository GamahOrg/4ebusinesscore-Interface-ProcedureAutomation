import { useIntl } from "react-intl";


const ChildOrg = ({
  item,
  orgId,
  handleCollapse,
  handleChildrenChecked,
  handleRadioChange,
  selectedLang,
}: any) => {
  const intl = useIntl();

  



  return (
    <div className="tree_main mb-5" key={item?.id}>
      <ul id="tree1" className="tree list-unstyled">
        <div className="fs-5 py-4 mb-7 d-flex align-items-center">
          {item?.children?.length > 0 &&
            (item?.collapsed ? (
              <i
                className={`fas fa-chevron-${
                  selectedLang === "en" ? "right" : "left"
                } fa-xl text-primary`}
                {...handleCollapse(item, item?.id)}
              ></i>
            ) : (
              <i
                className="fas fa-chevron-down fa-xl text-danger"
                {...handleCollapse(item, item?.id)}
              ></i>
            ))}
          <div className="d-inline mx-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
            <input
              className="form-check-input widget-9-check xCheckBg mt-0"
              type="radio"
              name="item"
              onChange={() => {
                handleChildrenChecked(item, !item?.checked);
                handleRadioChange(item);
              }}
              id={item?.id}
              checked={item?.id === orgId}
            />
          </div>
          <div className="d-inline-block" {...handleCollapse(item, item?.id)}>
            <i className="bi bi-diagram-3 mx-3 fs-1"></i>
            <button className="basic-item bg-transparent border-0">
              {intl.locale =='ar' ? item?.nameAr:item?.nameEn}
            </button>
          </div>
        </div>
        <div className="px-8 mx-4">
          <li
            className={`basic-branch branch accordion-collapse ${
              item?.collapsed ? "collapse" : "show"
            }`}
            id={`flush-main-tree${item?.id}`}
            aria-labelledby={`flush-main-tree${item?.id}`}
            data-bs-parent={`#accordionFlushMainTree${item?.id}`}
          >
            <ul className="list-unstyled">
              {item?.children?.map((child: any) => (
                <ChildOrg
                  key={child?.id}
                  item={child}
                  orgId={orgId}
                  handleCollapse={handleCollapse}
                  handleChildrenChecked={handleChildrenChecked}
                  handleRadioChange={handleRadioChange}
                  selectedLang={selectedLang}
                />
              ))}
            </ul>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default ChildOrg;
