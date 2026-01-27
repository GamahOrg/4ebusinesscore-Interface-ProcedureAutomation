import { useIntl } from "react-intl";
import { useNavigate } from 'react-router-dom';

type BrandCardProps = {
  id: string | number;
  categorySymbol?: React.ReactNode;
  count?: string;
  brandImg: React.ReactNode;
  brandTitle: string;
  brandClass?: string;
  onImageError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
};

const BrandCard: React.FC<BrandCardProps> = ({
  id,
  categorySymbol,
  count,
  brandImg,
  brandTitle,
  brandClass = "text-primary fs-6",
  onImageError,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div onClick={() => id && navigate(`/gallery/store-details/${id}`)} className="card store-card border-0 shadow-sm px-4 py-5 rounded-2 cursor-pointer">
      <div className="d-flex align-items-start">
        {count ? (
          <>
            <div className="w-40px h-50px rounded-circle fw-bolder text-primary d-flex align-items-center justify-content-center bg-body">
              {count}
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="mx-auto pt-1">
          <div className="w-100px h-100px bg-light brand-img-container border-radius-50">
            <img
              src={`${brandImg}`}
              alt="brand img"
              className="w-100 h-100 border-radius-50 brand-img"
              onError={onImageError}
            />
          </div>
          <div
            className={`${brandClass} fw-bolder mt-5 d-flex align-items-center justify-content-center brand-title`}
          >
            {brandTitle}
          </div>
        </div>

        {categorySymbol ? (
          <>
            <div className="w-40px h-30px d-flex align-items-center justify-content-center">
              {categorySymbol}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BrandCard;

// Example
{
  /* <BrandCard
   
  count='20'
  brandTitle='نون'
  brandImg={toAbsoluteUrl("/media/temporary-img/noonlogo.png")}
/> */
}
