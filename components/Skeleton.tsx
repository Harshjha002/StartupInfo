import React from 'react';

const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Placeholder for the header */}
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>

      {/* Placeholder for an image */}
      <div className="w-full h-48 bg-gray-300 rounded"></div>

      {/* Placeholder for content */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default Skeleton;
