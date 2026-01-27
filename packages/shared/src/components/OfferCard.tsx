import { useState } from "react";
import { useIntl } from "react-intl";
import OfferDetailsPopup from "./../../../strategic-communication/src/app/pages/gallery/popups/OfferDetailsPopup";

type OfferCardProps = {
  discountLabel: string;
  discountValue: string;
  brandTitle: string;
  brandImg: string;
  brandSymbol: React.ReactNode;
  discountClass?: string;
  brandClass?: string;
  promoOnProduct?: boolean;
  offerId: string;
  onImageError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

const OfferCard: React.FC<OfferCardProps> = ({
  discountLabel,
  discountValue,
  brandTitle,
  brandImg,
  brandSymbol,
  discountClass = "text-primary fs-6",
  brandClass = "text-primary fs-7",
  promoOnProduct,
  offerId,
  onImageError,
}) => {
  const intl = useIntl();
  const [OfferModalPopup, setOfferModalPopup] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setOfferModalPopup(true)}
        className="card offers-bg px-4 py-5 rounded-2 cursor-pointer"
      >
        <div className="d-flex gap-3">
          <div className="d-flex flex-column gap-1 w-100">
            <div className="d-flex align-items-start gap-4 mb-6">
              <div className="mt-1 text-primary">{promoOnProduct && typeof brandSymbol === 'string' ? <img src={brandSymbol} alt={brandTitle} /> : brandSymbol}</div>
              <div className="d-flex justify-content-between align-items-start gap-1 w-100">
                <div className="flex-grow-1">
                  <div className={`${discountClass} fw-bolder`}>
                    {discountLabel}
                  </div>
                </div>
                {discountValue && (
                  <div className="position-relative mt-1">
                    <span className="position-absolute top-50 translate-middle-y z-10 text-white mx-1">
                      {discountValue}
                    </span>
                    <svg
                      width="52"
                      height="28"
                      viewBox="0 0 52 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform={intl?.locale == "ar" ? "" : "scale(-1,1) translate(0,0)"}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.70524 7.77647L11.1338 1.77647C12.557 0.626994 14.3311 0 16.1605 0H43.9999C48.4182 0 51.9999 3.58172 51.9999 8V20C51.9999 24.4183 48.4182 28 43.9999 28H16.1605C14.3311 28 12.557 27.373 11.1338 26.2235L3.70524 20.2235C-0.259167 17.0215 -0.259167 10.9785 3.70524 7.77647ZM8.99992 18C11.2091 18 12.9999 16.2091 12.9999 14C12.9999 11.7909 11.2091 10 8.99992 10C6.79078 10 4.99992 11.7909 4.99992 14C4.99992 16.2091 6.79078 18 8.99992 18Z"
                        fill="#F14141"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 flex-grow-1">
              <img src={brandImg} alt={brandTitle} className="w-25px h-25px" onError={onImageError} />
              <div className={`${brandClass} fw-bolder`}>{brandTitle}</div>
            </div>
          </div>
        </div>
      </div>
      {OfferModalPopup ? (
        <>
          <OfferDetailsPopup
            handleClose={() => setOfferModalPopup(false)}
            show={OfferModalPopup}
            promoOnProduct={promoOnProduct}
            offerId={offerId}
            
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default OfferCard;
