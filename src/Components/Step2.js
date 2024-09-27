import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../index.css';

// Define validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  relation: yup.string().required('Relation is required'),
});

function Step2() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFamilyMembers((prev) => [...prev, data]);
    reset();
  };

  const handleNext = () => {
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    const finalData = { ...personalInfo, familyMembers };
    console.log(finalData); // Log final data for testing
    // Optionally store finalData in localStorage or context
    localStorage.setItem('finalData', JSON.stringify(finalData));
    navigate('/result');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-600">
      <div className="max-w-2xl w-full p-8 bg-white shadow-md rounded-lg"> {/* Increased card width */}
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
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-800 text-white font-bold">
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
            <label className="block text-sm font-medium">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input {...field} className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800" />
              )}
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium">Relation</label>
            <Controller
              name="relation"
              control={control}
              render={({ field }) => (
                <select {...field} className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800">
                  <option value="">Select Relation</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  {/* Add more options as needed */}
                </select>
              )}
            />
            <p className="text-red-500 text-sm">{errors.relation?.message}</p>
          </div>

          <div className="flex justify-center"> {/* Center the button */}
            <button type="submit" className="w-full bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900 transition duration-200"> {/* Adjusted button width */}
              Add Family Member
            </button>
          </div>
        </form>

        <h2 className="mt-4">Family Members:</h2>
        <ul className="list-disc pl-5">
          {familyMembers.map((member, index) => (
            <li key={index}>
              {member.name} ({member.relation})
            </li>
          ))}
        </ul>

        <div className="flex justify-center"> {/* Center the button */}
          <button onClick={handleNext} className="mt-4 w-1/4 bg-purple-800 text-white p-2 rounded-md hover:bg-purple-900 transition duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;
