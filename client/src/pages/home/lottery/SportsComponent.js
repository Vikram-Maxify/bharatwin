import React, { useState } from "react";

import JilliPopup from "../../../components/JilliPopup";

const img1 = "https://i.ibb.co/4gDkSFQh/img1.png";
const img3 = "https://i.ibb.co/pvmfQSRy/img2.png";

const slides = [
  [
    { id: 1, name: "Baseball", image: img1 },
    { id: 2, name: "Basketball", image: img3 },
    // Add more items here if needed
  ],
];

const SportsComponent = () => {
  const [gameId, setGameId] = useState();

  const handleJilliOpen = (id) => {
    setGameId(id);
  };

  

  return (
    <div className="container mx-auto text-white">
      {gameId && <JilliPopup gameId={gameId} />}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="mt-2 flex items-center gap-2 text-base font-semibold">
              <span>
                <img
                  src="https://i.ibb.co/KxLBBcsH/sports.png"
                  className="size-8"
                  alt="icon"
                />
              </span>
              Sports
            </p>
            <button className="text-blue text-xs bg-[#201D2B] rounded p-1">
              More 3
            </button>
          </div>
          <p className="text-whites text-[10px] mt-1">
            Latest sports events, rich gameplay
          </p>
        </div>

       
      </div>

      {/* Slider Section */}
      <div className="overflow-hidden mt-1">
        <div
          className="flex transition-transform duration-500"
          
        >
          {slides.map((slide, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 min-w-full">
              {slide.map((sport, idx) => (
                <div
                  key={idx}
                  className="col-span-4"
                  onClick={() => handleJilliOpen(sport.id === 1 ? 229 : 51)}
                >
                  {sport.image ? (
                    <img
                      src={sport.image}
                      alt={sport.name}
                      className="w-full h-[200px] object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-300 rounded-md flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsComponent;
