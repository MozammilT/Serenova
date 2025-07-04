import Title from "./Title";
import { testimonials } from "../constants/assets";
import Star from "./StarRating";

function Testimonials() {
 
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-15 pb-30">
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
