import { useEffect, useRef, useState } from "react";

// Black Icons
import blackIcon2 from "../../../assets/NewImg/slotsicons/black/CQ9.png";
import blackIcon5 from "../../../assets/NewImg/slotsicons/black/evo_electronic icon.png";
import blackIcon3 from "../../../assets/NewImg/slotsicons/black/JDB ICON.png";
import blackIcon1 from "../../../assets/NewImg/slotsicons/black/JILI ICON.png";

// White Icons
import whiteIcon2 from "../../../assets/NewImg/slotsicons/white/CQ9 WHITE.png";
import whiteIcon5 from "../../../assets/NewImg/slotsicons/white/EVO ELECTRONIC WHITE ICON.png";
import whiteIcon3 from "../../../assets/NewImg/slotsicons/white/JDB ICON WHITE.png";
import whiteIcon1 from "../../../assets/NewImg/slotsicons/white/JILI ICON WHITE.png";

// import ch1 from "../../../assets/NewImg/c1.png"
// import ch2 from "../../../assets/NewImg/c2.png"

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JilliPopup from "../../../components/JilliPopup";
import RechargePopup from "../../../components/RechargePopup";
import { notification } from "../../../store/reducer/activityReducer";
import CasinoSlider from "../CasinoSlider";
import Fishgameslider from "../Fishgameslider";
import MiniGames from "../MiniGames";
import CasinoLiveGame from "../newgame/CasinoLiveGame";
import CasinoSection from "../newgame/CasinoSection";
import Cq9Game from "../newgame/Cq9Game";
import EVOGame from "../newgame/EVOGame";
import FishingGame from "../newgame/FishingGame";
import JDBGame from "../newgame/JDBGame";
import JilliGame from "../newgame/JilliGame";
import LotterSection from "../newgame/LotterSection";
import MiniGamesPage from "../newgame/MiniGamesPage";
import OriginalGame from "../newgame/OriginalGame";
import SuperJackportGame from "../newgame/SuperJackportGame";
import SlotSlider from "../SlotSlider";
import PVCSection from "./PVCSection";
import SportsComponent from "./SportsComponent";

const lottery = "https://i.ibb.co/mCS1hw9t/L-d9b599f044f44fc10475.png";

const slotCategories = [
  {
    name: "Lottery",
    blackIcon: lottery,
    whiteIcon: lottery,
    id: "lottery",
  },
  {
    name: "Mini Game",
    blackIcon: "https://i.ibb.co/wFZqXRnG/MINI-GAME.png",
    whiteIcon: "https://i.ibb.co/wFZqXRnG/MINI-GAME.png",
    id: "orignal",
  },
  {
    name: "Super Jackpot",
    blackIcon: "https://i.ibb.co/35SV9gdz/SUPER-JACKPOT.png",
    whiteIcon: "https://i.ibb.co/35SV9gdz/SUPER-JACKPOT.png",
    id: "jackpot",
  },
  {
    name: "Slots",
    blackIcon:
      "https://i.ibb.co/7Nn3hdyq/Chat-GPT-Image-Aug-14-2026-03-05-38-PM.png",
    whiteIcon:
      "https://i.ibb.co/7Nn3hdyq/Chat-GPT-Image-Aug-14-2026-03-05-38-PM.png",
    id: "slot",
  },
  {
    name: "Fishing",
    blackIcon: "https://i.ibb.co/JRnd4dfz/f.png",
    whiteIcon: "https://i.ibb.co/JRnd4dfz/f.png",
    id: "fishing",
  },
  {
    name: "Casino",
    blackIcon:
      "https://i.ibb.co/rR8JY3Ys/Chat-GPT-Image-Aug-14-2026-03-17-05-PM.png",
    whiteIcon:
      "https://i.ibb.co/rR8JY3Ys/Chat-GPT-Image-Aug-14-2026-03-17-05-PM.png",
    id: "casino",
  },
  {
    name: "Sports",
    blackIcon: "https://i.ibb.co/C34fRZTP/sports.png",
    whiteIcon: "https://i.ibb.co/C34fRZTP/sports.png",
    id: "sports",
  },
];

const slotCategories2 = [
  { name: "JILI", blackIcon: blackIcon1, whiteIcon: whiteIcon1, id: "jili" },
  { name: "CQ9", blackIcon: blackIcon2, whiteIcon: whiteIcon2, id: "cq9" },
  { name: "JDB", blackIcon: blackIcon3, whiteIcon: whiteIcon3, id: "jdb" },
  {
    name: "EVO_Electronic",
    blackIcon: blackIcon5,
    whiteIcon: whiteIcon5,
    id: "evo_ele",
  },
];

const games = [
  {
    apiKey: "2126c5c458316ba1f2df65b387b60408",
    label: "Game 1",
    image: "https://i.ibb.co/JwrChFMD/chicken-road1.png",
  },
  {
    apiKey: "562b299961b0ec40f252a832453c67b0",
    label: "Game 2",
    image: "https://i.ibb.co/PzgMm55t/chicken-road2.png",
  },
];

const SlotComponents = () => {
  const [gameId, setGameId] = useState("");
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("Lottery");
  const [activeSlotCategory, setActiveSlotCategory] = useState("jili");
  const [alertsuccess, setAlertsuccess] = useState(false);
  const [showAllSections, setShowAllSections] = useState(false);
  const { rechargeList2Data } = useSelector((state) => state.user);
  const [repopup, setRepopup] = useState(false);
  const containerRef = useRef(null);
  const itemRefs = useRef({});
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const contentRef = useRef(null);
  const [soon, setSoon] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowAllSections(category === "lobby");

    // Scroll the selected item into center of scroll container
    const container = containerRef.current;
    const item = itemRefs.current[category];
    if (container && item) {
      // Get container and item dimensions
      const containerWidth = container.offsetWidth;
      const itemWidth = item.offsetWidth;

      // Get item position relative to container
      const itemOffsetLeft = item.offsetLeft;

      // Calculate the target scroll position to center the item
      const targetScroll = itemOffsetLeft - containerWidth / 2 + itemWidth / 2;

      // Calculate the maximum possible scroll position
      const maxScroll = container.scrollWidth - containerWidth;

      // Ensure we don't scroll beyond container boundaries
      const boundedScroll = Math.max(0, Math.min(maxScroll, targetScroll));

      // Perform the scroll
      container.scrollTo({
        left: boundedScroll,
        behavior: "smooth",
      });
    }

    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }

    // Scroll to game section if not lobby
    if (category !== "lobby") {
      const element = document.getElementById(category);
      if (element) {
        const yOffset = -130;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleCheck = (path) => {
    //  Only show popup for "bike"
    if (path === "bike") {
      setSoon(true);
      return;
    }

    if (!userInfo) {
      navigate("/login");
    } else if (!rechargeList2Data || rechargeList2Data.length === 0) {
      setRepopup(true);
    } else {
      navigate(path);
    }
  };

  const handleSlotCategoryClick = (category) => {
    setActiveSlotCategory(category);
  };

  useEffect(() => {
    dispatch(notification());
  }, [dispatch]);

  useEffect(() => {
    handleCategoryClick("lottery");
  }, []);

  const handleJilliOpen = (apiKey) => {
    setGameId(apiKey);
    console.log("Game ID Set:", apiKey);
  };

  return (
    <div className="container-section mt-5 relative">
      {gameId && <JilliPopup gameId={gameId} />}

      <div className="bg-white">
        <div className={`place-bet-popup z-40 ${alertsuccess ? "active" : ""}`}>
          <div className="text-lg">
            {"Need first recharge to Play the Game"}
          </div>
        </div>
      </div>

      <div
        className={`bgs-body overflow-x-auto scrollbar-hide overflow-y-hide z-[2] sticky top-11 pt-4 pb-1 overflow-y-hidden mr-[-3px]`}
      >
        <div className="flex border-none" ref={containerRef}>
          {slotCategories.map((category, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[category.id] = el)}
              onClick={() => handleCategoryClick(category.id)}
              className={`whitespace-nowrap w-full flex-col px-1 rounded text-sm flex items-center gap-1 ${
                activeCategory === category.id
                  ? "opacity-100 text-[#00BFB1]"
                  : "opacity-100 text-gray-500"
              }`}
            >
              <div className="w-20 h-[70px] relative flex justify-center items-center">
                <img
                  src={
                    activeCategory === category.id
                      ? "https://i.ibb.co/99vqgvb1/bga.png"
                      : "https://i.ibb.co/BKStfhn6/bgd.png"
                  }
                  alt="background"
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
                <img
                  src={
                    activeCategory === category.id
                      ? category.whiteIcon
                      : category.blackIcon
                  }
                  alt={category.name}
                  className="w-16 h-16 -top-3 object-contain relative z-10"
                />
              </div>
              <span className="text-[12px] text-center font-bold">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Show all sections when lobby is active */}
        {showAllSections && (
          <>
            <div id="lottery" className="lottery-game-section mt-5">
              <LotterSection />
              <MiniGamesPage />
              <SlotSlider />
              <PVCSection />
              <Fishgameslider />
              <CasinoSlider />
              <SportsComponent />
              <SuperJackportGame />
            </div>
          </>
        )}

        {/* Show only the selected section when not in lobby */}
        {!showAllSections && (
          <>
            {activeCategory === "lottery" && (
              <div className="lottery-game-section mt-5">
                <LotterSection />

                <div className="flex items-center w-full mt-5">
                  {/* Image 1 with label */}
                  <div
                    className="w-1/2 flex flex-col items-center cursor-pointer"
                    onClick={() => handleCheck(games[0].apiKey)}
                  >
                    <img
                      src={games[0].image}
                      alt="Turntable"
                      className="w-full h-auto rounded object-contain"
                    />
                    {/* <span className="mt-2 text-sm font-semibold text-white">checkenRoad1</span> */}
                  </div>

                  {/* Image 2 with label */}
                  <div
                    className="w-1/2 flex flex-col items-center pl-2 cursor-pointer"
                    onClick={() => handleCheck(games[1].apiKey)}
                  >
                    <img
                      src={games[1].image}
                      alt="VIP"
                      className="w-full h-auto rounded object-contain"
                    />
                    {/* <span className="mt-2 text-sm font-semibold text-white">checkenRoad2</span> */}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === "minigame" && (
              <div className="lottery-game-section">
                <MiniGames />
              </div>
            )}

            {activeCategory === "slot" && (
              <>
                <div className="mb-4">
                  <p className="mt-2 flex items-center gap-2 text-base font-semibold">
                    <span>
                      <img
                        src="https://i.ibb.co/7Nn3hdyq/Chat-GPT-Image-Aug-14-2026-03-05-38-PM.png"
                        className="size-8"
                        alt="icon"
                      />
                    </span>
                    Slots
                  </p>
                  <p className="text-whites text-[11px] mt-1">
                    Online real-time game dealers, all verified fair games
                  </p>
                </div>
                <div className="relative overflow-x-auto scrollbar-hide rounded nav-bg">
                  <div ref={categoryRef} className="flex border-none">
                    {slotCategories2.map((category, index) => (
                      <div
                        key={index}
                        data-id={category.id}
                        onClick={() => handleSlotCategoryClick(category.id)}
                        className={`flex flex-col items-center whitespace-nowrap py-2 px-1 rounded ${
                          activeSlotCategory === category.id
                            ? "blue-linear2 text-white shadow-lg"
                            : "nav-bg text-gray-600 border-gray-300"
                        }`}
                      >
                        <div className="w-20 flex flex-col justify-center items-center">
                          <img
                            src={
                              activeSlotCategory === category.id
                                ? category.whiteIcon
                                : category.blackIcon
                            }
                            alt={category.name}
                            className="h-[15px] w-auto object-contain"
                          />
                        </div>
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div ref={contentRef} className="transition-all duration-300">
                    {activeSlotCategory === "jili" && <JilliGame />}
                    {activeSlotCategory === "cq9" && <Cq9Game />}
                    {activeSlotCategory === "jdb" && <JDBGame />}
                    {activeSlotCategory === "evo_ele" && <EVOGame />}
                  </div>
                </div>
              </>
            )}

            {activeCategory === "orignal" && (
              <div className="lottery-game-section">
                <OriginalGame />
              </div>
            )}

            {activeCategory === "fishing" && (
              <div className="lottery-game-section">
                <FishingGame />
              </div>
            )}

            {activeCategory === "casino" && (
              <div className="mt-2">
                <CasinoLiveGame />
                <CasinoSection />
              </div>
            )}

            {activeCategory === "sports" && (
              <div className="mt-2">
                <SportsComponent />
              </div>
            )}

            {activeCategory === "pvc" && (
              <div className="mt-2">
                <PVCSection />
              </div>
            )}

            {activeCategory === "jackpot" && (
              <div className="mt-2">
                <SuperJackportGame />
              </div>
            )}
          </>
        )}
      </div>
      <RechargePopup repopup={repopup} setRepopup={setRepopup} />
    </div>
  );
};

export default SlotComponents;
