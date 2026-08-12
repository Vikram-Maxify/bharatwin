import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { gameListByGameTypeAndProvider } from "../../../store/reducer/spribeGameReducer";

import { BiCategory } from "react-icons/bi";
import { useDispatch } from "react-redux";
import JilliPopup from "../../../components/JilliPopup";
import { Link } from "react-router-dom";

const casinoData = [
  {
    img: "https://i.ibb.co/jP7vC8SP/1-11.png",
    id: "8405541014f364b7dc59657aa6892446",
  },
  {
    img: "https://i.ibb.co/YT0B4tF2/1-14.png",
    id: "724eebd5cbe7555b01ed60279cb59e5a",
  },
  {
    img: "https://i.ibb.co/6RVj7jv1/1-2.png",
    id: "9b25f8d744859c6840d16ff6103dc5a6",
  },
  {
    img: "https://i.ibb.co/gMz5qXhv/1-3.png",
    id: "624db9f6b362baf19796f281dfdee1ab",
  },
  {
    img: "https://i.ibb.co/F4wKdzGH/1-16.png",
    id: "1fd20a344c9f147cdef85bbaa7447dcd",
  },
];

const CasinoLiveGame = () => {
  const dispatch = useDispatch();

  const [gameId, setGameId] = useState();
  const [gameList, setGameList] = useState([]);

  const [gameType, setGameType] = useState("CasinoLive");

  const handleJilliOpen = (data) => {
    setGameId(data);
  };

  const fetchGameList = useCallback(
    debounce(() => {
      dispatch(
        gameListByGameTypeAndProvider({
          provider: "evolutionlive",
          game_type: gameType,
          page: 10,
          size: 5,
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
    // window.scrollTo(0, 0);
    fetchGameList();
    return () => fetchGameList.cancel();
  }, [fetchGameList]);

  return (
    <>
      {gameId && <JilliPopup gameId={gameId} />}

      <div className="lottery-game-section">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="mt-2 flex items-center gap-2 text-base font-semibold ">
              <span>
                <img
                  src="https://i.ibb.co/Myb0CYQW/casino.png"
                  className="size-8"
                  alt="icon"
                />
              </span>
              Casino
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="   text-whites text-[10px] mt-1">
          The games are independently developed by our team, fun, fair, and
          safe.
        </p>

        {/* Game Grid */}
        <div className="slider-container mt-4">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
            {casinoData &&
              casinoData?.map((game, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-100 h-[200px] overflow-hidden"
                >
                  <img
                    data-origin={game.img}
                    src={game.img}
                    alt={"loading image"}
                    loading="lazy"
                    className="w-full h-full object-fill"
                    onClick={() => handleJilliOpen(game.id)}
                  />
                </div>
              ))}
            {/* Custom card at index six */}
            <Link
              to={"/home/AllOnlineGames?game=Casino"}
              className="rounded-lg more-game overflow-hidden flex flex-col justify-between items-center h-[200px]"
            >
              <div className="flex flex-col items-center justify-center py-6">
                <BiCategory className="size-6 text-whites" />
                <p className="text-xs font-medium text-whites mt-2">Detail</p>
              </div>
              <div className="more-l2 w-full text-center p-3">
                <p>Casino</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CasinoLiveGame;
