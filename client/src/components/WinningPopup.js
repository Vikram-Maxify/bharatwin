import ball1 from "../assets/CarGame/speed_pinball1.png";
import ball2 from "../assets/CarGame/speed_pinball2.png";
import ball3 from "../assets/CarGame/speed_pinball3.png";
import ball4 from "../assets/CarGame/speed_pinball4.png";
import ball5 from "../assets/CarGame/speed_pinball5.png";
import ball6 from "../assets/CarGame/speed_pinball6.png";
import ball7 from "../assets/CarGame/speed_pinball7.png";
import ball8 from "../assets/CarGame/speed_pinball8.png";
import ball9 from "../assets/CarGame/speed_pinball9.png";
import ball10 from "../assets/CarGame/speed_pinball10.png";
const ballImages = {
    1: ball1,
    2: ball2,
    3: ball3,
    4: ball4,
    5: ball5,
    6: ball6,
    7: ball7,
    8: ball8,
    9: ball9,
    10: ball10,
  };

const WinningPopup = ({ type, amount, result, period, handleClose }) => {
    console.log("object",type,amount, result, period)
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999]">

            {type === true && (
                <div className="relative w-full"
                    style={{
                        backgroundImage: 'url("https://i.ibb.co/1YNjmrMB/win-9ce95174.png")',
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}

                >
                    <div className="w-[21rem] mx-auto flex flex-col px-10 pt-40 pb-24 py-5 justify-between">
                        {/* Top Section */}
                        <div>
                            <div className="mb-4 text-start">
                                <div className="text-[20px] font-bold text-gray-600">Winning</div>
                                <div className="text-[30px] whitespace-nowrap font-bold text-red-600">{amount}</div>
                                <div className="text-xs font-medium text-gray-700 mt-1">Winning Result</div>
                            </div>

                            {/* Results */}
                            <div className="flex flex-col space-y-4 w-full">
                                {result.split(",").map((rankStr, i) => {
                                    const rank = parseInt(rankStr.trim());
                                    const isOdd = rank % 2 === 1;
                                    const isBig = rank > 5; // Adjust this threshold if needed

                                    return (
                                        <div key={i} className="flex items-center justify-between w-full">
                                            <span className="w-8 text-xs text-red-500 font-semibold">{i+1}st</span>
                                            <div className="w-8 h-8 mx-2 flex-shrink-0">
                                                <img
                                                    src={ballImages[rankStr]}
                                                    alt="rank ball"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex gap-2 w-full">
                                                <div className="flex-1 flex flex-col items-center bg-gradient-to-t from-[#f75820] to-[#fc8a48] px-2 py-1.5 rounded-md">
                                                    <span className="text-lg font-semibold text-white">{isOdd ? "Odd" : "Even"}</span>
                                                </div>
                                                <div className="flex-1 flex flex-col items-center bg-gradient-to-t from-[#1daf6b] to-[#56c592] px-2 py-1.5 rounded-md">
                                                    <span className="text-lg font-semibold text-white">{isBig ? "Big" : "Small"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="py-3">
                            <div className="w-full bg-gray-100/70 p-2 flex items-center justify-start gap-2 border-2 border-white rounded-lg">
                                <img
                                    src="https://ossimg.bdg123456.com/BDGWin/lotterycategory/lotterycategory_20250516034354gi1v.png"
                                    alt="Moto Bike"
                                    className="w-10 h-10 rounded-full object-cover bg-[#dae9fc]"
                                />
                                <div className="flex flex-col items-start ml-5">
                                    <div className="text-xs font-semibold text-gray-800">Game: Moto Racing</div>
                                    <div className="text-[10px] text-gray-600">Current Period</div>
                                    <div className="text-[10px] font-mono text-gray-700">{period}</div>
                                </div>
                            </div>

                            <button onClick={handleClose} className="w-[40%] mx-auto mt-2 py-1.5  bg-gradient-to-t from-[#f75820] to-[#fc8a48] text-white text-xs font-medium rounded-full hover:bg-red-500 hover:text-black transition ">
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {type === false && (
                <div className="w-full"
                    style={{
                        backgroundImage: 'url("https://i.ibb.co/zHsLHzFT/fail-f53fd14c.png")',
                        backgroundSize: "contain", // 👈 This ensures the whole image is visible
                        backgroundRepeat: "no-repeat", // 👈 Prevents repeating
                        backgroundPosition: "center", // 👈 Centers the image
                    }}

                >
                    <div className="w-[21rem] mx-auto flex flex-col px-10 pt-40 pb-24 py-5 justify-between">
                        {/* Top Section */}
                        <div>
                            <div className="mb-4 text-start">
                                <div className="text-[20px] font-bold text-gray-600">Lose</div>
                                <div className="text-[30px] whitespace-nowrap font-bold text-gray-600">No Winning</div>
                                <div className="text-xs font-medium text-gray-700 mt-1">Winning Result</div>
                            </div>

                            {/* Results */}
                            <div className="flex flex-col space-y-4 w-full">
                                {[1, 2, 3].map((rank, i) => (
                                    <div key={i} className="flex items-center justify-between w-full">
                                        <span className="w-8 text-xs text-gray-400 font-semibold">{rank}st</span>
                                        <div className="w-8 h-8 mx-2 flex-shrink-0">
                                            <img
                                                src="https://i.ibb.co/7JB7dtWD/ball-5.png"
                                                alt="rank ball"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="flex gap-2 w-full">
                                            <div className="flex-1 flex flex-col items-center bg-gradient-to-t from-[#a5bedd] to-[#dae9fc] px-2 py-2 rounded-md">
                                                <span className="text-lg font-bold text-white">Odd</span>
                                            </div>
                                            <div className="flex-1 flex flex-col items-center bg-gradient-to-t from-[#a5bedd] to-[#dae9fc] px-2 py-2 rounded-md">
                                                <span className="text-lg font-bold text-white">Even</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="py-3">
                            <div className="w-full bg-gray-100/70 p-2 flex items-center justify-start gap-2 border-2 border-white rounded-lg">
                                <img
                                    src="https://ossimg.bdg123456.com/BDGWin/lotterycategory/lotterycategory_20250516034354gi1v.png"
                                    alt="Moto Bike"
                                    className="w-10 h-10 rounded-full object-cover bg-[#dae9fc]"
                                />
                                <div className="flex flex-col items-start ml-5">
                                    <div className="text-xs font-semibold text-gray-800">Game: Moto Racing</div>
                                    <div className="text-[10px] text-gray-600">Current Period</div>
                                    <div className="text-[10px] font-mono text-gray-700">{period}</div>
                                </div>
                            </div>

                            <button onClick={handleClose} className="w-[40%] mx-auto mt-2 py-1.5 bg-[#dae9fc] text-gray-500 text-xs font-medium rounded-full hover:bg-gray-200 hover:text-black transition ">
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );

}

export default WinningPopup;







