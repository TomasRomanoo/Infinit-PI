import { useSwiper } from "swiper/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex gap-6">
      <button
        onClick={() => {
          swiper.slidePrev();
        }}
        className="text-white bg-tertiary hover:bg-primary transition-all duration-300 ease-in-out px-4 py-2 rounded-full"
      >
        <ArrowBackIcon/>
      </button>
      <button
        onClick={() => {
          swiper.slideNext();
        }}
        className="text-whiteb bg-tertiary hover:bg-primary transition-all duration-300 ease-in-out px-4 py-2 rounded-full"
      >
        <ArrowForwardIcon/>
      </button>
    </div>
  );
};
