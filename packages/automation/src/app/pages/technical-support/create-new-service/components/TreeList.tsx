import { FC } from "react";

interface TreeItem {
  name: string;
  children?: Props;
  nameAr?: string;
  id?: string;
}

interface Props {
  setShowHierarchy: (showHierarchy: any) => void;
  showHierarchy: boolean;
  treeName?: string;
  treeData: TreeItem[];
  setSelectedIds?: any;
  setSelectedNames?: any;
}

const TreeList: FC<Props> = ({
  setShowHierarchy,
  showHierarchy,
  treeName,
  treeData,
  setSelectedIds,
  setSelectedNames,
}) => {
  return (
    <div className="tree_main mb-5">
      <ul id="tree1" className="tree list-unstyled">
        <p
          className="bg-light fs-5 py-4 mb-7"
          onClick={() => {
            setShowHierarchy(!showHierarchy);
          }}
        >
          <i className="bi bi-diagram-3 mx-3 fs-1"></i>
          <a className="basic-item" href="#" role="button">
            {treeName}
          </a>
        </p>
        {showHierarchy && (
          <li className="basic-branch branch">
            <ul className="list-unstyled">
              {treeData.map((item) => (
                <li
                  className="branch mb-3"
                  onClick={() => {
                    setShowHierarchy(!item.children?.showHierarchy);
                  }}
                >
                  <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      type="radio"
                      name="treeRadioGroup" // Add the name attribute for the radio group
                      id={`Checkboxes_${item.id}`}
                      onClick={() => {
                        setShowHierarchy(!item.children?.showHierarchy);
                        setSelectedIds(item?.id); // Use an array for radio buttons
                        setSelectedNames(item?.nameAr);
                      }}
                    />
                  </div>
                  <label htmlFor={`Checkboxes_${item.id}`}>{item.nameAr}</label>
                  {item.children && item.children.showHierarchy && (
                    <ul id="tree1" className="tree list-unstyled">
                      {item.children.treeData.map((item) => (
                        <li className="branch mb-3">
                          <div className="d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                            <input
                              className="form-check-input widget-9-check xCheckBg"
                              type="radio"
                              name="treeRadioGroup" // Add the name attribute for the radio group
                              id={`Checkboxes_${item.id}`}
                            />
                          </div>
                          <label htmlFor={`Checkboxes_${item.id}`}>
                            {item.nameAr}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TreeList;
