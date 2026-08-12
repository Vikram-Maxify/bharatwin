import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { gameListByProvider } from "../../../store/reducer/spribeGameReducer";

import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import JilliPopup from "../../../components/JilliPopup";
import { Link, useNavigate } from "react-router-dom";
import RechargePopup from "../../../components/RechargePopup";

const OriginalGame = () => {
  const dispatch = useDispatch();

  const [gameId, setGameId] = useState();
  const [gameList, setGameList] = useState([]);
  const [soon, setSoon] = useState(false);
  const [repopup, setRepopup] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { rechargeList2Data } = useSelector((state) => state.user);
  const [gameType, setGameType] = useState("CasinoTable");

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
        gameListByProvider({ provider: "spribe", page: 1, size: 8 }),
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

  return (
    <>
      {gameId && <JilliPopup gameId={gameId} />}

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="mt-2 flex items-center gap-2 text-base font-semibold ">
            <span>
              <img
                src="https://i.ibb.co/1GNw5ScD/original.png"
                className="size-8"
                alt="icon"
              />
            </span>
            Mini Games
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="   text-whites text-[10px] mt-1">
        The games are independently developed by our team, fun, fair, and safe.
      </p>
      <RechargePopup repopup={repopup} setRepopup={setRepopup} />
      {/* Game Grid */}
      <div className="slider-container mt-4">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
          {gameList &&
            gameList?.map((game, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-100  overflow-hidden"
              >
                <img
                  data-origin={game.icon}
                  src={game.icon}
                  alt={game.game_name}
                  loading="lazy"
                  className="w-full h-[150px] object-fill"
                  onClick={() => handleCheck(game.game_uid)}
                />
              </div>
            ))}
          {/* Custom card at index six */}
          <Link
            to={"/home/AllOnlineGames?game=Mini games"}
            className="rounded-lg more-game overflow-hidden flex flex-col justify-between items-center h-[150px]"
          >
            <div className="flex flex-col items-center justify-center py-6">
              <BiCategory className="size-6 text-whites" />
              <p className="text-xs font-medium text-whites mt-2">Detail</p>
            </div>
            <div className="more-l2 w-full text-center p-3">
              <p>Orignal</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OriginalGame;
