import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { vipLevel } from "../../store/reducer/activityReducer"; // Assuming vipLevel fetches the history data
import CustomeNavbar from "../../components/CustomeNavbar"; // Assuming you want a navbar
import Wallet from "../../assets/balance.png"; // Icon for balance
import { RiVipDiamondFill } from "react-icons/ri"; // Icon for VIP diamond

const AllHistoryvip = () => {
  const dispatch = useDispatch();
  const { vipLevelData } = useSelector((state) => state.activity); // Get all VIP history data

  useEffect(() => {
    dispatch(vipLevel()); // Dispatch to fetch all history data
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [dispatch]);

  return (
    <>
      <CustomeNavbar name="All History" /> {/* Navbar for the new page */}

      <div className="container-section nav-bg rounded mt-5">
        {Array.isArray(vipLevelData) && vipLevelData.length > 0 ? (
          vipLevelData.map((item, i) => (
            <div className="border-b mt-2 border-gray-800 p-2" key={i}>
              {item?.details === "Bet" ? (
                <>
                  <div className="flex flex-col items-start justify-between">
                    <h3 className="color-l">Experience Bonus</h3>
                    <p className="fs-sm gray-50">Betting Level</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="fs-sm gray-50">{item?.date}</span>
                    <p className="flex items-center text-green-500 p-[2px] w-auto justify-between px-2 fs-sm rounded-md text-gee">
                      {Math.floor(item?.amount)} EXP
                    </p>
                  </div>
                </>
              ) : item?.details === "0" ? ( // Assuming "0" refers to a successful reception
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-green-500">Successfully received</h3>
                      <p className="fs-sm gray-50">
                        Successfully received VIP {item?.level} reward
                      </p>
                    </div>

                    <p className="flex items-center border border-[#ffd180] p-[2px] w-auto justify-between px-2 fs-sm rounded-md color-yellow-200">
                      <img src={Wallet} alt="" className="w-3 mr-1" />{" "}
                      {item?.amount}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="fs-sm gray-50">{item?.date}</span>
                    <div className="border border-[#21D9CC] rounded-md color-l flex items-center px-4 text-sm mt-1">
                      <RiVipDiamondFill className="color-l mr-1" />
                      <span>0</span> {/* This value might need to be dynamic */}
                    </div>
                  </div>
                </>
              ) : (
                // Fallback for unexpected `details` values
                <div className="flex flex-col items-start justify-between">
                  <h3 className="text-white">Other Activity</h3>
                  <p className="fs-sm gray-50">Details: {item?.details}</p>
                  <p className="fs-sm gray-50">Amount: {item?.amount}</p>
                  <p className="fs-sm gray-50">Date: {item?.date}</p>
                  {item?.level && <p className="fs-sm gray-50">Level: {item?.level}</p>}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400">
            No history data available.
          </div>
        )}
      </div>
    </>
  );
};

export default AllHistoryvip;