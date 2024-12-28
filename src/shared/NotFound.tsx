import React from "react";

const NotFound: React.FC = ({ children }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-lg">
    <span className="font-medium">{children}</span>
  </div>
);

export default NotFound;
