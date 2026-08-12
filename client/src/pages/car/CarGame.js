import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  IoIosArrowBack,
  IoIosArrowDropright,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from "react-icons/io";
import { Link } from "react-router-dom";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import io from "socket.io-client";

import Audio1 from "../../assets/audio/di1.mp3";
import Audio2 from "../../assets/audio/di2.mp3";
import { PiCopySimpleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../store/reducer/authReducer";
import CopyCopmponent from "../../components/CopyCopmponent";
import {
  carGameHistory,
  carGamePeriodList,
} from "../../store/reducer/gameReducer";
import { carGameBet } from "../../store/reducer/betReducer";

import { debounce } from "lodash";
import { host } from "../../store/reducer/api";
import EmptyData from "../activity/EmptyData";

import bgimg from "../../assets/CarGame/top_header.png";
//car game
import { motion } from "framer-motion";
//import bike game
import { AiFillSound } from "react-icons/ai";
import { AiFillMuted } from "react-icons/ai";
//background image
import WinningPopup from "../../components/WinningPopup";
import { ballData, ImgData, ballImages, carImages, winnerImages, WinnerPlaceImage1, WinnerPlaceImage2, WinnerPlaceImage3, imgData, bikeData, winbikecolorimg } from "./bikeImage";
import GameHistory from "./GameHistory";

const bg = "https://i.ibb.co/tw2DqZNz/motogamebg6.png";


const redLight = "https://i.ibb.co/v4P6X2nm/light3.png";
const yellowLight = "https://i.ibb.co/NgjtBzTS/light2.png";
const greenLight = "https://i.ibb.co/R5zpHLV/light1.png";





const xData = [1, 5, 10, 20, 50, 100];
const socket = io(host);
// Add these image imports at the top of your file
const CarGame = () => {

  const [activeLight, setActiveLight] = useState("red");

  useEffect(() => {
    const cycleLights = setInterval(() => {
      setActiveLight((prev) =>
        prev === "red" ? "yellow" : prev === "yellow" ? "green" : "red"
      );
    }, 2000); // Change lights every 2 seconds

    return () => clearInterval(cycleLights);
  }, []);

  const { successMessage, carGameHistoryData, carGamePeriodListData } =
    useSelector((state) => state.game);
  const { loader } = useSelector((state) => state.bet);
  const [messages, setMessage] = useState("");
  const [activeTime, setActiveTime] = useState("1");
  const [activeX, setActiveX] = useState(0);
  const [gameHistory, setGameHistory] = useState("ghistory");
  const [openPopup, setOpenPopup] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openHowtoPlay, setHowtoPlay] = useState(false);
  const [details, setDetails] = useState(null);
  const [refershPopup, setRefeshPopup] = useState(false);
  const [pageno, setPage] = useState(1);
  const [pageto, setPageto] = useState(10);
  const [typeid1, setTypeid1] = useState(1);
  const [minutetime1, setMinutetime1] = useState(0);
  const [minutetime2, setMinutetime2] = useState(0);
  const [secondtime1, setSecondtime1] = useState(0);
  const [secondtime2, setSecondtime2] = useState(0);
  const intervalRef = useRef(null);
  const [betAlert, setBetAlert] = useState(false);
  const [historyPage, setHistoryPage] = useState(0);
  const [activeVoice, setActiveVoice] = useState(true);
  const dispatch = useDispatch();
  const [winResult, setWinResult] = useState(null);
  const [resultPopup, setResultPopup] = useState(false);
  const [copyPopup, setCopyPopup] = useState(false);
  const [activePoint, setActivePoint] = useState(1);

  const [historySection, setHistorySection] = useState(null);
  const [bethistory, setBetHistory] = useState(null);

  const [running, setRunning] = useState(false);
  const [stoprunning, setStopRunning] = useState(false);
  const [selectBet, setSelectBet] = useState("");
  const selectBetHandle = async (data) => {

    if (secondtime1 >= 4 && secondtime2 >= 0) {
      setBetAlert(true);
      setMessage("Bike is running");
      setTimeout(() => {
        setMessage("");
        setBetAlert(false)
      }, 3000);
      return
    }
    setSelectBet(data);
    setTimeout(() => {
      setOpenPopup(true);
    }, 100);
  };
  const [animate, setAnimate] = useState(false);


  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [balance, setBalance] = useState(1);
  const [multiplier, setMultiplier] = useState(1);

  const balanceOptions = [1, 10, 100, 1000];

  const totalAmount = balance * multiplier;

  const handleVoice = () => {
    const newVoiceState = !activeVoice;
    setActiveVoice(newVoiceState);
    localStorage.setItem("voice", newVoiceState);
  };




  useEffect(() => {


    if (typeid1 !== null) {
    

      openAudio();
    }

    const voiceState = localStorage.getItem("voice");
    if (voiceState !== null) {
      setActiveVoice(JSON.parse(voiceState));
    }

    if (openPopup) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeTime, openPopup]);

  const audio1Ref = useRef(new Audio(Audio1));
  const audio2Ref = useRef(new Audio(Audio2));

  const openAudio = () => {
    audio1Ref.current.muted = true;
    audio1Ref.current.play().catch((error) => {
      console.error("Error playing audio1:", error);
    });
    audio2Ref.current.muted = true;
    audio2Ref.current.play().catch((error) => {
      console.error("Error playing audio2:", error);
    });
  };

  const playAudio1 = () => {
    audio1Ref.current.muted = true;
    audio1Ref.current.play().catch((error) => {
      console.error("Error playing audio1:", error);
    });
  };

  const playAudio2 = () => {
    audio2Ref.current.muted = true;
    audio2Ref.current.play().catch((error) => {
      console.error("Error playing audio2:", error);
    });
  };

  const [cars, setCars] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      position: 95,
      speed: Math.random() * 1 + 1,
      running: false,
    }))
  );


  const handleRefersh = () => {
    dispatch(userDetail()).then((res) => {
      if (res.payload.status) {
        setRefeshPopup(true);
      }
    });
    setTimeout(() => {
      setRefeshPopup(false);
    }, 2000);
  };


  const fetchNewData = async (pageno, pageto) => {
    await dispatch(carGamePeriodList({ typeid1, pageno, pageto }))
    await dispatch(carGameHistory({ typeid1, pageno, pageto }));
  };
  const handleIncrease = async () => {
    const newPageNo = pageno + 10;
    const newPageTo = pageto + 10;
    setPage(newPageNo);
    setPageto(newPageTo);
    await fetchNewData(newPageNo, newPageTo);
    dispatch(carGameHistory({ typeid1, pageno, pageto }));
  };

  const handleDecrease = async () => {
    if (pageno >= 10) {
      const newPageNo = pageno - 10;
      const newPageTo = pageto - 10;
      setPage(newPageNo);
      setPageto(newPageTo);
      await fetchNewData2(newPageNo, newPageTo);
    }
  };

  const fetchNewData2 = async (pageno, pageto) => {
    await dispatch(carGamePeriodList({ typeid1, pageno, pageto }))
    await dispatch(carGameHistory({ typeid1, pageno, pageto }));
  };

  const handleBet = async () => {
    dispatch(
      carGameBet({ typeid1, activePoint, selectBet, balance, multiplier })
    ).then((res) => {
      setBetAlert(true);
      dispatch(userDetail());
      setOpenPopup(false);
      setMessage(res.payload.message);
      setBalance(1);
      setMultiplier(1);
      setActiveX(0);

      setTimeout(() => {
        setMessage("");
      }, 3000);

      if (res.payload.status) {
        dispatch(carGameHistory({ typeid1, pageno, pageto }));
      }
    });
  };

  const debouncedDispatch = useCallback(
    debounce((dispatch, typeid1, pageno, pageto) => {
      dispatch(carGamePeriodList({ typeid1, pageno, pageto })).then((res)=>{
    
      })
    }, 500),
    [dispatch, typeid1]
  );


  const debouncedDispatchHistory = useCallback(
    debounce((dispatch, typeid1, pageno, pageto) => {
      dispatch(carGameHistory({ typeid1, pageno, pageto })).then((res) => {
        setHistoryPage(res?.payload?.page);
      });
    }, 500),
    [dispatch, typeid1]
  );

  const debouncedDispatchResult = useCallback(
    debounce((dispatch, typeid1, pageno, pageto) => {
      dispatch(carGameHistory({ typeid1, pageno, pageto })).then((res) => {
        if (res?.payload.data?.gameslist[0]?.status == 1) {
          dispatch(userDetail());
          setWinResult(true);
        } else {
          setWinResult(false);
        }
            setTimeout(() => {
            handleClose()
          }, 5000);
      });
    }, 500),
    [dispatch, typeid1]
  );

  useEffect(()=>{
      debouncedDispatch(dispatch, typeid1, pageno, pageto);
      debouncedDispatchHistory(dispatch, typeid1, pageno, pageto)
  },[dispatch])

  useEffect(() => {
  
    setTimeout(() => {
      setRefeshPopup(false);
      setBetAlert(false);
    }, 2000);

    const handler = (msg) => {
      console.log("ddd",msg)
     debouncedDispatch(dispatch, typeid1, pageno, pageto);


    };

    socket.on("data-server-bike", handler);
    return () => {
      socket.off("data-server-bike", handler);
    };
  }, [
    pageno,

    pageto,
    dispatch,
    betAlert,
    messages,
    debouncedDispatchResult,
    resultPopup,
    winResult,
  ]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [gameHistory, openTime, successMessage, carGamePeriodListData?.length]);



  const handleClose = () => {
    setWinResult(null);
    setResultPopup(false);
  };



  const [winners, setWinners] = useState([]);
  const [colorTab, setColorTab] = useState([]);
  // console.log("winner", winners);

  const [activeImage, setActiveImage] = useState(false);
  const [periodId, setPeriodId] = useState(Date.now());
  const [possibleWinners, setPossibleWinners] = useState([]);

  // Listen for winner data updates
  useEffect(() => {
    if (carGamePeriodListData?.data?.gameslist[0]?.amount) {
      const winners = carGamePeriodListData?.data?.gameslist[0].amount
        .split(",")
        .map((num) => {
          const parsedNum = Number(num);
          // If the parsed number is 0, replace it with 10
          return parsedNum === 0 ? 10 : parsedNum;
        });
      setPossibleWinners(winners);

      // Update car speeds if race is already running
      if (running) {
        setCars((prevCars) =>
          prevCars.map((car) => {
            const winnerIndex = winners.indexOf(car.id);
            let speed;

            if (winnerIndex === 0) {
              speed = Math.random() * 0.9 + 5;
            } else if (winnerIndex === 1) {
              speed = Math.random() * 0.9 + 4.8;
            } else if (winnerIndex === 2) {
              speed = Math.random() * 0.9 + 4.3;
            } else {
              speed = Math.random() * 0.9 + 3.5;
            }

            return {
              ...car,
              speed,
            };
          })
        );
      }
    }
  }, [carGameHistoryData, running]);



  const startRace = () => {
    setWinners([]);
    setRunning(true);
    setStopRunning(true)
    setPeriodId(Date.now());

    setResultPopup(false);

    // car timing control
    setCars((prevCars) =>
      prevCars.map((car) => ({
        ...car,
        position: 95,
        speed: Math.random() * 0.9 + 5.1,
        running: true,
      }))
    );

    setActiveImage(true);
  };


  const getWinningColorClass = (winnerId) => {
    switch (winnerId) {
      case "red":
        return "bg-red-500/20 shadow-red-500/50";
      case "blue":
        return "bg-blue-500/20 shadow-blue-500/50";
      case "green":
        return "bg-green-500/20 shadow-green-500/50";
      case "yellow":
        return "bg-yellow-500/20 shadow-yellow-500/50";
      // add more as needed
      default:
        return "bg-white/10";
    }
  };

  // Update race logic to handle dynamic speed changes

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setCars((prevCars) => {
          const newCars = prevCars.map((car) => ({
            ...car,
            position: car.position - car.speed,
          }));

          // Check for finished cars and sort by position
          const finishedCars = newCars
            .filter((car) => car.position <= 0)
            .sort((a, b) => {
              if (possibleWinners?.length > 0) {
                return (
                  possibleWinners.indexOf(a.id) - possibleWinners.indexOf(b.id)
                );
              }
              return a.position - b.position;
            });

          setTimeout(() => {
            setColorTab(historySection?.data?.gameslist.slice(0, 1));
          }, 4000);

          if (finishedCars?.length >= 3) {
            setTimeout(() => {
              setWinners(historySection?.data?.gameslist.slice(0, 1));

              setCars((prevCars) =>
                prevCars.map((car) => ({
                  ...car,
                  position: 98,
                  running: false,
                }))
              );

            }, 1000);
            setTimeout(() => {
              setStopRunning(false)
            }, 1000);


            setRunning(false);
            setActiveImage(false);
            clearInterval(interval);
          }

          return newCars;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [running, possibleWinners]);


  useEffect(() => {
    setHistorySection(carGamePeriodListData);
    if (!running && winners?.length > 0) {
      setHistorySection(carGamePeriodListData);
      setBetHistory(carGameHistoryData);
      setTimeout(() => {
        if (carGamePeriodListData?.data?.gameslist[0]?.period == carGameHistoryData?.gameslist[0]?.stage &&
          carGameHistoryData?.gameslist[0]?.stage !== undefined &&
          running == false
        ) {
          debouncedDispatchResult(dispatch, typeid1, pageno, pageto);
          setResultPopup(true);

      
        }
      }, 1000);
    }
  }, [running, winners, carGameHistoryData, carGamePeriodListData]);





  useEffect(() => {
    if (!running && winners?.length > 0) {
      const timeoutId = setTimeout(() => {
        setCars((prevCars) =>
          prevCars.map((car) => ({ ...car, position: 98, running: false }))
        );
        // empty winner and set histry result
        setWinners([]);
        setColorTab([]);

      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [running, winners]);



  const getImageFromNumber = (number) => {
    if (number) {
      return number
        ?.toString()
        ?.split(",")
        .map((num) => imgData[num]);
    } else {
      throw new Error("Input is not a valid number or string");
    }
  };

  // Add new state for shuffled car indices
  const [shuffledIndices, setShuffledIndices] = useState(
    [...Array(10)].map((_, i) => i + 1)
  );

  // Function to shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Set up interval for shuffling during race
  useEffect(() => {
    let shuffleInterval;

    if (running) {
      // Start shuffling when race begins
      shuffleInterval = setInterval(() => {
        setShuffledIndices((prev) => shuffleArray(prev));
      }, 300); // Shuffle every 300ms
    } else {
      // Reset to original order when race ends
      setShuffledIndices([...Array(10)].map((_, i) => i + 1));
    }

    return () => {
      if (shuffleInterval) {
        clearInterval(shuffleInterval);
      }
    };
  }, [running]);

  //toggle mute
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // 🔄 State: Active Bike Index
  const [activeBike, setActiveBike] = useState(0);

  // 🎯 State: Toggle bike info view
  const [showInfo, setShowInfo] = useState(false);

  // 🔁 State: Enable/Disable auto cycling
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // 📦 Refs: List scroll container and bike DOM elements
  const bikeListRef = useRef(null);
  const bikeRefs = useRef([]);

  // 🌐 Page Load/Redirect Status
  const [status, setStatus] = useState("");


  // 📜 Scroll to selected bike
  useEffect(() => {


    if (bikeRefs.current[activeBike] && bikeListRef.current) {
      const bikeElement = bikeRefs.current[activeBike];
      const container = bikeListRef.current;
      const containerHeight = container.clientHeight;
      const bikeTop = bikeElement.offsetTop;
      const bikeHeight = bikeElement.clientHeight;

      const scrollTo = bikeTop - (containerHeight / 2) + (bikeHeight / 2);
      container.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }, [activeBike]);

  // ⏱ Auto Cycle Bike Image + Info
  useEffect(() => {
    let interval;
    if (isAutoCycling) {
      interval = setInterval(() => {
        if (!showInfo) {
          setShowInfo(true);
        } else {
          setShowInfo(false);
          setActiveBike(prev => (prev + 1) % bikeData?.length);
        }
      }, showInfo ? 1000 : 3000); // 1 sec info, 9 sec display
    }
    return () => clearInterval(interval);
  }, [isAutoCycling, showInfo, bikeData?.length]);

  // 🖱 Handle Bike Click
  const handleBikeSelect = (index) => {
    setIsAutoCycling(false);
    setActiveBike(index);
    setShowInfo(false);
    setTimeout(() => {
      setIsAutoCycling(true);
    }, 4000); // Resume auto cycle after 4s
  };





  const sequenceStartedRef = useRef(false);

  useEffect(() => {
    socket.current = io.connect(host);
    const eventName = `timeUpdate_11`;

    socket.current.on(eventName, (data) => {
      if (!data) return;

      const minute = Number(data.minute);
      const second1 = Number(data.secondtime1);
      const second2 = Number(data.secondtime2);

      setMinutetime2(minute);
      setSecondtime1(second1);
      setSecondtime2(second2);

      // Reset sequence flag if time is NOT in race start window
      if (second1 !== 5 || second2 > 9) {
        sequenceStartedRef.current = false;
      }

      // Loading phase
      if (second1 === 4 && second2 <= 5) {
        setStatus("loading");
      }

      // Ready phase
      if ([0, 1, 2, 3].includes(second1) && second2 <= 9) {
        setStatus("ready");
      }

      // === START RACE LOGIC (Only once) ===
      if (second1 === 5 && second2 <= 9 && !sequenceStartedRef.current) {
        sequenceStartedRef.current = true; // Prevent re-trigger
        setStatus("maingame");

        setTimeout(() => {
          startRace();
        }, 1500);
      }
    });

    return () => {
      socket.current.off(eventName);
      socket.current.disconnect();
    };
  }, [typeid1, activeVoice]);


  // console.log(secondtime1, ".", secondtime2);

  //
  const [open, setOpen] = useState(false);

  // console.log("amount", carGamePeriodListData?.data?.gameslist?.[0]?.amount?.split(",")[1]);







  return (
    <div>
      <div className='nav-bg px-1  sticky top-0 z-[999999999]'>
        <div className=" flex  items-center relative py-2">
          <button className=''><Link to={"/"}>  <IoIosArrowBack className='text-xl' /></Link></button>
          <div className='text-center flex justify-center items-center m-auto text-xl font-semibold'>Moto Racing</div>
        </div>
      </div>
      {/* <button onClick={()=>setStatus("loading")}>loading</button>
      <button onClick={()=>setStatus("ready")} className="mx-5">ready</button>
      <button onClick={()=>{startRace();setStatus("maingame")}}>start</button> */}

      <div className="relative ">
        {/* Bike Game time period */}
        <div className="min-h-auto bg-gray-900 text-white">
          {/* loading bike game section */}
          {status === "loading" && (
            <>
              <div className="flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="text-center space-y-4">
                  {/* Spinner or loader graphic */}
                  <div className="absolute top-28 left-36">
                    <img
                      src="https://i.ibb.co/zTG6dhNS/LOADERGIFfinal.gif"
                      alt="Loading..."
                      className="w-16 h-16 mx-auto "
                    />
                  </div>

                  {/* Static image below the loader */}
                  <img
                    src="https://i.ibb.co/nqymN1Lx/bikeloaderimg.jpg"
                    alt="Bike Loader"
                    className="w-full "
                  />
                </div>
              </div>
            </>
          )}
          <div className={openTime ? "overlay-section2 block" : "hidden"}></div>
          {/* ready bike game section */}
          {status === "ready" && (
            <>
              <div className="bike-period-bg pb-2 px-7 text-white flex items-center justify-between">
                <dev className="flex flex-row items-center gap-3">
                  <div className="text-xs">{carGamePeriodListData?.period}</div>
                  <div className="relative flex items-center mr-3 ">
                    <img src="https://i.ibb.co/4wNs8KxX/motogame-time-bg.png" alt="timebgimg" className="" />
                    <div className="absolute left-7 flex flex-col items-center">
                      <p className="text-xs font-bold">Time remaining</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-lg ">
                          {minutetime1}
                        </span>
                        <span className="text-lg ">
                          {minutetime2}
                        </span>
                        <span className="text-lg font-semibold">:</span>
                        <span className="text-lg  ">
                          {secondtime1}
                        </span>
                        <span className="text-lg">
                          {secondtime2}
                        </span>
                      </div>

                    </div>
                  </div>
                </dev>
                <div onClick={toggleMute} className="cursor-pointer text-2xl text-gray-400">
                  {isMuted ? <AiFillMuted /> : <AiFillSound />}
                </div>
              </div>
              {/* 🎮 Bike Display Area */}
              <div
                className="text-white w-full p-2 relative overflow-hidden"
                style={{
                  backgroundImage: 'url("https://i.ibb.co/1YHJQ08f/motogamebgfront.png")',
                  height: '200px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  zIndex: '0',
                }}
              >
                {/* 🚲 Bike Thumbnails List */}
                <div
                  ref={bikeListRef}
                  className="flex flex-col items-center h-[185px] overflow-y-auto scrollbar-hide absolute z-50  w-[50px]"
                >
                  {bikeData.map((bike, index) => (
                    <div
                      key={index}
                      ref={el => bikeRefs.current[index] = el}
                      onClick={() => handleBikeSelect(index)}
                      className={`w-[40px] h-[45px] my-1 flex items-center justify-center cursor-pointer transition-all duration-300
                                          ${activeBike === index
                          ? 'border-2 animate-gradient-border bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%]'
                          : 'border border-gray-500 bg-transparent'
                        }`}
                      style={{ borderRadius: '4px' }}
                    >
                      <img
                        src={bike.img}
                        alt={`Bike ${bike.id}`}
                        className={`h-full w-auto object-contain transition-transform duration-300 ${activeBike === index ? 'scale-110' : 'scale-90'}`}
                      />
                    </div>
                  ))}
                </div>

                {/* 🖼️ Active Bike Image + Info */}
                <div className="h-full ml-[100px] flex flex-col justify-center items-center">
                  <div className={`relative w-[250px] transition-all duration-500 ${showInfo ? 'opacity-0 scale-90 -translate-x-full translate-x-full' : 'opacity-100 scale-100 '}`}>
                    <img
                      src={bikeData[activeBike]?.img1}
                      alt="Active Bike"
                      className="absolute top-4 w-[250px] "
                    />
                  </div>

                  <div className={`relative w-full max-w-[400px] transition-all duration-500 flex items-start  ${showInfo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    {bikeData[activeBike]?.img2 && (
                      <img
                        src={bikeData[activeBike].img2}
                        alt="Bike Detail"
                        className="w-[200px] mb-7 -ml-9"
                      />
                    )}
                    <div className="absolute right-2 w-[120px] h-[150px] bg-white p-1 mt-2">
                      <h3 className="font-bold text-yellow-400 text-center text-sm">{bikeData[activeBike]?.name}</h3>
                      <div className="flex flex-col text-black text-xs ">
                        {/* 1st Winner */}
                        <div className="relative animate-slide-in-left delay-[200ms]">
                          <span className="absolute text-lg ">
                            1st: <span className="font-semibold text-md text-red-500">{bikeData[activeBike]?.timeswin}</span>
                          </span>
                          <img
                            src="https://i.ibb.co/N6fHF5CZ/border-line.png"
                            alt="borderline"
                            className="w-full h-[80%] "
                          />
                        </div>

                        {/* 2nd Winner */}
                        <div className="relative animate-slide-in-left delay-[400ms]">
                          <span className="absolute text-lg ">
                            2nd: <span className="font-semibold text-md text-red-500">{bikeData[activeBike]?.timeswin1}</span>
                          </span>
                          <img
                            src="https://i.ibb.co/N6fHF5CZ/border-line.png"
                            alt="borderline"
                            className="w-full "
                          />
                        </div>

                        {/* 3rd Winner */}
                        <div className="relative animate-slide-in-left delay-[600ms]">
                          <span className="absolute text-lg ">
                            3rd: <span className="font-semibold text-md text-red-500">{bikeData[activeBike]?.timeswin3}</span>
                          </span>
                          <img
                            src="https://i.ibb.co/N6fHF5CZ/border-line.png"
                            alt="borderline"
                            className="w-full "
                          />
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
              {/* history */}
              <div className="w-full p-2 text-white relative" style={{ backgroundImage: `url({https://i.ibb.co/YFggsQnS/Whats-App-Image-2025-07-02-at-12-25.png})` }}>
                {/* Header Bar */}
                <div
                  className="flex items-center justify-between cursor-pointer">
                  <div>{carGamePeriodListData?.data?.gameslist?.[0].period}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span>1st</span>
                      <img src={ImgData[Number(carGamePeriodListData?.data?.gameslist[0]?.amount?.split(",")[0]) - 1]} alt="" className="w-6" />
                    </div>

                    <div className="flex items-center gap-1">
                      <span>2nd</span>
                      {/* <span className="bg-gradient-to-t from-yellow-400 to-orange-400 text-black px-2 py-0.5 rounded-md">
                        {carGamePeriodListData?.data?.gameslist?.[0]?.amount?.split(",")[1])}
                      </span> */}

                      <img src={ImgData[Number(carGamePeriodListData?.data?.gameslist[0]?.amount?.split(",")[1]) - 1]} alt="" className="w-6" />


                    </div>

                    <div className="flex items-center gap-1">
                      <span>3rd</span>
                      <img src={ImgData[Number(carGamePeriodListData?.data?.gameslist[0]?.amount?.split(",")[2]) - 1]} alt="" className="w-6" />

                    </div>

                    <div onClick={() => setOpen(!open)}>
                      <IoMdArrowDropdown className="text-xl" />
                    </div>

                  </div>
                </div>

                {/* Dropdown Content - Absolute Positioned */}
                {open && (
                  <div className="absolute top-full left-0 w-[95%] m-auto right-0  bg-[#201D2B]   p-2 shadow-md z-10">
                    {gameHistory === "ghistory" && (
                      <div >
                        <h3 className="text-center font-semibold">Game history</h3>

                        <div className="grid grid-cols-12 bg-darks rounded-t-md p-1 ">
                          <div className="col-span-4 flex text-center justify-center items-center">
                            <h5 className="heading-h5 text-sm text-black">Period</h5>
                          </div>
                          <div className="col-span-3  flex text-center justify-center items-center">
                            <h5 className="heading-h5 text-sm text-black">1st 2nd 3rd</h5>
                          </div>
                          <div className="col-span-5  flex text-center justify-center items-center">
                            <h5 className="heading-h5 text-sm text-black">Result</h5>
                          </div>

                        </div>

                        <div className="w-full  ">
                          {Array.isArray(historySection?.data?.gameslist) &&
                            historySection?.data?.gameslist.map((item, i) => (
                              <div
                                className="grid grid-cols-12  p-1 py-2 bg-[#201D2B]  border-gray-200"
                                key={i}
                              >
                                {/* Period Number */}
                                <div className="col-span-4 flex text-center justify-center items-center">
                                  <span className="from-sky-200 text-gray-400 relative flex text-base pl-5">
                                    **{item.period.slice(9, 15)}
                                  </span>
                                </div>

                                {/* Image Section */}
                                <div className="col-span-3 flex text-center justify-center items-center">
                                  {getImageFromNumber(item?.amount).map((imgSrc, index) => (
                                    <img
                                      key={index}
                                      src={imgSrc}
                                      alt={`game-img-${index}`}
                                      className="w-5 h-5 mx-1"
                                    />
                                  ))}
                                </div>

                                {/* Classification Section */}
                                <div className="col-span-5 flex text-center justify-center items-center">
                                  {console.log("v", item?.amount)}
                                  {ImgData.map((imgSrc, i) => {
                                    const skipIndexes = item?.amount
                                      ?.split(',')
                                      ?.map(num => parseInt(num.trim()) - 1) || []; // turns "2,7,8" → [2, 7, 8]

                                    if (skipIndexes.includes(i)) return null; // Skip this image

                                    return (
                                      <img
                                        key={i}
                                        src={imgSrc}
                                        alt="game-img"
                                        className="w-5 h-5"
                                      />
                                    );
                                  })}

                                </div>
                              </div>
                            ))}
                        </div>

                        <div className=" p-6 flex items-center justify-center mt-5">
                          {/* Decrease Page Button */}
                          <button
                            className={`rounded-md p-2 mr-4 ${pageto / 10 >= 2 ? "bg-home-lg text-[#9EA2A8]" : "bg-home-lg"
                              }`}
                            disabled={pageto / 10 <= 1}
                            onClick={handleDecrease}
                          >
                            <IoIosArrowBack className="text-lg" />
                          </button>

                          <span className="fs-sm text-[#9EA2A8]">
                            {pageto / 10}/{carGamePeriodListData?.page}
                          </span>

                          {/* Increase Page Button */}
                          <button
                            className={`rounded-md p-2 ms-4 ${carGamePeriodListData?.page > pageto / 10
                              ? "bg-home-lg text-white"
                              : "bg-home-lg"
                              }`}
                            disabled={carGamePeriodListData?.page <= pageto / 10}
                            onClick={handleIncrease}
                          >
                            <IoIosArrowForward className="text-lg" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {/* bike game section */}
          {status === "maingame" && (
            <div>
              {/* Car game section start */}
              <div className=" mx-auto">
                {/* Current Race Participants */}
                <div className="mt-5">
                  <div
                    className="relative bg-black text-white px-3 py-2 flex justify-between items-center overflow-hidden"
                    style={{
                      backgroundImage: `url(${bgimg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="text-[10px] font-bold">
                      Racing {activeTime == "20" ? "30s" : activeTime + "Min"}
                    </div>
                    <div className="flex -space-x-1 flex-wrap justify-center">
                      {winners?.length > 0
                        ? // Show winners after race ends
                        String(winners[0]?.amount)
                          .split(",")
                          .map((winner, index) => (
                            <div key={index} className="relative">
                              <img
                                src={ballImages[winner]}
                                alt={`Winner ${winner}`}
                                className="w-8 h-6 object-contain"
                              />
                            </div>
                          ))
                        : // Show shuffling cars during race
                        shuffledIndices.map((index) => (
                          <img
                            key={index}
                            src={ballImages[index]}
                            alt={`Car ${index}`}
                            className="w-6 h-6 object-contain"
                          />
                        ))}
                    </div>

                    <div className="text-[10px]">
                      Per.{" "}
                      <span className="font-semibold">
                        {carGamePeriodListData?.data?.gameslist?.[0]?.period ||
                          periodId ||
                          "Loading..."}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="sceneryImg"> </div>
                </div>
                {/* Race Track */}
                <div
                  className={`bg-image-cars-games ${activeImage ? "active" : ""
                    } w-full h-[185px] mx-auto text-center`}
                >
                  {!running && winners?.length === 0 && (
                    <div className={`flex justify-center items-center mt-10 absolute inset-0 z-10 pointer-events-none blur-sm mix-blend-screen    blur-md mix-blend-screen ${getWinningColorClass(
                      String(winners[0]?.amount).split(",")[0]
                    )}`}
                    >
                      {minutetime1 === 0 &&
                        minutetime2 === 0 &&
                        secondtime1 === 0 &&
                        secondtime2 >= 5 && (
                          <div className="bg-gray-800 w-32 h-10 rounded-xl shadow-lg flex items-center justify-between p-1 z-[100]">
                            <motion.img
                              src={redLight}
                              alt="Red Light"
                              className="w-7 h-7 rounded-full"
                              style={{
                                filter: `brightness(${activeLight === "red" ? 1 : 0.7
                                  })`,
                              }}
                              animate={{
                                opacity: activeLight === "red" ? 1 : 0.3,
                              }}
                            />


                            <motion.img
                              src={yellowLight}
                              alt="Yellow Light"
                              className="w-7 h-7 rounded-full"
                              style={{
                                filter: `brightness(${activeLight === "yellow" ? 1 : 0.7
                                  })`,
                              }}
                              animate={{
                                opacity: activeLight === "yellow" ? 1 : 0.3,
                              }}
                            />


                            <motion.img
                              src={greenLight}
                              alt="Green Light"
                              className="w-7 h-7 rounded-full"
                              style={{
                                filter: `brightness(${activeLight === "green" ? 1 : 0.7
                                  })`,
                              }}
                              animate={{
                                opacity: activeLight === "green" ? 1 : 0.3,
                              }}
                            />
                          </div>
                        )}
                    </div>
                  )}

                  {winners?.length > 0 && (
                    <>
                      <div
                        className="w-full mx-auto inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
                        style={{
                          backgroundImage: `url(${bg})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          height: "200px",
                        }}
                      >

                        <div className="p-8 rounded-3xl text-center animate-scale-up relative">
                          {/* Badges container - positioned absolutely at the top */}
                          <div className="absolute top-[100px] left-0 right-0 flex justify-center">
                            {String(winners[0]?.amount)
                              .split(",")
                              .map((car, index) => {
                                let badgeSrc = "";
                                if (index === 0) badgeSrc = WinnerPlaceImage1[car];
                                else if (index === 1) badgeSrc = WinnerPlaceImage2[car];
                                else if (index === 2) badgeSrc = WinnerPlaceImage3[car];

                                return (
                                  badgeSrc && (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: -20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.3, duration: 0.5 }}
                                      className="relative"
                                    >
                                      <img
                                        src={badgeSrc.trim()}
                                        alt={`Place ${index + 1}`}
                                        className={`w-12 h-12 ${index === 0 ? "" : index === 1 ? "" : index === 2 ? "" : ""}`}
                                      />
                                    </motion.div>
                                  )
                                );
                              })}
                          </div>

                          {/* Bikes container - positioned below with 100px gap */}
                          <ol className="w-[20rem] flex flex-row items-end justify-center gap-2 mt-[100px]">
                            {String(winners[0]?.amount)
                              .split(",")
                              .map((car, index) => (
                                <motion.div
                                  key={index}
                                  className="flex flex-col items-center"
                                  initial={{ opacity: 0, y: 50 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.5, duration: 0.6 }}
                                >
                                  {/* {console.log("ddd",winnerImages[7])} */}
                                  <motion.img
                                    src={winnerImages[car - 1]}
                                    alt={`Winner Car ${car}`}
                                    className="mx-auto w-32"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.5, duration: 0.6 }}
                                  />
                                </motion.div>
                              ))}
                          </ol>
                        </div>
                      </div>
                    </>

                  )}


                  <div className="relative h-[100%] overflow-hidden">
                    {cars.map((car, index) => (
                      <motion.img
                        key={index}
                        src={carImages[car.id - 1]}
                        alt={`Car ${car.id}`}
                        className="absolute h-6 w-auto z-30"
                        animate={{ left: `${100 - car.position}%` }}  // ✅ Animate from right
                        transition={{ ease: "linear", duration: 0.5 }}
                        style={{ top: `${car.id * 16}px`, }}
                      />
                    ))}

                  </div>

                  {/* End line - moves left too */}

                  <motion.div
                    className="absolute top-16 h-[170px]"
                    animate={{ right: 100 }}
                    transition={{ ease: "linear", duration: 1 }}
                    style={{ transform: "rotate3d(3, 5, 3, 25deg)" }}
                  >

                    {stoprunning && (
                      <div
                        className="relative h-[170px] w-[70px]"
                        style={{
                          transform: "skew(18deg, -15deg)",
                        }}
                      >
                        {colorTab && colorTab[0]?.amount.split(",").map((position, index) => {
                          const topMap = {
                            1: 10,
                            2: 22,
                            3: 37,
                            4: 52,
                            5: 65,
                            6: 80,
                            7: 96,
                            8: 110,
                            9: 125,
                            10: 140,
                          };

                          const top = topMap[position] ?? 0;
                          return (
                            <img
                              key={index}
                              src={winbikecolorimg[position - 1]}
                              alt="colorimg"
                              className={`block absolute`}
                              style={{
                                top: `${top}px`,
                                animation: "pulse 1.5s infinite",
                                height: "12px",
                                width: "100%",
                                transform: "skew(0deg, 1deg)",
                                marginLeft: "9px", // use camelCase instead of `margin`
                              }}
                            />
                          );
                        })}
                      </div>
                    )}

                  </motion.div>


                </div>
              </div>
              {/* history */}
              <div className="w-full p-2 text-white relative" style={{ backgroundImage: `url({https://i.ibb.co/YFggsQnS/Whats-App-Image-2025-07-02-at-12-25.png})` }}>
                {/* Header Bar */}
                <div
                  className="flex items-center justify-between cursor-pointer">
                  <div>{carGamePeriodListData?.data?.gameslist[0]?.period}</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span>1st</span>
                      <span className="bg-gradient-to-t from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-md">
                        {carGamePeriodListData?.data?.gameslist?.[0]?.amount?.split("")[0] || "-"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span>2nd</span>
                      {/* <span className="bg-gradient-to-t from-yellow-400 to-orange-400 text-black px-2 py-0.5 rounded-md">
                        {carGamePeriodListData?.data?.gameslist?.[0]?.amount?.split("")[1] || "-"}
                      </span> */}
                      <span className="bg-gradient-to-t from-yellow-400 to-orange-400 text-black px-2 py-0.5 rounded-md">
                        {carGamePeriodListData?.data?.gameslist?.[0]?.amount?.split(",")[1]}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span>3rd</span>
                      <span className="bg-gradient-to-t from-blue-500 to-cyan-400 text-white px-2 py-0.5 rounded-md">
                        {carGamePeriodListData?.data?.gameslist?.[0]?.amount?.split(",")[2] || "-"}
                      </span>
                    </div>

                    <div onClick={() => setOpen(!open)}>
                      <IoMdArrowDropdown className="text-xl" />
                    </div>

                  </div>
                </div>

                {/* Dropdown Content - Absolute Positioned */}
                {open && (
                  <div className="absolute top-full left-0 w-full bg-gray-400 text-black p-2 shadow-md z-10">
                    {gameHistory === "ghistory" && (
                      <div>
                        <div className="grid grid-cols-12 bg-darks rounded-t-md p-1 ">
                          <div className="col-span-4 flex text-center justify-center">
                            <h5 className="heading-h5 text-sm">Period</h5>
                          </div>
                          <div className="col-span-2 text-center justify-center">
                            <h5 className="heading-h5 text-sm">Result</h5>
                          </div>
                          <div className="col-span-3 text-center justify-center">
                            <h5 className="heading-h5 text-sm">B/S</h5>
                          </div>
                          <div className="col-span-3 text-center justify-center">
                            <h5 className="heading-h5 text-sm">O/E</h5>
                          </div>
                        </div>

                        <div className="w-full  ">
                          {Array.isArray(historySection?.data?.gameslist) &&
                            historySection?.data?.gameslist.map((item, i) => (
                              <div
                                className="grid grid-cols-12 nav-bg p-1 py-4 border-b border-gray-200"
                                key={i}
                              >
                                {/* Period Number */}
                                <div className="col-span-3 flex text-center justify-center items-center">
                                  <span className="from-sky-200 gray-50 relative flex text-xs pl-5">
                                    {item.period}
                                  </span>
                                </div>

                                {/* Image Section */}
                                <div className="col-span-3 flex text-center justify-center items-center pl-6">
                                  {getImageFromNumber(item?.amount).map((imgSrc, index) => (
                                    <img
                                      key={index}
                                      src={imgSrc}
                                      alt={`game-img-${index}`}
                                      className="w-5 h-5 "
                                    />
                                  ))}
                                </div>

                                {/* Classification Section */}
                                <div className="col-span-3 flex text-center justify-center items-center">
                                  {String(item.amount)
                                    .split(",")
                                    .map((letter, index) => (
                                      <span
                                        key={index}
                                        className={`px-1  mx-[3px] fs-sm py-[2px] font-semibold rounded ${letter > 4 ? "car-yellow" : "bgs-blue-500"
                                          }`}
                                      >
                                        {letter > 4 ? "B" : "S"}
                                      </span>
                                    ))}
                                </div>

                                <div className="col-span-3 flex text-center justify-center items-center">
                                  {String(item.amount)
                                    .split(",")
                                    .map((letter, index) => (
                                      <span
                                        key={index}
                                        className={`px-1  mx-[3px] text-[#9EA2A8] fs-sm py-[2px] font-semibold rounded ${letter % 2 === 0 ? "car-green" : "car-red"
                                          }`}
                                      >
                                        {letter % 2 === 0 ? "E" : "O"}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="nav-bg p-6 flex items-center justify-center mt-5">
                          {/* Decrease Page Button */}
                          <button
                            className={`rounded-md p-2 mr-4 ${pageto / 10 >= 2 ? "bg-home-lg text-[#9EA2A8]" : "bg-home-lg"
                              }`}
                            disabled={pageto / 10 <= 1}
                            onClick={handleDecrease}
                          >
                            <IoIosArrowBack className="text-lg text-white" />
                          </button>

                          <span className="fs-sm text-[#9EA2A8]">
                            {pageto / 10}/{carGamePeriodListData?.page}
                          </span>

                          {/* Increase Page Button */}
                          <button
                            className={`rounded-md p-2 ms-4 ${carGamePeriodListData?.page > pageto / 10
                              ? "bg-home-lg text-white"
                              : "bg-home-lg"
                              }`}
                            disabled={carGamePeriodListData?.page <= pageto / 10}
                            onClick={handleIncrease}
                          >
                            <IoIosArrowForward className="text-lg text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative mt-3 px-5 ">
          <div>
            <img src="https://i.ibb.co/LdhvhyYP/moto-bg-c7ba0a1a.png" alt="bike" className="absolute right-5 width-[100%] h-[60px] " />
          </div>
          <h1 className="absolute ml-[20px] top-[35px] font-bold text-xl text-white ">Betting Area</h1>
          <div className="absolute p-2 w-[90%] top-[80px] bg-[#201D2B] rounded-t-3xl"></div>

          <div>
            <img src="https://i.ibb.co/TBzmGK6m/bgyellowbgupdate.png" alt="bgimg" className="h-[90px] w-full rounded-t-3xl "></img>

          </div>

        </div>
        {/* bet period section */}
        <div className="relative">
          <div className="bg-[#201D2B] mx-5 p-5">
            <div className="flex justify-between items-center">
              <button
                className={`text-lg font-medium w-full  ${activePoint == 1
                  ? " text-white font-bold border-b border-red-500 "
                  : "text-gray-500 font-bold "
                  }`}
                onClick={() => setActivePoint(1)}
              >
                1stNumber
              </button>

              <button
                className={`text-lg font-medium w-full mx-2 
            ${activePoint == 2
                    ? "text-white font-bold border-b border-red-500 "
                    : "text-gray-500 font-bold"
                  }`}
                onClick={() => setActivePoint(2)}
              >
                2ndNumber
              </button>

              <button
                className={`text-lg font-medium w-full  
            ${activePoint === 3
                    ? "text-white font-bold border-b border-red-500 "
                    : "text-gray-500 font-bold"
                  }`}
                onClick={() => setActivePoint(3)}
              >
                3rdNumber
              </button>
            </div>
            <p className="text-xs font-medium text-gray-300 mt-0.5">
              Select 1st number{' '}
              <span className="text-red-500 font-semibold">(Odds 9.8X)</span>
            </p>

            <div className=" mt-2 p-2 rounded-lg">
              <div className="grid grid-cols-10 gap-2">
                {ballData.map((item, i) => (
                  <div
                    key={i}
                    className={`col-span-2 ${animate ? "animate-up-down" : ""}`}
                    onClick={() => selectBetHandle(i + 1)}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <img src={item} alt={`Image ${i}`} className="w-[55px] h-[55px] mx-1" />
                  </div>
                ))}
              </div>
            </div>
            {/* Odd Even */}
            <div>
              <div className=" text-white">
                {/* Title */}
                <div className="w-[33%] text-lg font-bold text-white text-start border-b border-red-500">
                  Odd or Even
                </div>

                {/* Instruction */}
                <p className="text-sm text-start mb-3">
                  Select the rank number as odd or even
                </p>

                {/* Betting Grid */}
                <div className="space-y-2">
                  {/* Row: 1st */}
                  <div className="flex items-center justify-between ">
                    <span className="w-12 font-semibold text-white">1st</span>
                    <div className="flex-1 flex justify-around gap-2 w-full">
                      <div onClick={() => { selectBetHandle("d"); setActivePoint(1) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Odd</span>
                        <span className="text-xs">2X</span>
                      </div>
                      <div onClick={() => { selectBetHandle("x"); setActivePoint(1) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Even</span>
                        <span className="text-xs">2X</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: 2nd */}
                  <div className="flex items-center justify-between ">
                    <span className="w-12 font-semibold text-white">2nd</span>
                    <div className="flex-1 flex justify-around gap-2 w-full">
                      <div onClick={() => { selectBetHandle("d"); setActivePoint(2) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Odd</span>
                        <span className="text-xs">2X</span>
                      </div>
                      <div onClick={() => { selectBetHandle("x"); setActivePoint(2) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Even</span>
                        <span className="text-xs">2X</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: 3rd */}
                  <div className="flex items-center justify-between ">
                    <span className="w-12 font-semibold text-white">3rd</span>
                    <div className="flex-1 flex justify-around gap-2 w-full">
                      <div onClick={() => { selectBetHandle("d"); setActivePoint(3) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Odd</span>
                        <span className="text-xs">2X</span>
                      </div>
                      <div onClick={() => { selectBetHandle("x"); setActivePoint(3) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Even</span>
                        <span className="text-xs">2X</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* Big and small */}
            <div className="mt-5">
              <div className=" text-white">
                {/* Title */}
                <div className="w-[33%] text-lg font-bold text-white text-start border-b border-red-500">
                  Big or Small
                </div>

                {/* Instruction */}
                <p className="text-sm text-start mb-3 whitespace-nowrap">
                  Select the rank number as Big or Small (under 6)
                </p>

                {/* Betting Grid */}
                <div className="space-y-2">
                  {/* Row: 1st */}
                  <div className="flex items-center justify-between ">
                    <span className="w-12 font-semibold text-white">1st</span>
                    <div className="flex-1 flex justify-around gap-2 w-full">
                      <div onClick={() => { selectBetHandle("l"); setActivePoint(1) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Big</span>
                        <span className="text-xs">2X</span>
                      </div>
                      <div onClick={() => { selectBetHandle("n"); setActivePoint(1) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Small</span>
                        <span className="text-xs">2X</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: 2nd */}
                  <div className="flex items-center justify-between ">
                    <span className="w-12 font-semibold text-white">2nd</span>
                    <div className="flex-1 flex justify-around gap-2 w-full">
                      <div onClick={() => { selectBetHandle("d"); setActivePoint(2) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Odd</span>
                        <span className="text-xs">2X</span>
                      </div>
                      <div onClick={() => { selectBetHandle("x"); setActivePoint(2) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Even</span>
                        <span className="text-xs">2X</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: 3rd */}
                  <div className="flex items-center justify-between ">
                    <span className="w-12 font-semibold text-white">3rd</span>
                    <div className="flex-1 flex justify-around gap-2 w-full">
                      <div onClick={() => { selectBetHandle("d"); setActivePoint(3) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Odd</span>
                        <span className="text-xs">2X</span>
                      </div>
                      <div onClick={() => { selectBetHandle("x"); setActivePoint(3) }} className="w-[100%] flex flex-col items-center bg-[#4D4D4C] px-4 py-1 rounded-md"
                        style={{ backgroundImage: `url("https://i.ibb.co/pBTB4Wm5/buttonfinal.png")` }}>
                        <span className="text-sm font-medium">Even</span>
                        <span className="text-xs">2X</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* result game history */}
        <div className="relative mt-3 px-5 ">
          <div>
            <img src="https://i.ibb.co/LdhvhyYP/moto-bg-c7ba0a1a.png" alt="bike" className="absolute right-5 width-[100%] h-[60px] " />
          </div>
          <h1 className="absolute ml-[20px] top-[35px] font-bold text-xl text-white ">My history</h1>
          <div className="absolute p-2 w-[90%] top-[80px] bg-[#201D2B] rounded-t-3xl"></div>
          <div>
            <img src="https://i.ibb.co/TBzmGK6m/bgyellowbgupdate.png" alt="bgimg" className="h-[90px] w-full rounded-t-3xl "></img>

          </div>
        </div>
        <div className="bg-[#201D2B] p-2 py-3 mx-5">
          <div className="flex items-end justify-end mb-3">
            <Link className="text-[#9EA2A8] fs-sm border rounded-lg border-color-blue px-3 py-1 text-white flex item-center items-end ">
              Details <IoIosArrowDropright className="mb-[2px] text-white" />
            </Link>
          </div>

          <GameHistory carGameHistoryData={carGameHistoryData} />
          <div className="bg-[#201D2B] p-6 flex items-center justify-center mt-5">
            <button
              className={`rounded-md p-2 mr-4 ${pageto / 10 >= 2 ? "bg-home-lg text-white" : "bg-home-lg"
                } `}
              disabled={pageto / 10 > 1 ? false : true}
              onClick={handleDecrease}
            >
              <Link>
                {" "}
                <IoIosArrowBack className="text-lg " />
              </Link>
            </button>
            <span className="fs-sm text-[#9EA2A8]">
              {pageto / 10}/{historyPage}
            </span>
            <button
              className={`rounded-md p-2 ms-4 ${historyPage ? "bg-home-lg text-white" : "bg-home-lg"
                } `}
              disabled={historyPage > pageto / 10 ? false : true}
              onClick={handleIncrease}
            >
              <Link>
                {" "}
                <IoIosArrowForward className="text-lg" />
              </Link>
            </button>
          </div>
        </div>

      </div>

      <div className={openPopup ? "overlay-section block" : "hidden"}></div>

      {/* popups */}
      <div
        className={`nav-bg  items-center transition ease-in-out delay-150 justify-center z-[50] fixed bottom-0 rounded-t-2xl filter-section w-[24.7rem] ${openPopup ? "flex" : "hidden"
          }`}
      >
        <div className=" rounded-t-2xl  overflow-hidden w-full ">
          <div
            className={`text-center p-2 pb-6 mb-5 popup-select-effect    ${selectBet == "x"
              ? "bgs-green"
              : selectBet == "d"
                ? "bgs-red-200"
                : selectBet == "t"
                  ? "bgs-violet"
                  : selectBet == "l"
                    ? "color-yellow-bg-200"
                    : selectBet == "n"
                      ? "bgs-blue-500"
                      : selectBet == "0"
                        ? "bg-red-voilet"
                        : selectBet == "5"
                          ? "bg-green-voilet"
                          : selectBet == 1 ||
                            selectBet == 3 ||
                            selectBet == 7 ||
                            selectBet == 9
                            ? "bg-home-lg"
                            : "bgs-red-200"

              }`}
          >
            <h2 className="text-md font-semibold">
              Win Go {activeTime == "10" ? "30s" : activeTime + "Min"}
            </h2>
            <button className=" color-yellow-200 rounded-md w-[80%] px-4 py-1 mt-2 nav-bg text-sm text-[#9EA2A8]">
              Select{" "}
              <span>
                {selectBet == "x"
                  ? "Even"
                  : selectBet == "t"
                    ? "Voilet"
                    : selectBet == "l"
                      ? "Big"
                      : selectBet == "n"
                        ? "Small"
                        : selectBet == "d"
                          ? "Odd"
                          : selectBet}
              </span>
            </button>
          </div>
          <div className="px-4 py-3 ">
            <div className="flex justify-between items-center mb-4 text-[#9EA2A8]">
              <span>Balance</span>
              <div className="flex space-x-2">
                {balanceOptions.map((value) => (
                  <button
                    key={value}
                    onClick={() => setBalance(value)}
                    className={`black-2  text-base mx-1 px-2 py-[3px]  rounded-md ${balance === value
                      ? selectBet == "x"
                        ? "bgs-green text-white"
                        : selectBet == "d"
                          ? "bgs-red-200 text-white"
                          : selectBet == "t"
                            ? "bgs-violet text-white"
                            : selectBet == "l"
                              ? "color-yellow-bg-200 text-white"
                              : selectBet == "n"
                                ? "bgs-blue-500 text-white"
                                : selectBet == 1 ||
                                  selectBet == 3 ||
                                  selectBet == 5 ||
                                  selectBet == 7 ||
                                  selectBet == 9
                                  ? "bg-home-lg text-white"
                                  : "bgs-red-200 text-white"
                      : "nav-bg text-white"
                      }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mb-4 text-[#9EA2A8]">
              <span>Quantity</span>
              <div className="flex items-center ">
                <button
                  onClick={() =>
                    setMultiplier(multiplier > 1 ? multiplier - 1 : 1)
                  }
                  className={` text-lg p-[3px] font-bold mx-1 text-white flex items-center justify-center rounded-md 
                      ${selectBet == "x"
                      ? "bgs-green text-white"
                      : selectBet == "d"
                        ? "bgs-red-200 text-white"
                        : selectBet == "t"
                          ? "bgs-violet text-white"
                          : selectBet == "l"
                            ? "color-yellow-bg-200 text-white"
                            : selectBet == "n"
                              ? "bgs-blue-500 text-white"
                              : selectBet == 1 ||
                                selectBet == 3 ||
                                selectBet == 5 ||
                                selectBet == 7 ||
                                selectBet == 9
                                ? "bg-home-lg text-white"
                                : "bgs-red-200 text-white"
                    }
                      `}
                >
                  <FaMinus className="svg-white" />
                </button>
                <input
                  type="number"
                  value={multiplier}
                  className="w-20 text-center  bg-black  outline-none  mx-3"
                  name=""
                  id=""
                  onChange={(e) => setMultiplier(e.target.value)}
                />
                <button
                  onClick={() => setMultiplier(multiplier + 1)}
                  className={` text-lg  p-[3px] font-bold mx-1 text-white flex items-center justify-center rounded-md  
                      ${selectBet == "x"
                      ? "bgs-green text-white"
                      : selectBet == "d"
                        ? "bgs-red-200 text-white"
                        : selectBet == "t"
                          ? "bgs-violet text-white"
                          : selectBet == "l"
                            ? "color-yellow-bg-200 text-white"
                            : selectBet == "n"
                              ? "bgs-blue-500 text-white"
                              : selectBet == 1 ||
                                selectBet == 3 ||
                                selectBet == 5 ||
                                selectBet == 7 ||
                                selectBet == 9
                                ? "bg-home-lg text-white"
                                : "bgs-red-200 text-white"
                    }
                      `}
                >
                  <FaPlus className="svg-white" />
                </button>
              </div>
            </div>

            <div className=" items-center flex justify-end mb-5 ">
              {xData.map((item, i) => (
                <button
                  className={`text-base mx-1 px-2 py-[3px] text-white bg-body   rounded-md ${activeX === i
                    ? selectBet == "x"
                      ? "bgs-green text-white"
                      : selectBet == "d"
                        ? "bgs-red-200 text-white"
                        : selectBet == "t"
                          ? "bgs-violet text-white"
                          : selectBet == "l"
                            ? "color-yellow-bg-200 text-white"
                            : selectBet == "n"
                              ? "bgs-blue-500 text-white"
                              : selectBet == 1 ||
                                selectBet == 3 ||
                                selectBet == 5 ||
                                selectBet == 7 ||
                                selectBet == 9
                                ? "bg-home-lg text-white"
                                : "bgs-red-200 text-white"
                    : "nav-bg black-2"
                    }`}
                  key={i}
                  onClick={() => {
                    setActiveX(i);
                    setMultiplier(item);
                  }}
                >
                  X{item}
                </button>
              ))}
            </div>

            <div className="flex items-center mt-4">
              <label className="flex items-center ">
                <input
                  type="checkbox"
                  className="hidden peer"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center peer-checked:bg-cyan-400">
                  <svg
                    className={`w-4 h-4 text-[#9EA2A8] ${isChecked ? "block" : "hidden"
                      }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8 11.586l6.793-6.793a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-[#9EA2A8] ms-2 mr-2 text-sm cursor-pointer">
                  I agree
                </span>{" "}
                <Link className="color-red-200 fs-sm flex items-center">
                  <MdKeyboardDoubleArrowLeft /> Pre-sale rules{" "}
                  <MdKeyboardDoubleArrowRight />
                </Link>
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="nav-bg black-2 w-[40%] p-2 text-sm font-medium text-white"
              onClick={() => setOpenPopup(false)}
            >
              Cancel
            </button>
            <button
              className={` w-[60%] p-2 text-sm font-medium
                ${selectBet == "x"
                  ? "bgs-green text-white"
                  : selectBet == "d"
                    ? "bgs-red-200 text-white"
                    : selectBet == "t"
                      ? "bgs-violet text-white"
                      : selectBet == "l"
                        ? "color-yellow-bg-200 text-white"
                        : selectBet == "n"
                          ? "bgs-blue-500 text-white"
                          : selectBet == 1 ||
                            selectBet == 3 ||
                            selectBet == 5 ||
                            selectBet == 7 ||
                            selectBet == 9
                            ? "bg-home-lg text-white"
                            : "bgs-red-200 text-white"
                }
                `}
              disabled={loader ? true : false}
              onClick={handleBet}
            >
              Total amount ₹{totalAmount.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      <div className={openHowtoPlay ? "overlay-section block" : "hidden"}></div>

      <div
        className={
          resultPopup && (winResult === true || winResult === false)
            ? "overlay-section block s"
            : "hidden"
        }
        onClick={handleClose}
      ></div>

      {/* result popup */}
      {
        resultPopup && (winResult === true || winResult === false) && (
          <WinningPopup type={winResult} amount={Array.isArray(carGameHistoryData?.gameslist) &&
            carGameHistoryData?.gameslist[0]?.get} result={carGameHistoryData.gameslist[0]?.result} period={Array.isArray(carGamePeriodListData?.data?.gameslist) &&
              carGamePeriodListData?.data?.gameslist[0]?.period} handleClose={handleClose} />
        )
      }

      <div className={`place-bet-popup ${betAlert ? "active" : ""}`}>
        <div className="text-sm">{messages} </div>
      </div>
      <CopyCopmponent copyPopup={refershPopup} message="Refesh successfully" />


    </div >
  );
};

export default CarGame;


