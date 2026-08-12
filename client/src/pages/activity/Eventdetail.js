import React, { useEffect, useState } from "react";
import Wallet from "../../assets/balance.png";
import BannerImg from "../../assets/gift-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { getRedeemGift, RedeemGiftCode } from "../../store/reducer/activityReducer";
import CustomeNavbar from "../../components/CustomeNavbar";
import { IoInformationCircleOutline } from 'react-icons/io5';

const Eventdetail = () => {
  const { redeemData } = useSelector((state) => state.activity);
  const [Alerts, setAlerts] = useState(false);
  const [code, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(RedeemGiftCode({ code })).then((res) => {
      setSuccessMessage(res.payload.message);
      dispatch(getRedeemGift());
    });
    setAlerts(true);
    setTimeout(() => setAlerts(false), 2000);
  };

  useEffect(() => {
    dispatch(getRedeemGift());
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomeNavbar name=" Event Details" />

      <div className="mt-5 flex flex-col items-center justify-center  px-4 text-white font-sans">
      {/* Main card */}
      <div className="nav-bg rounded-xl px-4 py-3 max-w-md text-sm text-white">
        <h2 className="text-center text-red-500 text-base font-semibold mb-2">
          Bonus for first deposit negative profit
        </h2>
        <p className="text-[13px] leading-relaxed text-gray-200">
          Event start time <span className="text-white">2025-06-09 00:00:00</span>，First deposit for new users
          <span className="text-blue-400 ml-1">24</span>Negative hourly profit The platform returns
          <span className="text-red-400 ml-1">35% bonus</span>，Bonus limit
          <span className="text-red-400 ml-1">₹150.00</span>，The membership system that meets the
          standard automatically distributes bonuses。
        </p>
      </div>

      {/* Footer message */}
      <p className="text-red-500 text-center mt-6 text-base font-medium">
        New members get bonuses by playing games
      </p>
    </div>
    </>
  );
};

export default Eventdetail;
