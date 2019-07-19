import React from 'react';

const withLoading = Component => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) return (<Component {...props} />)
    return (
      <div className="loader-overlay">
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      </div>
    );
  }
}

export default withLoading;