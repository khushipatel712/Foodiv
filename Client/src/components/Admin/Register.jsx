import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterContext } from '../contexts/RegisterContext';
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';
import Cookies from 'js-cookie';

const Register = () => {
  const { setRegisterData } = useRegisterContext();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [flagUrl, setFlagUrl] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const formattedData = data.map(country => ({
          name: country.name.common,
          flag: country.flags.svg,
          root: country.idd.root,
          suffixes: country.idd.suffixes
        }));
        setCountries(formattedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    const selected = event.target.value;
    const country = countries.find(c => c.name === selected);
    if (country) {
      setSelectedCountry(selected);
      setCountryCode(`${country.root}${country.suffixes.join('')}`);
      setFlagUrl(country.flag);
    } else {
      setCountryCode('');
      setFlagUrl('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!restaurantName) newErrors.restaurantName = 'Restaurant name is required';
    if (!selectedCountry) newErrors.selectedCountry = 'Country is required';
    if (!mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (password !== confirmPassword) newErrors.passwordMismatch = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName,
          country: selectedCountry,
          countryCode,
          mobileNumber: `${countryCode}${mobileNumber}`,
          email,
          password
        })
      });

      if (response.ok) {
        // Handle OTP send and navigate to OTP verification
        navigate('/verifyotp', { state: { email } });
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex pt-20 flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Foodiv" className="h-12" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Restaurant Name</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-l-md">
                {/* Icon here */}
              </span>
              <input
                type="text"
                placeholder="Restaurant name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className={`w-full px-3 py-2 text-gray-700 border-l border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.restaurantName ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.restaurantName && <p className="text-red-500 text-xs mt-1">{errors.restaurantName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            <select 
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.selectedCountry ? 'border-red-500' : ''}`}
              onChange={handleChange}
              value={selectedCountry}
            >
              <option value="">--Select a country--</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.selectedCountry && <p className="text-red-500 text-xs mt-1">{errors.selectedCountry}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <span className="pl-3 py-2 bg-gray-100 text-gray-600 rounded-l-md">
                {flagUrl && <img src={flagUrl} alt="Flag" className="w-5 h-5" />}
              </span>
              <span className="flex items-center px-1 py-2 bg-gray-100 text-gray-600 border-gray-300">
                {countryCode}
              </span>
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className={`w-full px-3 py-2 text-gray-700 border-l border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.mobileNumber ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-l-md">
                {/* Icon here */}
              </span>
              <input
                type="email"
                placeholder="Enter Mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 text-gray-700 border-l border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            {errors.passwordMismatch && <p className="text-red-500 text-xs mt-1">{errors.passwordMismatch}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
