import React from 'react';

const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Traffic & Reports</h1>
    <div className="h-64 bg-gray-50 flex items-center justify-center border rounded">
      <p className="text-gray-400 font-italic">[ Graph: Views over Time ]</p>
    </div>
    <div className="mt-6">
      <h3 className="font-bold mb-2">User Complaints</h3>
      <ul className="list-disc pl-5 text-sm">
        <li>Broken link on "Market Trends" page</li>
        <li>Spam comment reported on Article #104</li>
      </ul>
    </div>
  </div>
);

export default Reports;