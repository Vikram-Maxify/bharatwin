import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Image Imports

// arrow img

// import { BiCategory } from "react-icons/bi";
import JilliPopup from "../../../components/JilliPopup";
const WingoImg = "https://i.ibb.co/hRpgZ6N9/vendorlogo-20240620145936heyd.png";
const K3Img = "https://i.ibb.co/ZQcyY3X/vendorlogo-20240620145952prhc.png";
// const Arrowleft= "https://i.ibb.co/JjPV1sK6/button-2.png";
// const Arrowright= "https://i.ibb.co/93vC5KsZ/button-1.png";
const PVCSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const navigate = useNavigate();
  const [gameId, setGameId] = useState();

  const handleJilliOpen = (data) => {
    setGameId(data);
  };

  const slides = [
    [
      { id: "365", img: WingoImg, route: "#" },
      { id: "v8 POKER", img: K3Img, route: "#" },
      // { id: "5d", img: "", route: "/5d" },
    ],
    // [
    //   { id: "trx", img: "", route: "/trx" },
    //   { id: "original", img: "", route: "#" }, // Placeholder
    // ],
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      {gameId && <JilliPopup gameId={gameId} />}
      <div className=" mt-2 overflow-hidden relative">
        <div className="lottery-game-section">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <p className="mt-2 flex items-center text-gray-200 gap-2 text-base font-semibold ">
                  <span>
                    <img
                      src="https://i.ibb.co/7Nn3hdyq/Chat-GPT-Image-Aug-14-2026-03-05-38-PM.png"
                      className="size-8"
                      alt="icon"
                    />
                  </span>
                  Rummy
                </p>
                <button className="text-blue text-xs bg-[#201D2B] rounded items-center p-1">
                  More 3
                </button>
              </div>
              <p className="text-whites text-[10px] mt-1">
                Exquisite scenes and delicate graphics, play online with friends
              </p>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <Link
                to="/home/AllOnlineGames?game=PVC"
                className="text-[12px] text-black font-bold blue-linear px-1.5 py-1 rounded-md"
              >
                Detail
              </Link>

              <button className="popular-prev rounded-md blue-linear text-black p-1  transition">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button className="popular-next rounded-md blue-linear text-black p-1  transition">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Manual Slider Section */}
          <div className="slider-container mt-0 overflow-hidden">
            {/* Slides */}
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 min-w-full">
                  {slide.map((item, index) => (
                    <div
                      key={index}
                      className="col-span-4"
                      onClick={() => navigate(item.route || "#")}
                    >
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={`${item.id} Game`}
                          loading="lazy"
                          className="w-full h-[200px] object-cover rounded-md"
                          onClick={() => {
                            index === 0 && handleJilliOpen(229);
                            index === 1 && handleJilliOpen(51);
                          }}
                        />
                      ) : (
                        <div className="w-full h-[200px] bg-gray-300 rounded-md flex items-center justify-center">
                          No Image
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Custom card at index six */}
                  {/* <Link
                    className="rounded-lg more-game col-span-4 overflow-hidden flex flex-col justify-between items-center h-[160px]"
                    to={"/home/AllOnlineGames?game=PVC"}
                  >
                    <div className="flex flex-col items-center justify-center py-6">
                      <BiCategory className="size-6 text-whites" />
                      <p className="text-xs font-medium text-whites mt-2">
                        Detail
                      </p>
                    </div>
                    <div className="more-l2 w-full text-center p-3">
                      <p>Rummy</p>
                    </div>
                  </Link> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PVCSection;
