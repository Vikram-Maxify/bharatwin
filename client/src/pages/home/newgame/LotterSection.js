import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rechargeList2 } from "../../../store/reducer/userReducer";
import RechargePopup from "../../../components/RechargePopup";
import JilliPopup from "../../../components/JilliPopup";

const LotterSection = () => {
  const navigate = useNavigate();
  const [soon, setSoon] = useState(false);
  const [repopup, setRepopup] = useState(false);
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { rechargeList2Data } = useSelector((state) => state.user);

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

  const handleCloseSoon = () => {
    setSoon(false);
  };

  const handleJilliOpen = (apiKey) => {
    setGameId(apiKey);
  };

  return (
    <>
      {gameId && <JilliPopup gameId={gameId} />}
      {/* Coming Soon Popup */}
      {soon && (
        <div className="fixed inset-0 z-[30] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={handleCloseSoon}
          ></div>

          {/* Popup Box */}
          <div className="z-10 bg-[#000251] text-center p-5 rounded-xl shadow-lg w-full max-w-[380px] sm:max-w-[120px] lg:max-w-[340px]">
            <h3 className="text-lg font-semibold text-white">Alert</h3>
            <p className="text-sm text-white mt-1.5">
              Game will be available soon
            </p>
            <button
              className="bg-[#23C1DB] text-white px-5 py-1.5 mt-4 rounded-full text-sm hover:bg-[#1ab3c7] transition"
              onClick={handleCloseSoon}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Recharge popup */}
      <RechargePopup repopup={repopup} setRepopup={setRepopup} />

      {/* Game section */}
      <div>
        <p className="mt-2 flex items-center gap-2 text-base text-gray-200 font-semibold">
          <span>
            <img
              src="https://i.ibb.co/tMdpYCYc/wingo.png"
              className="size-8"
              alt="icon"
            />
          </span>
          Lottery
        </p>

        <div className="grid grid-cols-12 gap-2 mt-2">
          {/* WinGo */}
          <div
            className="col-span-6"
            onClick={() => handleCheck("wingo?Game=10")}
          >
            <img
              src="https://i.ibb.co/PvF6n675/wingo-1.png"
              alt="Wingos"
              className="w-full h-28 rounded-lg object-cover"
            />
          </div>

          {/* K3 */}
          <div className="col-span-6" onClick={() => handleCheck("k3")}>
            <img
              src="https://i.ibb.co/YB46Rgh8/k3-1.png"
              alt="K3"
              className="w-full h-28 rounded-lg object-cover"
            />
          </div>

          {/* 5D (normal route) */}
          <div className="col-span-6" onClick={() => handleCheck("5d")}>
            <img
              src="https://i.ibb.co/B5GRf7y0/5d-1.png"
              alt="5D"
              className="w-full h-28 rounded-lg object-cover"
            />
          </div>

          {/* bike (Coming Soon) */}
          <div className="col-span-6" onClick={() => handleCheck("motobike")}>
            <img
              src="https://i.ibb.co/SXx5s8kt/moto-racing.png"
              alt="bike"
              className="w-full h-28 rounded-lg object-cover"
            />
          </div>
          <div className="col-span-6" onClick={() => handleCheck("trx")}>
            <img
              src="https://i.ibb.co/fzwhzMcp/trxcard.png"
              alt="trx"
              className="w-full h-28 rounded-lg object-cover"
            />
          </div>
          <div
            className="col-span-6"
            onClick={() => handleCheck("a04d1f3eb8ccec8a4823bdf18e3f0e84")}
          >
            <img
              src="https://i.ibb.co/XfwVQ9SS/Blueaviatorcard-min.png"
              alt="bike"
              className="w-full h-28 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LotterSection;
