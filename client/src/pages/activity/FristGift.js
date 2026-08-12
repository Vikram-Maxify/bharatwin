import React, { useEffect, useState } from "react";
import Wallet from "../../assets/balance.png";
import BannerImg from "../../assets/gift-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { getRedeemGift, RedeemGiftCode } from "../../store/reducer/activityReducer";
import CustomeNavbar from "../../components/CustomeNavbar";
import { IoInformationCircleOutline } from 'react-icons/io5';
import { Link } from "react-router-dom";

const FristGift = () => {
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
      <CustomeNavbar name="First gift" />

      {/* Banner Section */}
      <div
  className="relative w-full h-52 bg-cover bg-no-repeat bg-center"
  style={{
    backgroundImage: `url("https://jalwagames6.com/assets/png/box-5efaaed8.png"), linear-gradient(103deg, rgb(250, 172, 72) 4.77%, rgb(247, 96, 43) 96.1%)`,
    
  }}
>

        <div className="absolute inset-0 flex items-center justify-center p-4 whitespace-nowrap text-white text-center">
          <div className="max-w-lg flex flex-col items-start p-4 ">
            <h3 className="text-2xl font-bold mb-1">First gift</h3>
            <h4 className="text-sm opacity-90 mb-3">
              There are two types of new member gift package rewards:
            </h4>
            <p className="flex text-sm items-start mb-1">
              <span className="font-bold bg-white text-orange-500 rounded-full px-1 mr-2">1.</span>
              Bonus for first deposit negative profit
            </p>
            <p className="flex text-sm items-start mb-3">
              <span className="font-bold bg-white text-orange-500 rounded-full px-1  mr-2">2.</span>
              Play games and get bonuses only for new members
            </p>
            <Link to="/main/firstgift/Eventdetail">
             <div className="inline-block text-white  border border-white text-xs font-semibold px-3 py-1 rounded-full">
              Activity details
            </div>
            </Link>
           
          </div>
        </div>
      </div>

       {/* Event Start Time */}
       <div className="relative m-4 nav-bg flex flex-col items-center rounded">

  <div className="p-4 pt-12 rounded-lg nav-bg shadow-md font-['Roboto','Inter',sans-serif] relative">
    {/* SVG and H2 are now positioned relative to this div */}
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      {/* Adjusted SVG size and positioning for better visual balance */}
      <svg className="w-64 h-32 text-green-600">
        <use href="#icon-ruleHead"></use>
      </svg>
      {/* Adjusted H2 positioning to be within the SVG's visual area */}
      <h2 className="text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        Event start time
      </h2>
    </div>
<h2 className="package-time color-l font-semibold ml-auto">
          2025-06-09 00:00:00
        </h2>
    
  </div>
</div>

      {/* Package Rules */}
      <div className="nav-bg mt-4 mx-4 rounded-lg shadow ">
        <div className="flex justify-around text-center border-b rounded-t-lg  p-1 text-white blue-linear text-sm font-medium">
          <div className="flex-1">Conditions of participation</div>
          <div className="flex-1">Get Compensation Bonus</div>
          <div className="flex-1">Bonus limit</div>
        </div>

        <ul>
          <li className="flex justify-around items-center py-3 border-b last:border-b-0">
            <div className="flex-1 text-center text-white text-sm">
              First deposit for new users
            </div>
            <div className="flex-1 text-center text-white font-semibold text-sm">
              Total <span className="text-lg text-red-500 font-bold">35%</span> compensation from First Deposit Amount
            </div>
            <div className="flex-1 text-center text-red-500 font-bold text-sm">
              ₹150.00
            </div>
          </li>
        </ul>
      </div>

      {/* Package Tips */}
      <div className="nav-bg p-4 flex items-center mt-4 mx-4 rounded-lg shadow-sm text-red-500 text-sm">
        <IoInformationCircleOutline className="text-xl mr-2" />
        The membership system that meets the standard automatically distributes bonuses.
      </div>

      {/* Alert Popup */}
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md transition-all duration-300 ${Alerts ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="text-sm">{successMessage}</div>
      </div>
    </>
  );
};

export default FristGift;
