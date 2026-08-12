// Feedback.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillExclamationCircle } from "react-icons/ai"; // Import for the icon in the popup

import FeedbackImg from "../../assets/feedbackImg.png";
import CustomeNavbar from "../../components/CustomeNavbar";
import AlertComponent from "../../components/AlertComponent"; // Import the AlertComponent
import { feedback, messageClear } from "../../store/reducer/userReducer"; // Adjust the path if needed
import ServiceRotate from "../../components/ServiceRotate";

const Feedback = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.user // Assuming 'user' is the key for your userReducer in the store
  );

  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false); // State for the popup
  const [showAlert, setShowAlert] = useState(false); // State to trigger the AlertComponent

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Effect to trigger and manage the AlertComponent's visibility
  useEffect(() => {
    if (successMessage || errorMessage) {
      setShowAlert(true);
      // The AlertComponent itself will handle its fade out,
      // but we need to clear Redux messages after the alert has been seen.
      // We'll let the AlertComponent handle its own internal timer for visibility,
      // and then clear the Redux messages after it's likely disappeared.
      const clearReduxMessagesTimer = setTimeout(() => {
        dispatch(messageClear());
        setShowAlert(false); // Reset alert trigger after clearing Redux messages
      }, 3500); // A bit longer than AlertComponent's internal timer
      return () => clearTimeout(clearReduxMessagesTimer);
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleConfirmSubmit = () => {
    setShowFeedbackPopup(false); // Close the popup
    dispatch(feedback({ title: feedbackTitle })); // Dispatch the actual feedback action
    setFeedbackTitle(""); // Clear the textarea
  };

  const handleOpenPopup = () => {
    if (!feedbackTitle.trim()) {
      // You can use the AlertComponent here too for immediate feedback
      setShowAlert(true); // Manually trigger alert
      dispatch(messageClear()); // Clear previous messages
      // This is a quick way to show an error with the existing alert setup
      // For more specific pre-submit errors, consider a dedicated local state.
      setTimeout(() => {
        dispatch({ type: 'user/feedback/rejected', payload: { message: "Feedback cannot be empty!" } });
      }, 100); // Simulate an error dispatch
      return;
    }
    setShowFeedbackPopup(true); // Show the confirmation popup
  };

  return (
    <>
      <CustomeNavbar name="Feedback" />
 <ServiceRotate/>
      {/* Alert Component for Success/Error Messages */}
      <AlertComponent
        alertPopup={showAlert && (successMessage || errorMessage)} // Only show if showAlert is true AND there's a message
        message={errorMessage || successMessage} // Prioritize error message
        onClose={() => setShowAlert(false)} // Callback for AlertComponent to signal it's done
      />

      <div className="container-section mt-5">
        <div className="nav-bg">
          <textarea
            name=""
            id=""
            className="w-full h-52 p-4 gray-text fs-sm bg-transparent focus:outline-none placeholder:text-gray-text rounded-md"
            placeholder="Welcome to feedback, please give feedback-please describe the problem in detail when providing feedback, preferably attach a screenshot of the problme you accountered, we will immediately process your feddback!"
            value={feedbackTitle}
            onChange={(e) => setFeedbackTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <p className="text-sm text-whites font-medium">
            Send helpful feedback
          </p>
          <p className="text-sm text-whites font-medium">
            Chance to win Mystery Rewards
          </p>
          <img src={FeedbackImg} alt="" className="w-52 my-5" />

          <button
            onClick={handleOpenPopup} // Now opens the popup first
            disabled={loader} // Disable button while Redux loader is true
            className="blue-linear flex justify-center color-orange text-lg w-full m-auto font-medium text-center rounded-full p-2 mt-5 "
          >
            {loader ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Feedback Confirmation Popup */}
      {showFeedbackPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="nav-bg p-6 px-10 rounded-lg text-center">
            <AiFillExclamationCircle
              className="mx-auto text-[#fb5b5b]"
              size={80}
            />
            <h2 className="text-whites font-semibold text-xl mt-4">
              Confirm Feedback Submission?
            </h2>
            <p className="text-gray-text text-sm mt-2">
                Are you sure you want to submit this feedback?
            </p>
            <div className="mt-6 gap-3 flex flex-col">
              <button
                onClick={handleConfirmSubmit} // Confirms and dispatches
                className="px-4 py-2 blue-linear font-medium text-white rounded-full"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowFeedbackPopup(false)} // Closes popup without submitting
                className="px-4 py-2 border border-[#21D9CC] font-medium color-l rounded-full nav-bg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;