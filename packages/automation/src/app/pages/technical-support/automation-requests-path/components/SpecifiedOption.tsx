import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";

interface Iprop {
  specialized: any[];
  setSelectedIds?: any;
  setSelectedNames?: any;
  arrayIndex?: any;
  setDestination?: any;
  searchTermForSpecified?: any;
}

const SpecifiedOption: FC<Iprop> = ({
  specialized,
  setSelectedIds,
  setSelectedNames,
  arrayIndex,
  setDestination,
  searchTermForSpecified,
}) => {
  const intl = useIntl();

  let [searchedItems, setSearchedItems] = useState<any>([]);
  useEffect(() => {
    if (searchTermForSpecified) {
      setSearchedItems(
        [
          {
            cssClasses: null,
            id: "2e552f8a-7b3c-4b56-a4d8-38086bd6c840",
            nameAr: "المدير المباشر",
            nameEn: "Direct Manager",
          },
        ]
          .concat(specialized)
          .concat(
            {
              cssClasses: null,
              id: "2e662f8a-8b3c-4b56-a4d8-38086bd6c840",
              nameAr: "مدير المشروع",
              nameEn: "Project Manger",
            },
            {
              cssClasses: null,
              id: "2e772f8a-1b3c-3b56-a4d8-38086bd6c840",
              nameAr: "مالك المشروع",
              nameEn: "Project Sponser",
            }
          )
          ?.filter((ele) => {
            return ele?.nameAr?.includes(searchTermForSpecified);
          })
      );
    } else {
      setSearchedItems(
        [
          {
            cssClasses: null,
            id: "2e552f8a-7b3c-4b56-a4d8-38086bd6c840",
            nameAr: "المدير المباشر",
            nameEn: "Direct Manager",
          },
        ]
          .concat(specialized)
          .concat(
            {
              cssClasses: null,
              id: "2e662f8a-8b3c-4b56-a4d8-38086bd6c840",
              nameAr: "مدير المشروع",
              nameEn: "Project Manger",
            },
            {
              cssClasses: null,
              id: "2e772f8a-1b3c-3b56-a4d8-38086bd6c840",
              nameAr: "مالك المشروع",
              nameEn: "Project Sponser",
            }
          )
      );
    }
  }, [searchTermForSpecified, specialized]);

  return (
    <div className="row ">
      {searchedItems?.map((item: any) => (
        <div className="col-12 col-sm-4 my-5">
          <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              id={`Checkboxes_${item?.id}`}
              onClick={() => {
                setSelectedIds(item?.id); // Use an array for radio buttons
                setSelectedNames(item?.nameAr);
                setDestination(item, 3, arrayIndex);
              }}
            />
          </div>
          <label htmlFor={`Checkboxes_${item.id}`}>
            {/* {intl.formatMessage({ id: "Managment" })} {item?.nameAr} */}
            {item?.nameAr != "المدير المباشر" &&
            item?.nameAr != "مدير المشروع" &&
            item?.nameAr != "مالك المشروع"
              ? intl.formatMessage({ id: "Managment" })
              : ""}{" "}
            {item?.nameAr}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SpecifiedOption;
