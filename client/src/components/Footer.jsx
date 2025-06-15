import { toast } from "react-hot-toast";
import { useState } from "react";

function Footer() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "3f1754c4-75bd-47bf-b525-bb23beeea030");

    const submisson = async () => {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        event.target.reset();
        return data;
      } else {
        console.log("Error", data);
      }
    };

    toast.promise(
      submisson,
      {
        loading: "Sending...",
        success: "Form Submitted Successfully",
        error: (err) => `Submittion failed: ${err.message}`,
      },
      {
        position: "bottom-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  return (
    <div className="text-gray-500/80 pt-30 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <div className="flex gap-2 items-center justify-start mb-5">
            <img
              src="/favicon.svg"
              alt="logo"
              className="h-9 invert opacity-80"
            />
            <p className="text-3xl text-white tracking-tight text-balance invert opacity-80">
              Serenova
            </p>
          </div>
          <p className="text-sm">
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private islands.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img
              src="/instagramIcon.svg"
              alt="instagram-icon"
              className="w-6"
            />
            <img src="/facebookIcon.svg" alt="facebook-icon" className="w-6" />
            <img src="/twitterIcon.svg" alt="twitter-icon" className="w-6" />
            <img src="/linkendinIcon.svg" alt="linkedin-icon" className="w-6" />
          </div>
        </div>

        <div>
          <p className="text-xl text-gray-800 font-playfair">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Partners</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl text-gray-800 font-playfair">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Safety Information</a>
            </li>
            <li>
              <a href="#">Cancellation Options</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Accessibility</a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-xl text-gray-800 font-playfair">HELP US IMPROVE</p>
          <p className="mt-3 text-sm">
            Got ideas? Tell us what you'd love to see next on Serenova.
          </p>
          <div>
            <form className="flex items-center mt-4" onSubmit={onSubmit}>
              <input
                required
                name="message"
                type="text"
                className="bg-slate-100/20 rounded-l border border-gray-300 h-9 px-3 outline-none text-gray-500"
                placeholder="Share your thoughts..."
              />
              <button className=" group flex items-center justify-center bg-black h-9 w-10 aspect-square rounded-r">
                <img
                  src="/arrowIcon.svg"
                  alt="arrow-icon"
                  className="group-hover:translate-x-1 transition-all invert"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Serenova. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
