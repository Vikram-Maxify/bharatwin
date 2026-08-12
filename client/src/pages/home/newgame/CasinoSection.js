import React, { useState, useRef, useCallback, useEffect } from "react";


// White icon imports
import whiteIcon1 from "../../../assets/NewImg/slotsicons/white/evo video icon.png";
import whiteIcon2 from "../../../assets/NewImg/slotsicons/white/DG ICON WHITE.png";
import whiteIcon3 from "../../../assets/NewImg/slotsicons/white/sexy video WHITE.png";


// Black icon imports
import blackIcon1 from "../../../assets/NewImg/slotsicons/black/evo video grey icon.png";
import blackIcon2 from "../../../assets/NewImg/slotsicons/black/DG ICON.png";
import blackIcon3 from "../../../assets/NewImg/slotsicons/black/sexy video.png";
import { BiCategory } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import debounce  from "lodash/debounce";
import { gameListByGameTypeAndProvider } from "../../../store/reducer/spribeGameReducer";
import JilliPopup from "../../../components/JilliPopup";

const slotCategories = [
  {
    name: "EVO_Video",
    whiteIcon: whiteIcon1,
    blackIcon: blackIcon1,
    id: "jili",
    index:2,
    game:"CasinoLive",
  },
  { name: "DG", whiteIcon: whiteIcon2, blackIcon: blackIcon2, id: "cq9",game:"CasinoLive & Slot",index:3 },
  {
    name: "SEXY_Video",
    whiteIcon: whiteIcon3,
    blackIcon: blackIcon3,
    id: "jdb",
    game:"Live Casino",
    index:4
  },
  // { name: "MG_Video", whiteIcon: whiteIcon4, blackIcon: blackIcon4, id: "mg" },
];

const CasinoSection = () => {
  const [activeCategory, setActiveCategory] = useState("jili");

  const categoryRef = useRef();


  const dispatch = useDispatch();

  const [gameId, setGameId] = useState();
  const [gameList,setGameList]=useState([]);
const [page,setPage]=useState(2)

    const [gameType, setGameType] = useState("CasinoLive");


  const handleJilliOpen = (data) => {
    setGameId(data);
   };
  


  const handleCategoryClick = (category,game,index) => {
   setActiveCategory(category);

    setPage(index)

  };

    const fetchGameList = useCallback(
    debounce(() => {
      dispatch(gameListByGameTypeAndProvider({ provider: "evolutionlive",game_type:gameType, page:page, size:8 })).then(
        (res) => {
          if (res?.payload?.data?.data) {
            setGameList(res.payload.data.data);
          }
        }
      );
    }, 300),
    [dispatch, gameType,page]
  );


  

  useEffect(() => {
    fetchGameList();
    return () => fetchGameList.cancel();
  }, [fetchGameList]);


  return (
    <div className=" mt-5  overflow-hidden w-full">
     {gameId && <JilliPopup gameId={gameId} />}

     
      <div className="mb-4">
        <p className="mt-2 flex items-center gap-2 text-base font-semibold ">
          <span>
            <img src="https://i.ibb.co/Myb0CYQW/casino.png" className="size-8" alt="icon" />
          </span>
          Casino Live
        </p>
        <p className="text-whites text-xs mt-1">
          Online real-time game dealers, all verified fair games
        </p>
      </div>

      <div className="slider-container relative ">
        <div
          ref={categoryRef}
          className="flex overflow-x-auto scrollbar-hidden"
        >
          {slotCategories.map((category, index) => (
            <button
              key={index}
              data-id={category.id}
              onClick={() => handleCategoryClick(category.id,category.game,category.index)}
              className={`flex flex-col items-center whitespace-nowrap px-3 py-1 flex-1 rounded ${
                activeCategory === category.id
                  ? "blue-linear2  text-white shadow-lg"
                  : "nav-bg text-gray-700 border-gray-300"
              }`}
            >
              <img
                src={
                  activeCategory === category.id
                    ? category.whiteIcon
                    : category.blackIcon
                }
                alt={`${category.name} icon`}
                className="w-16 h-10 p-2 object-fill "
              />
              <span
                className={` text-sm   ${
                  activeCategory === category.id
                    ? "text-black"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="games-grid mt-6 grid grid-cols-3 gap-2 px-1"
      >
        {gameList&& gameList?.map((game, index) => (
          <div
            key={index}
            className=" rounded-lg shadow-sm hover:shadow-md  h-[200px] transition-shadow "
          >
            <img
            data-origin={game.icon}
              src={game.icon}
              alt={`Game ${game.game_name}`}
              className="w-full h-full rounded-md mb-2 object-fill"
              onClick={() => 
                handleJilliOpen(game.game_uid)
              }
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
  );
};

export default CasinoSection;
