
import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { BiCategory } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import JilliPopup from '../../../components/JilliPopup';
import { gameListByGameTypeAndProvider } from '../../../store/reducer/spribeGameReducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const RecommendSlider = () => {
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState();
  const [gameList, setGameList] = useState([]);
  const [gameType, setGameType] = useState('CasinoTable');

  const handleJilliOpen = (data) => {
    setGameId(data);
  };

  const fetchGameList = useCallback(
    debounce(() => {
      dispatch(
        gameListByGameTypeAndProvider({
          provider: 'spribe',
          game_type: gameType,
          page: 1,
          size: 9,
        })
      ).then((res) => {
        if (res?.payload?.data?.data) {
          setGameList(res.payload.data.data);
        } else {
          // fallback mock data
          setGameList([
            {
              icon: 'https://via.placeholder.com/150',
              game_name: 'Mock Game 1',
              game_uid: 'mock1',
            },
            {
              icon: 'https://via.placeholder.com/150',
              game_name: 'Mock Game 2',
              game_uid: 'mock2',
            },
          ]);
        }
      });
    }, 300),
    [dispatch, gameType]
  );

  useEffect(() => {
    fetchGameList();
    return () => fetchGameList.cancel();
  }, [fetchGameList]);

  return (
    <>
      {gameId && <JilliPopup gameId={gameId} />}

      <div className="mb-8 mt-8">
        <div className="flex justify-between items-center mb-4">
          {/* <h1 className="text-base font-[400] text-white">minigame</h1> */}
          <img src="https://jalwa.thecodemax.com/static/media/mini-4ae18c6b.19e076c561925c4db3fe030a9f0e38d0.svg" className="h-6" alt="icon" />
          <div className="flex items-center gap-2">
            <Link
              to="/minigames/all"
              className="text-[12px] text-white blue-linear px-1.5 py-1.5 rounded-md"
            >
              Detail
            </Link>
            <button className="popular-prev rounded-md blue-linear text-white p-1 mt-[5px] transition">
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
</button>
<button className="popular-next rounded-md blue-linear text-white p-1 mt-[5px] transition">
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</button>

          </div>
        </div>

        <div className="px-1">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: '.popular-next',
              prevEl: '.popular-prev',
            }}
            autoplay={{ delay: 3000 }}
            spaceBetween={12}
            slidesPerView={3}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {gameList.map((game, index) => (
              <SwiperSlide key={index}>
                <div className="h-[180px]">
                  <div
                    className="h-full flex flex-col border rounded-lg shadow-sm hover:shadow-md bg-white cursor-pointer"
                    onClick={() => handleJilliOpen(game.game_uid)}
                  >
                    <div className="w-full h-[180px] overflow-hidden rounded-lg">
                      <img
                        src={game.icon}
                        alt={game.game_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* <div className="p-2 text-center text-xs font-medium text-gray-700">
                      {game.game_name}
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Detail Button Slide */}
            <SwiperSlide>
              <div className="h-[180px]">
                <Link
                  to="/home/AllOnlineGames"
                  className="h-full rounded-lg overflow-hidden flex flex-col justify-between items-center bg-[#1e1e2f] hover:bg-[#2a2a3a] transition"
                >
                  <div className="flex flex-col items-center justify-center flex-grow w-full">
                    <BiCategory className="text-white text-xl" />
                    <p className="text-xs font-medium text-white mt-2">Detail</p>
                  </div>
                  <div className="w-full text-center p-2 bg-[#2a2a3a]">
                    <p className="text-xs text-white">MG</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RecommendSlider;

