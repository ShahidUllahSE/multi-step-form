import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../index.css';

// Define validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  dob: yup.date().required('Date of Birth is required').nullable(),
  country: yup.string().required('Country is required'),
});

// Sample countries list
const countries = ["Pakistan", "India", "Bangladesh"]; // Add more countries as needed

function Step1() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data); // Log data for testing
    // Store data in localStorage or context for later use
    localStorage.setItem('personalInfo', JSON.stringify(data));
    navigate('/AddFamilyMembers'); // Navigate to next step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-600">
      <div className="max-w-2xl w-full p-8 bg-white shadow-md rounded-lg"> {/* Increased card width */}
        <h1 className="text-2xl font-bold mb-6">Multi Step Form</h1> {/* Aligned at the start */}
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-800 text-white font-bold">
              1
            </div>
            <div className="text-center">Step 1</div>
          </div>
          
          {/* Connecting line */}
          <div className="h-1 flex-grow bg-purple-800" />

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-500 font-bold">
              2
            </div>
            <div className="text-center">Step 2</div>
          </div>

          {/* Connecting line */}
          <div className="h-1 flex-grow bg-gray-300" />

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-500 font-bold">
              3
            </div>
            <div className="text-center">Step 3</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <input {...field} className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
              )}
            />
            <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <input {...field} className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
              )}
            />
            <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <input type="date" {...field} className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700" />
              )}
            />
            <p className="text-red-500 text-sm">{errors.dob?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <select {...field} className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700">
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              )}
            />
            <p className="text-red-500 text-sm">{errors.country?.message}</p>
          </div>

          <div className="flex justify-center"> {/* Center the button */}
            <button type="submit" className="w-1/4 bg-purple-700 text-white p-2 rounded-md hover:bg-purple-800 transition duration-200"> {/* Adjusted button width */}
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Step1;
