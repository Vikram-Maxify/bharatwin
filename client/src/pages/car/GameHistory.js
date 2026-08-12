import React, { useState } from 'react'
import EmptyData from '../activity/EmptyData'
import { PiCopySimpleBold } from 'react-icons/pi';
import CopyCopmponent from '../../components/CopyCopmponent';

const GameHistory = ({carGameHistoryData}) => {
    const [details,setDetails]=useState(null)
      const [copyPopup, setCopyPopup] = useState(false);
      const handleDetail = (i) => {
        if (details === i) {
          return setDetails(null);
        }
        setDetails(i);
      };
    
      
        const copyToClipboard = (number) => {
          navigator.clipboard
            .writeText(String(number))
            .then(() => {
              setCopyPopup(true);
              console.log("Copied to clipboard");
              setTimeout(() => {
                setCopyPopup(false);
              }, 1500);
            })
            .catch((err) => {
              console.error("Failed to copy the text: ", err);
            });
        };

  return (
    <>
        {carGameHistoryData?.gameslist == "" && (
                  <div className="mt-5 ">
                    <EmptyData />
                  </div>
                )}
      
                {Array.isArray(carGameHistoryData?.gameslist) &&
                  carGameHistoryData?.gameslist?.map((item, i) => (
                    <div key={i}>
                      <div
                        className="  flex items-center justify-between"
                        onClick={() => handleDetail(i)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`flex justify-center h-10 w-10 items-center text-sm rounded-full mr-2 
                             ${item.bet == "x"
                                ? "bgs-green"
                                : item.bet == "d"
                                  ? "bgs-red-200"
                                  : item.bet == "t"
                                    ? "bgs-violet"
                                    : item.bet == "l"
                                      ? "color-yellow-bg-200"
                                      : item.bet == "n"
                                        ? "bgs-blue-500"
                                        : item.bet == "0"
                                          ? "bg-red-voilet"
                                          : item.bet == "5"
                                            ? "bg-green-voilet"
                                            : item.bet == 1 ||
                                              item.bet == 3 ||
                                              item.bet == 7 ||
                                              item.bet == 9
                                              ? "bg-home-lg"
                                              : "bgs-red-200"
                              }
                              `}
                          >
                            {item.bet == "x"
                              ? "Even"
                              : item.bet == "t"
                                ? "Voilet"
                                : item.bet == "l"
                                  ? "Big"
                                  : item.bet == "n"
                                    ? "Small"
                                    : item.bet == "d"
                                      ? "Odd"
                                      : item.bet}
                          </div>
                          <div>
                            <h3 className="heading-h3 text-white text-md ">
                              {item?.stage}
                            </h3>
                            <p className="fs-sm text-[#9EA2A8]">{item.today}</p>
                          </div>
                        </div>
      
                        {item.status !== 0 && (
                          <div className="flex flex-col items-end">
                            <div
                              className={`border  px-5 py-[2px] rounded-md text-sm  ${item.status === 1
                                ? "color-green border-color-green"
                                : "color-red-200 border-color-red"
                                }`}
                            >
                              {item.status === 1 ? "Succeed" : " Failed"}
                            </div>
                            <p
                              className={`color-red-200  ${item.status === 1 ? "color-green " : "color-red-200"
                                }`}
                            >
                              {item.status === 1
                                ? "+₹" + item.get
                                : "-₹" + item.money}
                            </p>
                          </div>
                        )}
                      </div>
                      <div
                        className={`mt-3 history-details ${details === i ? "active mb-5" : ""
                          }`}
                      >
                        <h2 className="heading-h2 text-white text-lg">Details</h2>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2 rounded-md">
                          <span className=" text-[#9EA2A8] ">Order number</span>
                          <span className=" text-[#9EA2A8] flex item-center">
                            {item.id_product}
                            <PiCopySimpleBold
                              className="mt-[3px]"
                              onClick={() => copyToClipboard(item?.id_product)}
                            />
                          </span>
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2 rounded-md">
                          <span className=" text-[#9EA2A8] ">Period</span>
                          <span className=" text-[#9EA2A8] ">{item.stage}</span>
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className=" text-[#9EA2A8] ">Purchase amount</span>
                          <span className=" text-[#9EA2A8] ">
                            ₹{parseFloat(item.money) + parseFloat(item.fee)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className=" text-[#9EA2A8] ">Quantiy</span>
                          <span className=" text-[#9EA2A8] ">{item.amount}</span>
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className="text-[#9EA2A8] ">Amount after tax</span>
                          <span className="color-red-200 ">₹{item.money}</span>
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className="text-[#9EA2A8] ">Tax</span>
                          <span className="text-[#9EA2A8] ">₹{item.fee}</span>
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className="text-[#9EA2A8] ">Result</span>
                          {item.status !== 0 && (
                            <div className=" flex text-center justify-center  items-center">
                              <span
                                className={`color-red-200 text-base  ${item.result === 0
                                  ? "color-red-voilet"
                                  : item.result === 5
                                    ? "color-green-voilet"
                                    : item.result === 1 ||
                                      item.result === 3 ||
                                      item.result === 7 ||
                                      item.result === 9 ||
                                      item.result == "x"
                                      ? "color-green"
                                      : item.result == "t"
                                        ? "color-voilet"
                                        : "color-red-200"
                                  }`}
                              >
                                {item.result}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className=" flex items-center justify-between  nav-bg p-1 mb-2  rounded-md">
                          <span className="text-[#9EA2A8] ">Select</span>
                          <span className=" text-[#9EA2A8] ms-2">
                            {" "}
                            {item.bet == "x"
                              ? "Even"
                              : item.bet == "t"
                                ? "Voilet"
                                : item.bet == "l"
                                  ? "Big"
                                  : item.bet == "n"
                                    ? "Small"
                                    : item.bet == "d"
                                      ? "Odd"
                                      : item.bet}
                          </span>
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className=" text-[#9EA2A8] ">Status</span>
                          {item.status !== 0 && (
                            <span
                              className={` color-red-200 ${item.status == 1 ? "color-green" : "color-red-200"
                                }`}
                            >
                              {" "}
                              {item.status === 1 ? "Succeed" : " Failed"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className=" text-[#9EA2A8] ">Win/loss</span>
                          {item.status !== 0 && (
                            <span
                              className={` ${item.status === 1 ? "color-green " : "color-red-200"
                                }`}
                            >
                              {item.status === 1
                                ? "+₹" + item.get
                                : "-₹" + item.money}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between nav-bg p-1 mb-2  rounded-md">
                          <span className=" text-[#9EA2A8] ">Order time</span>
                          <span className=" text-[#9EA2A8] ">{item.today}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                      <CopyCopmponent copyPopup={copyPopup} message="Copy successfully" />
    </>
  )
}

export default GameHistory
