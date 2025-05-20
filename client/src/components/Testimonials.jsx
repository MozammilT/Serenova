import Title from "./Title";
import { testimonials } from "../constants/assets";
import Star from "./StarRating";

function Testimonials() {
  // const Star = ({ filled }) => (
  //     <svg className="w-4 h-4 text-yellow-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
  //         <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
  //     </svg>
  // );
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-15 pb-30">
      <Title
        title="What Our Guests Say"
        subtitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl tracking-wide">
                  {testimonial.name}
                </p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <Star rating={testimonial.rating} />
            </div>
            <p className="text-gray-500 max-w-90 mt-4">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
