import React, { useState, useRef, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

import { gameListByProvider } from "../../../store/reducer/spribeGameReducer";

import { useDispatch, useSelector } from "react-redux";
import JilliPopup from "../../../components/JilliPopup";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import RechargePopup from "../../../components/RechargePopup";

// arrow img
const Arrowleft = "https://i.ibb.co/JjPV1sK6/button-2.png";
const Arrowright = "https://i.ibb.co/93vC5KsZ/button-1.png";

const SuperJackportGame = () => {
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState();
  const [gameList, setGameList] = useState([]);
  const [gameType, setGameType] = useState("CasinoLive");
  const [soon, setSoon] = useState(false);
  const [repopup, setRepopup] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { rechargeList2Data } = useSelector((state) => state.user);

  const handleJilliOpen = (data) => {
    setGameId(data);
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

  const fetchGameList = useCallback(
    debounce(() => {
      dispatch(
        gameListByProvider({
          provider: "jili",
          game_type: gameType,
          page: 6,
          size: 9,
        }),
      ).then((res) => {
        if (res?.payload?.data?.data) {
          setGameList(res.payload.data.data);
        }
      });
    }, 300),
    [dispatch, gameType],
  );

  useEffect(() => {
    fetchGameList();
    return () => fetchGameList.cancel();
  }, [fetchGameList]);

  const sliderRef = useRef(null); // Create a ref for the slider

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <>
      {gameId && <JilliPopup gameId={gameId} />}

      <div className="flex items-center justify-between mb-2 flex-wrap">
        <div className="flex items-start ">
          <p className="mt-2 flex items-center text-gray-200 gap-2 text-base font-semibold ">
            <span>
              <img
                src="https://i.ibb.co/3mwK6THM/SUPERJACKPOT.png"
                className="size-8"
                alt="icon"
              />
            </span>
            Super Jackpot
          </p>
        </div>

        <div className="flex gap-2 mt-1 md:mt-0">
          <div className="flex items-center gap-2">
            <button
              className="popular-prev rounded-md blue-linear text-black  p-1  transition"
              onClick={() => sliderRef.current.slickPrev()}
            >
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

            <button
              className="popular-next rounded-md blue-linear text-black  p-1  transition"
              onClick={() => sliderRef.current.slickNext()}
            >
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
      </div>

      <p className="text-white s text-[12px] mb-2">
        When you win a super jackpot, you will receive additional rewards
      </p>

      <p className="text-white s mb-4 text-[12px]">
        Maximum bonus <span className="text-blue-600">₹500.00</span>
      </p>

      <RechargePopup repopup={repopup} setRepopup={setRepopup} />

      <div className="slider-container mt-4">
        <Slider ref={sliderRef} {...settings}>
          {gameList &&
            gameList?.map((game, index) => (
              <div key={index} className="rounded p-1 relative">
                {" "}
                {/* Added padding for spacing */}
                {/* Ensure that multiplier is visible above the image */}
                <div
                  className="absolute top-1 left-1   px-2 py-1  text-sm z-10  bg-gradient-to-r from-pink-500 via-purple-500 to-purple-700 text-white p-6 rounded-lg overflow-hidden" // Added z-10 for visibility
                >
                  {parseFloat((Math.random() * (40 - 20) + 20).toFixed(2))}
                </div>
                <img
                  data-origin={game.icon}
                  src={game.icon}
                  alt={game.game_name}
                  loading="lazy"
                  className="w-full h-[200px] rounded"
                  onClick={() => handleCheck(game.game_uid)}
                />
                <div className="bottom-0 left-0 right-0 bg-gradient-to-t">
                  <h3 className="text-white s text-[10px] whitespace-nowrap overflow-ellipsis object-fill">
                    {game.game_name}
                  </h3>
                  <p className="text-[#0F9957] text-[10px]">₹100</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default SuperJackportGame;
