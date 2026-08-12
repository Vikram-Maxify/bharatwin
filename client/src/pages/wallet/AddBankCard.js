import React, { useState, useEffect } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsBank2 } from 'react-icons/bs';
import { FaMobileAlt, FaUser } from 'react-icons/fa';
import { HiKey } from 'react-icons/hi';
import { MdOutlineCreditCard, MdEmail } from 'react-icons/md'; // Import MdEmail for email icon
import { useDispatch, useSelector } from 'react-redux';
import { addBank } from '../../store/reducer/userReducer';
import CustomeNavbar from '../../components/CustomeNavbar';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBankCard = () => {
  const { successMessage } = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedBankName, setSelectedBankName] = useState('Please Select a bank');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [bankDetails, setBankDetails] = useState({
    name_bank: '',
    name_user: '',
    stk: '',
    email: '', // Now explicitly for email
    tinh: '', // Used for phone number
    ifsc: '', // New field for IFSC code
    sdt: '0', // This field is always '0', reconsider if it's needed or if 'tinh' is the actual phone
  });

  // Effect to update bank details when returning from bank selection
  useEffect(() => {
    if (location.state?.selectedBank) {
      console.log("Bank selected from BankSelectionPage:", location.state.selectedBank);
      setSelectedBankName(location.state.selectedBank);
      setBankDetails((prev) => ({
        ...prev,
        name_bank: location.state.selectedBank,
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Convert to uppercase for specific fields
    if (name === 'name_user' || name === 'ifsc') {
      newValue = value.toUpperCase();
    }

    setBankDetails((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Determine if all fields are filled to enable the save button
  const areAllFieldsFilled =
    selectedBankName !== 'Please Select a bank' &&
    bankDetails.name_user.trim() !== '' &&
    bankDetails.stk.trim() !== '' &&
    bankDetails.tinh.trim() !== '' &&
    bankDetails.email.trim() !== '' && // Check for email
    bankDetails.ifsc.trim() !== ''; // Check for IFSC

  const handleSubmit = async () => {
    if (!areAllFieldsFilled) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      return;
    }

    try {
      const res = await dispatch(addBank(bankDetails));
      setShowAlert(true);
      setTimeout(() => {
        if (res.payload?.status) {
          navigate('/wallet/Withdraw');
        }
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding bank:", error);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const handleBankSelectClick = () => {
    navigate('/add-bank/select', {
      state: {
        currentBank: selectedBankName !== 'Please Select a bank' ? selectedBankName : null,
      },
    });
  };

  console.log("Submitting bank form with data:", bankDetails);

  return (
    <>
      <CustomeNavbar name='Add Bank' />

      <div className="container-section" style={{ fontFamily: '"Bahnschrift", sans-serif' }}>
        <div className="flex items-center p-1 px-3 rounded-full nav-bg mt-2">
          <AiOutlineExclamationCircle className="color-red-200 text-lg" />
          <p className="text-sm ms-2 leading-4 color-red-200">
            To ensure the safety of your funds, please bind your bank account
          </p>
        </div>

        {/* BANK NAME FIELD */}
        <div className="mt-7">
          <div className="flex items-center">
            <BsBank2 className="color-blue text-lg mr-2" />
            <p className="text-sm text-whites">Bank name</p>
          </div>

          <div
            className={`w-full mt-2 rounded-md p-2 ps-6 flex items-center justify-between cursor-pointer transition-all duration-200 ${
              selectedBankName === 'Please Select a bank'
                ? 'blue-linear placeholder:text-slate-500'
                : 'bg-[#171B34] text-whites'
            }`}
            onClick={handleBankSelectClick}
          >
            <div className="flex-1">
              {selectedBankName === 'Please Select a bank' ? (
                <span className="text-sx text-slate-500">{selectedBankName}</span>
              ) : (
                <span className="text-whites">{selectedBankName}</span>
              )}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {selectedBankName !== 'Please Select a bank' && (
            <div className="mt-3 p-3 bg-blue-900 bg-opacity-20 rounded-md border border-blue-800 border-opacity-30">
              <div className="flex items-center text-xs text-blue-200">
                <BsBank2 className="mr-2" />
                <span>Selected Bank: {selectedBankName}</span>
              </div>
              <button
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBankName('Please Select a bank');
                  setBankDetails((prev) => ({ ...prev, name_bank: '' }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Change Bank
              </button>
            </div>
          )}
        </div>

        {/* NAME */}
        <div className="mt-7">
          <div className="flex">
            <FaUser className="color-blue text-lg mr-1" />
            <p className="text-sm text-whites">Full recipient's name</p>
          </div>
          <input
            type="text"
            className="w-full mt-2 nav-bg rounded-md p-2 focus:outline-none focus:border focus:border-blue-500 focus:border-opacity-50 ps-6 placeholder:text-sm placeholder:text-slate-500"
            placeholder="Please enter the recipient's name"
            name="name_user"
            onChange={handleInputChange}
            value={bankDetails.name_user}
            style={{ fontFamily: '"Bahnschrift", sans-serif' }}
          />
        </div>

        {/* ACCOUNT NUMBER */}
        <div className="mt-7">
          <div className="flex">
            <MdOutlineCreditCard className="color-blue text-lg mr-1" />
            <p className="text-sm text-whites">Bank account number</p>
          </div>
          <input
            type="number"
            className="w-full mt-2 nav-bg rounded-md p-2 focus:outline-none focus:border focus:border-blue-500 focus:border-opacity-50 ps-6 placeholder:text-sm placeholder:text-slate-500"
            placeholder="Please enter the recipient's account number"
            name="stk"
            onChange={handleInputChange}
            value={bankDetails.stk}
            style={{ fontFamily: '"Bahnschrift", sans-serif' }}
          />
        </div>

        {/* PHONE NUMBER */}
        <div className="mt-7">
          <div className="flex">
            <FaMobileAlt className="color-blue text-lg mr-1" />
            <p className="text-sm text-whites">Phone number</p>
          </div>
          <input
            type="number"
            className="w-full mt-2 nav-bg rounded-md p-2 focus:outline-none focus:border focus:border-blue-500 focus:border-opacity-50 ps-6 placeholder:text-sm placeholder:text-slate-500"
            placeholder="Please enter the recipient's phone number"
            name="tinh"
            onChange={handleInputChange}
            value={bankDetails.tinh}
            style={{ fontFamily: '"Bahnschrift", sans-serif' }}
          />
        </div>

        {/* EMAIL ADDRESS */}
        <div className="mt-7">
          <div className="flex">
            <MdEmail className="color-blue text-lg mr-1" />
            <p className="text-sm text-whites">Email address</p>
          </div>
          <input
            type="email"
            className="w-full mt-2 nav-bg rounded-md p-2 focus:outline-none focus:border focus:border-blue-500 focus:border-opacity-50 ps-6 placeholder:text-sm placeholder:text-slate-500"
            placeholder="Please enter the recipient's email address"
            name="email"
            onChange={handleInputChange}
            value={bankDetails.email}
            style={{ fontFamily: '"Bahnschrift", sans-serif' }}
          />
        </div>

        {/* IFSC CODE */}
        <div className="mt-7">
          <div className="flex">
            <HiKey className="color-blue text-lg mr-1" />
            <p className="text-sm text-whites">IFSC code</p>
          </div>
          <input
            type="text"
            className="w-full mt-2 nav-bg rounded-md p-2 focus:outline-none focus:border focus:border-blue-500 focus:border-opacity-50 ps-6 placeholder:text-sm placeholder:text-slate-500"
            placeholder="Please enter the recipient's IFSC code"
            name="ifsc" // Changed name to 'ifsc' for clarity
            onChange={handleInputChange}
            value={bankDetails.ifsc}
            style={{ fontFamily: '"Bahnschrift", sans-serif' }}
          />
        </div>

       
        <button
  className={`w-full rounded-full p-2 mt-4 text-white  font-bold text-2xl ${
    areAllFieldsFilled ? 'blue-linear' : 'bg-gray-500 opacity-50 cursor-not-allowed'
  }`}
  onClick={handleSubmit}
  disabled={!areAllFieldsFilled}
  style={{ fontFamily: '"Bahnschrift", sans-serif' }}
>
  Save
</button>

      </div>

      <div className={`place-bet-popup ${showAlert ? 'active' : ''}`}>
        <div className="text-sm">{successMessage || 'Please select a bank and fill all fields'}</div>
      </div>
    </>
  );
};

export default AddBankCard;