import React, { useEffect } from 'react';
import { FaPlay } from "react-icons/fa";
import CustomeNavbar from '../../components/CustomeNavbar';

const EventDescription = () => {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="min-h-screen bgs-body">
      {/* Header */}
    
             <CustomeNavbar name="Event Description"/>

      {/* Active time */}
      <div className="nav-bg h-[100px] rounded-lg mt-7 mx-4 ">
        <div className="flex items-center justify-start gap-3 bg-[#21D9CC] py-2 text-black px-2 text-[20px] -skew-x-12 ">
          <FaPlay className=" " />
          <h2>Activity time</h2>
        </div>
        <h1 className="text-[14px] font-medium px-2 mt-3 ">From now on</h1>
      </div>

      {/* Valid period */}
      <div className="nav-bg h-[100px] rounded-lg mt-2 mx-4 ">
        <div className="flex items-center justify-start gap-3 bg-[#21D9CC] py-2 text-black px-2 text-[20px] -skew-x-12 ">
          <FaPlay className=" " />
          <h2>Validity period</h2>
        </div>
        <h1 className="text-[14px] font-medium px-2 mt-3 ">
          Official website notification shall prevail
        </h1>
      </div>

      {/* parahgraph */}
      <div className="nav-bg h-[80px] rounded-lg my-5 text-[#21D9CC] font-medium mx-4 flex items-center justify-center px-2 ">
        <p className="text-[12px] leading-5">
          Members whose single deposit amount or accumulated deposit amount
          reaches the set amount can participate in the lottery.。
        </p>
      </div>

      {/* conditions of participations */}
      <div className="nav-bg h-[auto] rounded-lg mt-4 pb-7 mx-4 ">
        <div className="flex items-center justify-start gap-3 bg-[#21D9CC] py-2 text-black px-2 text-[20px] -skew-x-12 ">
          <FaPlay className=" " />
          <h2>Conditions of participation</h2>
        </div>
        <p className="text-[10px] text-gray-600 font-medium px-2 mt-3 tracking-wider">
          Members who meet the requirements of {" "}
          <span className="text-[#21D9CC]">
            Vip1、Vip2、Vip3、Vip4、Vip5、Vip6、Vip7、Vip8、Vip9、Vip10
          </span>{" "}
          can participate in the bigwheel event. Need to bind a bank card.
          Hundreds of millions of cash and many other prizes are up for grabs.
          Get ready for endless surprises and grand prizes every day!
        </p>
        <p className="text-[10px] text-gray-600 font-medium px-2 mt-5 ">
          With hundreds of millions in cash and many other prizes up for grabs,
          get ready for endless surprises and big prizes every day!
        </p>
      </div>
    </div>
  );
};

export default EventDescription;

