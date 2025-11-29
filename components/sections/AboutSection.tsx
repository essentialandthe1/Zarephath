"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPlayCircle, MdClose } from "react-icons/md";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <section id="about" className="bg-white py-5 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <Image
            src="/assets/aboutus-section-img.png"
            alt="About Zarephath"
            width={420}
            height={300}
            className="rounded-lg shadow-lg object-contain"
          />
        </div>

        {/* Right Text */}
        <div>
          <h3 className="text-sm text-green-800 font-bold md:text-4xl mb-6 ">
            About Us
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Rooted in Tradition, <br className="hidden md:block" />
            Driven by Quality
          </h2>
          <p className="text-gray-800 mb-4 leading-relaxed">
            Zarephath Nigeria Ltd is an innovative agribusiness venture focused
            on producing natural, unadulterated food products to promote
            consumer health and wellness. Founded by Pauline Okorie, the company
            is guided by a clear vision: to be a leading African brand known for
            delivering natural, healthy, and preservative-free food products
            that promote wellness and prevent lifestyle-related illnesses, both
            locally and globally.
          </p>
          <p className="text-gray-800 mb-8 leading-relaxed">
            Its mission is equally compelling: to produce, package, and
            distribute high-quality, unadulterated food products sourced from
            sustainable agriculture, ensuring every household, at home and
            abroad, has access to nutritious, safe, and naturally processed
            food.
            {showMore && (
              <>
                {" "}
                <br />
                The Vision of the organization is also supported by an astute
                investor, shareholder, and advisor Mr. Agbetoyin, who believes
                in healthy living and good manufacturing practices.
                <br />
                Operating from Lagos, Nigeria, Zarephath specializes in the
                processing and packaging of unripe plantain flour, red palm oil,
                yellow and white garri from farmers
                who adhere to sustainable agricultural practices.
              </>
            )}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-2 w-full">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition text-sm w-full sm:w-auto text-center"
            >
              {showMore ? "Read Less" : "Read More"}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center font-bold text-[#05c069] hover:scale-105 transition-transform gap-2 text-sm"
            >
              <MdPlayCircle className="w-5 h-5" />
              Watch Video
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300 p-4">
          <div className="relative w-full max-w-3xl max-h-[80vh] flex justify-center items-center">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-red-300"
            >
              <MdClose />
            </button>

            {/* Video */}
            <video
              controls
              autoPlay
              className="w-full h-auto max-w-[800px] max-h-[80vh] rounded-lg shadow-lg object-contain"
            >
              <source src="/videos/about-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
