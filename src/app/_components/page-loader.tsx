import React from 'react';
import { GrSend } from 'react-icons/gr';

interface PageLoaderProps {
    isLoading: boolean;
}

const PageLoader = ({ isLoading }: PageLoaderProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="page-loader-overlay">
      <div className="page-loader-content">
        <GrSend className="email-flow-icon" />
        {/* <p>Sending your email...</p> */}
      </div>
    </div>
  );
};

export default PageLoader;