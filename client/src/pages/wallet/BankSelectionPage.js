// src/pages/AddBank/BankSelectionPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomeNavbar from '../../components/CustomeNavbar';
import { FiSearch } from 'react-icons/fi';

const bankData = [
  "Bank of Baroda",
  "Union Bank of India",
  "Central Bank of India",
  "Yes Bank",
  "HDFC Bank",
  "Karnataka Bank",
  "Standard Chartered Bank",
  "IDBI Bank",
  "Bank of India",
  "Punjab National Bank",
  "ICICI Bank",
  "Canara Bank",
  "Kotak Mahindra Bank",
  "State Bank of India",
  "Indian Bank",
  "Axis Bank",
  "FEDERAL BANK",
  "Syndicate Bank",
  "Citibank India",
  "Indian Overseas Bank",
  "IDFC Bank",
  "Bandhan Bank",
  "Indusind Bank",
  "Equitas Bank",
  "India Post Payments Bank",
  "Corporation Bank",
  "City Union Bank",
  "PYTM PAYMENTS BANK",
  "Karur Vysya Bank",
  "Tamilnad Mercantile Bank",
  "Allahabad Bank",
  "varachha co-operative bank",
  "Meghalaya Rural Bank",
  "AU Small Finance Bank",
  "Lakshmi Vilas Bank",
  "South Indian Bank",
  "Bassein Catholic Co-Operative Bank",
  "Airtel Payment Bank",
  "State Bank of Hyderabad",
  "GP Parsik Bank",
  "Kerala Gramin Bank",
  "RBL Bank",
  "Dhanlaxmi Bank",
  "TJSB Bank",
  "Purvanchal Bank",
  "Sarva Haryana Gramin Bank",
  "Ahmedabad District Co-Operative Bank",
  "Saraswat Cooperative Bank",
  "Telangana Grameena Bank",
  "Andhra Pragathi Grameena Bank",
  "Rajasthan Marudhara Gramin Bank",
  "Abhyudaya Bank",
  "Capital Small Finance Bank",
  "Mizoram Rural Bank",
  "Andhra Pradesh Grameena Vikas Bank",
  "Karnataka Vikas Grameena Bank",
  "The Ahmedabad Merchantile Co-Op Bank Ltd",
  "Madhya Bihar Gramin Bank",
  "NSDL Payments Bank",
  "ESAF Small Finance Bank",
  "Himachal Pradesh State Cooperative Bank",
  "Maharashtra State Cooperative Bank",
  "Oriental Bank of Commerce",
  "Nainital Bank",
  "Jharkhand Rajya Gramin Bank",
  "jio payments bank",
  "MAHARASHTRA GRAMIN BANK",
  "AIRTEL PAYMENTS BANK",
  "Uttarakhand Gramin Bank",
  "Equitas Small Finance Bank",
  "Himachal Pradesh Gramin Bank",
  "Krishna District Co-Operative Central Bank Ltd.",
  "RAJKOT NAGARIK SAHAKARI BANK LTD",
  "North East small financial bank",
  "Catholic syrian bank",
  "Fincare small finance bank",
  "Baroda Uttar Pradesh Gramin Bank",
  "Dhanalakshmi bank",
  "Cosmos Co-operative Bank Ltd",
  "Saurashtra gramin bank",
  "Baroda Rajasthan kshetriya gramin bank",
  "Suco Bank",
  "Jana small finance bank",
  "Dena Gujarat Gramin Bank",
  "Chaitanya Godavari Grameena Bank",
  "SVC BANK",
  "Bharat cooperative bank",
  "The Surat District Co-Op. Bank Ltd.",
  "USDT",
  "The Kalupur Commercial Co-operative Bank",
  "Prime co-operative Bank",
  "Tripura Gramin Bank",
  "Zila Sahakari Bank Ltd Bareilly",
  "ARYAVART Bank",
  "Development credit Bank",
  "Sarva UP Gramin Bank",
  "New India Co-Operative Bank",
  "NKGSB Co-operative Bank Ltd.",
  "Vijaya Bank",
  "United Bank of India",
  "State Bank of Bikaner And Jaipur",
  "Shri Janata Sahakari Bank LTD",
  "Rajgurunagar Sahakari Bank",
  "FEDERAL NEO BANK JUPITER",
  "CHHATTISGARH RAJYA GRAMIN BANK",
  "Apna Sahakari Bank",
  "GS Mahanagar Co-Op Bank Ltd",
  "Bangiya Gramin Vikash Bank",
  "Assam Gramin Vikash Bank",
  "Kangra Central Co-operative Bank Ltd",
  "Punjab Gramin Bank",
  "Assam gramin bikash bank",
  "Karnataka Gramin Bank",
  "SURYODAY SMALL FINANCE BANK LIMITED",
  "Utkarsh Small Finance Bank",
  "The Meghalaya Co-operative Apex Bank",
  "UTTAR BIHAR GRAMIN BANK",
  "STATE BANK OF TRAVANCORE",
  "SHIVALIK SMALL FIHANCE BANK",
  "DAKSHIN BIHIR GRAMIN BANK",
  "manipur rural bank",
  "State bank of patiala",
  "BARODA GUJARAT GRAMIN BANK",
  "The Gujarat State Co-operative Bank Limited",
  "vasai vikas sahakari",
  "paschim banga gramin bank",
  "VISHAPATNAM co-operative bank",
  "Samarth Sahakari Bank Ltd",
  "uttarbanga kshetriya gramin bank",
  "janata sahakari bank ltd",
  "the gayatri co-operative urban bank",
  "Jupiter Federal Bank",
  "ABHYUDAYA CO-OP. BANK LTD.",
  "J&K Grameen Bank",
  "Post Office Savings Bank",
  "SBM Bank India",
  "Bank of Maharashtra",
  "Jind Central Co-Op Bank",
  "PRATHAMA Up Gramin Bank",
  "State Bank of Mysore",
  "BARODA U.P BANK",
  "PURVANCHAL GRAMIN BANK",
  "The Varachha Co-operative Bank Ltd., Surat",
  "State Bank Of Mauritius Ltd",
  "Kallappanna Awade Janata Bank",
  "Jupiter Federal",
  "HIMACHAL PARDESH STATE COOPERATIVE BANK",
  "Pratham Bank",
  "Oisha Gramya Bank",
  "KDCC BANK",
  "The Hasti Coop Bank",
  "District Co-Operative Central Bank Ltd",
  "ODISHA GRAMYA BANK",
  "IDFC FIRST BANK LTD",
  "The Ahmedabad District Co-op Bank Ltd",
  "Tamil Nadu Grama Bank",
  "GAYATRI BANK",
  "GRAMIN BANK OF ARYAVART",
  "The Kalyan Janata Sahakari Bank Ltd",
  "Dombivli Nagari Sahakari Bank Ltd.",
  "UTKAL GRAMYA BANK",
  "Bihar Gramin Bank",
  "CATHOLIC SYRIAN BANK LTD",
  "Jalna Merchants Co-operative Bank",
  "THE RATNAKAR BANK LTD",
  "Zila sahkari bank",
  "NAGAR SAHKARI BANK LTD. MAHARAJGANJ",
  "Vananchal Gramin Bank",
  "Jammu Kashmir Bank",
  "Punjab Sind Bank",
  "Punjab dan Sind Bank",
  "Jammu and Kashmir Bank",
  "HARYANA BANK",
  "JILA SAHAKARI BANK",
  "BANASKANTHA DISTRICT CENTRAL CO-OP. BANK LTD",
  "The Rohtak Central Co-op. Bank Ltd",
  "ASSOCIATE CO-OP. BANK LTD",
  "suryoday small finance Bank",
  "Andhra Pragati grameena bank",
  "Federal Savings Bank",
  "the banaskantha mercantile bank",
  "SBI - KIOSK BANKING",
];
const BankSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const filteredBanks = bankData.filter((bank) =>
    bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBankSelect = (bank) => {
    console.log('Selected Bank:', bank);
    navigate('/wallet/Withdraw/AddBankCard', {
      state: {
        selectedBank: bank,
        from: 'selection',
      },
    });
  };

  useEffect(() => {
    if (location.state?.currentBank) {
      setSearchTerm(location.state.currentBank);
    }
  }, [location.state]);

  return (
    <>
      <CustomeNavbar name="Choose Bank" />

      <div className="p-4  min-h-screen">
        {/* Search Input with Icon */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border nav-bg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Search bank name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* Bank List */}
        <div className="nav-bg rounded-md shadow">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank) => (
              <div
                key={bank}
                className="px-4 py-3 text-white text-sm border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition"
                onClick={() => handleBankSelect(bank)}
              >
                {bank}
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">
              No banks found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BankSelectionPage;