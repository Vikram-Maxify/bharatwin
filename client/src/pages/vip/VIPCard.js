// VIPCard.jsx
import React from 'react';
import { FaCheckCircle, FaLock } from 'react-icons/fa'; // Import icons

const VIPCard = ({ level, progress, maxProgress, bgColor, vipImage, iconImage, bgImage, track, userVipLevel }) => {
  // Determine if the current VIP level is achieved or not
  const isAchieved = userVipLevel >= level;

  return (
    <>
      <div
        className={`rounded-lg p-4 shadow-lg w-full`}
        style={{ backgroundColor: bgColor, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}
      >
        <div className="flex items-start relative -top-2 justify-between">
  <h3 className="text-[#fff2a2] font-semibold text-2xl flex gap-1 items-center">
    <img src={iconImage} className="w-[35px] font-sans" alt="VIP Icon" />
    VIP{level}

    {/* Conditional rendering of the icons */}
    <div className="mt-2">
      {isAchieved ? (
        <div className="flex items-center text-sm ">
          <img src="https://i.ibb.co/jF9dv1d/TICK.png" alt="Achieved" className="w-6 h-6 ml-2 mr-1" />
          <span className="font-medium text-green-300">Achieved</span>
        </div>
      ) : (
        <div className="flex items-center mb-2 text-sm whitespace-nowrap text-white">
          <img src="https://i.ibb.co/zTTFhH7G/LOCK.png" alt="Locked" className="w-5 h-5 ml-2 mr-1   " />
          <span className="font-medium">Not open yet</span>
        </div>
      )}
    </div>
  </h3>

  <img src={vipImage} className="w-[60px]" alt="VIP Badge" />
</div>


        <p className="text-white text-[0.7rem]">Upgrading VIP{level} requires {Math.floor(maxProgress - progress)} EXP</p>

        

        <div className='flex justify-between mt-1'>
          <p className="text-white text-[0.6rem] mt-2 border px-1">Bet 100=1Exp</p>
          <p className="text-white text-[0.8rem] mt-2">VIP{level}</p>
        </div>
        <div className="mt-1 rounded-full overflow-hidden" style={{ backgroundColor: track }}>
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: `${(progress / maxProgress) * 100}%` }}
          />
        </div>
        <div className='flex justify-between'>
          <p className="text-white text-[0.6rem] mt-2 px-2 rounded-full" style={{ backgroundColor: track }}>{Math.floor(progress)}/{maxProgress}</p>
          <p className="text-white text-[0.6rem] mt-2">{maxProgress} EXP can be leveled up</p>
        </div>
      </div>
    </>
  );
};

export default VIPCard;