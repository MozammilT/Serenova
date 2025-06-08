import Title from "./Title";
import { exclusiveOffers } from "../constants/assets";

function ExclusiveOffers() {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 py-20">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Title
          title="Exclusive Offers"
          subtitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          align="left"
        />
        <button className="group flex items-center justify-center gap-3.5 font-medium cursor-pointer max-md:mt-12">
          View All Offers
          <img
            src="/arrowIcon.svg"
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              {item.priceOff}% off
            </p>
            <div>
              <p className="text-2xl font-medium font-playfair tracking-wide">
                {item.title}
              </p>
              <p>{item.description}</p>
              <p className="text-xs text-white/70 mt-3">
                Expires {item.expiryDate}
              </p>
            </div>
            <button className="flex items-center gap-3.5 font-medium cursor-pointer mt-4 mb-5">
              Explore More
              <img
                src="/arrowIcon.svg"
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExclusiveOffers;
