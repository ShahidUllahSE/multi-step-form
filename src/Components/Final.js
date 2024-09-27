import React from 'react';
function Final() {
  // Fetch personalInfo and familyMembers from localStorage
  const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
  const familyMembers = JSON.parse(localStorage.getItem('finalData'))?.familyMembers || []; // Fetch family members from finalData

  // Combine both pieces of data
  const finalData = { ...personalInfo, familyMembers };

  // Define the order of fields to display
  const orderedFields = [
    'firstName',
    'lastName',
    'country',
    'familyMembers',
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-600"> 
      <div className="max-w-2xl w-full p-8 bg-white shadow-md rounded-lg"> 
       
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-800 text-white font-bold">1</div>
            <div className="text-center">Step 1</div>
          </div>
          <div className="h-1 flex-grow bg-purple-800" />
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-800 text-white font-bold">2</div>
            <div className="text-center">Step 2</div>
          </div>
          <div className="h-1 flex-grow bg-purple-800" />
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-purple-800 text-white font-bold">3</div>
            <div className="text-center">Final</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">Final Output</h1> 

        {finalData ? (
          <>
            <table className="min-w-full bg-white border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-200 bg-purple-800">
                  <th className="py-2 px-4 border-b text-center text-white">Field</th>
                  <th className="py-2 px-4 border-b text-center text-white">Value</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through ordered fields */}
                {orderedFields.map((field) => (
                  <tr key={field} className="border-b hover:bg-purple-100">
                    <td className="py-2 px-4 text-center">{field}</td>
                    <td className="py-2 px-4 text-center">
                      {field === 'familyMembers'
                        ? finalData.familyMembers.map((member, index) => `${member.name} (${member.relation})`).join(', ') || 'No family members'
                        : finalData[field] || 'N/A'}
                    </td>
                  </tr>
                ))}
                {/* Handle any remaining fields */}
                {Object.entries(finalData).map(([key, value]) => {
                  if (!orderedFields.includes(key)) {
                    return (
                      <tr key={key} className="border-b hover:bg-purple-100">
                        <td className="py-2 px-4 text-center">{key}</td>
                        <td className="py-2 px-4 text-center">{typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>

            <h2 className="text-xl font-bold mb-2 text-center">JSON Data</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {JSON.stringify(finalData, null, 2)}
            </pre>
          </>
        ) : (
          <p className="text-red-500 text-center">No data found.</p>
        )}
      </div>
    </div>
  );
}

export default Final;
