

import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./invitation.css";
import { useSelector, useDispatch } from "react-redux";
import {
  invitationBonus,
  invitationData,
} from "../../store/reducer/activityReducer";
import icon7 from "../../assets/7icon-01.png";
import wallet from "../../assets/yellow-wallet-01.png";

const ActivityAward = () => {
  const dispatch = useDispatch();
  const { invitationBonusData, invitationBonusDatas } = useSelector(
    (state) => state.activity
  );

  useEffect(() => {
     window.scrollTo(0, 0);
    dispatch(invitationBonus());
    dispatch(invitationData());
  }, [dispatch]);

  const inviteData = invitationBonusDatas?.map((item) => ({
    name: "Slot Betting Bonus",
    image: icon7,
    invite: item.count,
    recharge: item.amount,
    bonus: item.bonus,
    award: "Award Amount",
  }));

  return (
    <>
      {/* Top Nav */}
      <div className="nav-bg p-1 py-3 sticky top-0 z-10">
        <div className="container-section flex justify-between items-center">
          <Link to="/activity">
            <IoIosArrowBack className="text-xl text-white" />
          </Link>
          <h1 className="text-xl text-white text-center">Collection Record</h1>
          <div className="w-5" /> {/* For alignment spacing */}
        </div>
      </div>

      {/* Banner */}
      <div className="invitation-banner bg-gray-100 p-4   ">
        <div className="w-full sm:w-[60%]">
          <h3 className="text-lg font-semibold mb-1">Activity Award</h3>
          <p className="text-sm">Complete weekly/daily tasks to receive rich rewards.</p>
          <p className="text-sm">
            Weekly rewards cannot be accumulated to the next week, and daily rewards cannot be accumulated to the next day.
          </p>
        </div>
      </div>

      {/* Task Cards */}
      <div className="container-section mt-5">
        {inviteData?.map((item, i) => {
          const dataItem = invitationBonusData?.data?.[i] || {};
          const buttonText = dataItem.status === 1 ? "Unfinished" : "Completed";
          const isUnfinished = dataItem.status === 1;

          return (
            <div className="bg-[#011341] rounded-xl shadow mt-4" key={i}>
              {/* Header */}
              <div className="flex justify-between items-center bg-[#011341] pb-4  rounded-t-xl">
                <div className="bg-red-500 text-white w-fit px-3 py-1 rounded-tl-lg rounded-br-lg text-sm font-bold">
                  Weekly Tasks
                </div>
                <p className="text-[#92A8E3] mt-2 mr-2 text-sm">{buttonText}</p>
              </div>

              {/* Task Info */}
              <div className="flex justify-between items-center px-4 py-2 border-t border-blue-950">
                <img src={item.image} alt={item.name} className="w-8 h-8" />
                <span className="text-sm text-[#92A8E3]">{item.name}</span>
                <p className="text-sm font-medium text-red-500">
                  {invitationBonusData?.validDepositsCount || 0} / {item.invite}
                </p>
              </div>

              {/* Award Name */}
              <div className="px-4 py-1 text-xs text-[#92A8E3] border-t border-blue-950">
                {item.name}
              </div>

              {/* Award Details */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-blue-950">
                <span className="text-sm text-[#92A8E3]">{item.award}</span>
                <div className="flex items-center space-x-2">
                  <img src={wallet} alt="wallet" className="w-5 h-5" />
                  <span className="text-red-500 font-medium">₹{item.recharge}</span>
                </div>
              </div>

              {/* Button */}
              <div className="px-4 pb-4 pt-2">
                <button
                  className={`w-full py-2 rounded-3xl font-semibold border ${
                    isUnfinished
                      ? "bg-gray-200 text-gray-500 border-gray-400"
                      : "bg-[#011341] text-[#00ECBE] border-[#00ECBE]"
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ActivityAward;

