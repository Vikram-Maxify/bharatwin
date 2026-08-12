
import { Link } from "react-router-dom";
import poster from "../../assets/inviteposter.jpeg";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaTruckMoving } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CopyCopmponent from "../../components/CopyCopmponent";
import { useState } from "react";
import CustomeNavbar from "../../components/CustomeNavbar";
import { useSelector } from "react-redux";
import ServiceRotate from "../../components/ServiceRotate";

const Invite = () => {
  const { bannergetData } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);
  const [copyPopup, setCopyPopup] = useState(false);

  const slideData = [
    {
      img: poster,
      logo: bannergetData?.gameall?.logo,
      text1: `Welcome to ${bannergetData?.gameall?.name}`,
      text2: "Fair and justice",
      text3: "Open and transparent",
      text4: "Full Odds Bonus Rate",
      icon1: <HiBuildingLibrary />,
      icon2: <FaTruckMoving />,
      text5: "Financial Security",
      text6: "Quick Withdrawal",
      text7: "Permanent",
      text8: "Commission up to 85%",
      scanner: userInfo?.qrs,
    },
    {
      img: poster,
      logo: bannergetData?.gameall?.logo,
      text1: `Welcome to ${bannergetData?.gameall?.name}`,
      text2: "Fair and justice",
      text3: "Open and transparent",
      text4: "Full Odds Bonus Rate",
      icon1: <HiBuildingLibrary />,
      icon2: <FaTruckMoving />,
      text5: "Financial Security",
      text6: "Quick Withdrawal",
      text7: "Permanent",
      text8: "Commission up to 85%",
      scanner: userInfo?.qrs,
    },
    {
      img: poster,
      logo: bannergetData?.gameall?.logo,
      text1: `Welcome to ${bannergetData?.gameall?.name}`,
      text2: "Fair and justice",
      text3: "Open and transparent",
      text4: "Full Odds Bonus Rate",
      icon1: <HiBuildingLibrary />,
      icon2: <FaTruckMoving />,
      text5: "Financial Security",
      text6: "Quick Withdrawal",
      text7: "Permanent",
      text8: "Commission up to 85%",
      scanner: userInfo?.qrs,
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true, // Add this to center the slide
    centerPadding: '40px', // Add some padding on sides
  };

  const currentUrl = window.location.origin;
  const invitationLink = `${currentUrl}/#/register?invitationCode=${userInfo?.code}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(invitationLink)
      .then(() => {
        setCopyPopup(true);
        setTimeout(() => {
          setCopyPopup(false);
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };

  return (
    <div className="max-w-md mx-auto"> {/* Added container with max-width */}
      <CopyCopmponent
        copyPopup={copyPopup}
        message="Copy successful"
        className="z-20"
      />
      
      <CustomeNavbar name="Invite"/>

      <ServiceRotate/>

      {/* Instruction */}
      <div className="px-4 py-3"> {/* Reduced padding for mobile */}
        <p className="text-[15px] text-gray-500 mb-5 text-center"> {/* Centered text */}
          Swipe left or right to choose your favorite poster
        </p>
      </div>

      {/* Slider Container */}
      <div className="px-2"> {/* Added padding to container */}
        <Slider {...sliderSettings}>
          {slideData.map((items, index) => (
            <div key={index} className="px-2"> {/* Added padding to each slide */}
              <div
                className="rounded-xl p-2  " // Added mx-auto to center
                style={{
                  backgroundImage: `url(${items.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "500px",
                  width: "100%", // Changed to 100% of container
                  maxWidth: "350px", // Max width for larger screens
                }}
              >
                <div className="w-[240px] m-auto">
                  <img src={items.logo} alt="Logo" className="w-28 pt-2" />
                  <div className="flex items-center justify-start gap-2">
                    <div className="text-white  leading-7 text-center font-medium">
                      {items.text1}
                    </div>
                    <div className="flex items-center justify-start gap-3">
                      <p className="bg-[#ffdd7e] p-2 -skew-x-12 text-red-500 font-medium">
                        {items.text2}
                      </p>
                      <p className="bg-[#ffdd7e] px-2 -skew-x-12 text-red-500 font-medium">
                        {items.text3}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-[25px] text-white my-3">
                      {items.text4}
                    </h1>
                  </div>
                  <div className="w-full  flex items-center justify-between gap-2">
                    <div className="w-[50%] border border-[#ffdd7e] rounded-lg text-white flex flex-col items-center justify-center text-[30px] py-3">
                      {items.icon1}
                      <h1 className="whitespace-nowrap text-white text-[12px] font-semibold">
                        {items.text5}
                      </h1>
                    </div>
                    <div className="w-[50%] border border-[#ffdd7e] rounded-lg text-white flex flex-col items-center justify-center text-[30px] py-3">
                      {items.icon2}
                      <h1 className="whitespace-nowrap text-white text-[12px] font-semibold">
                        {items.text6}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center mt-5 text-gray-950 tracking-wider font-semibold">
                    <h1>{items.text7}</h1>
                    <h1>{items.text8}</h1>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src={items.scanner}
                      alt="QR Scanner"
                      className="w-24 pt-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Summary */}
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="font-medium text-gray-100">Invite Friends</div>
        <div className="font-medium text-gray-100">
          Income <span className="text-red-500 font-medium">10 billion</span>{" "}
          Commission
        </div>
      </div>

      {/* Buttons */}
      <div className="px-4"> {/* Consistent padding */}
        <button
          className="blue-linear w-full p-2 text-lg font-bold my-2 rounded-full text-white"
          onClick={copyToClipboard}
        >
          INVITATION LINK
        </button>

        <button
          className="border border-[#00d08a] text-[#00d08a]  w-full p-2 text-lg font-medium my-2 rounded-full"
          onClick={copyToClipboard}
        >
          Copy Invitation Link
        </button>
      </div>
    </div>
  );
};

export default Invite;