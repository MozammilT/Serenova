import Title from "./Title";

function NewsLetter() {
  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-20 bg-gray-900 text-white">
      <Title
        title="Never Miss a Deal!"
        subtitle="Subscribe to get the latest offers, new arrivals, and exclusive
          discounts"
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <input
          type="text"
          className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-96 w-[330px]"
          placeholder="Enter your email"
        />
        <button className=" group flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">
          Subscribe
          <img
            src="/arrowIcon.svg"
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all invert"
          />
        </button>
      </div>
      <p className="text-gray-500 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
}

export default NewsLetter;
