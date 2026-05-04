import React from 'react';

const OrderProgress = ({ currentStep = 1 }) => {
  const steps = [
    { icon: 'calendar-plus', label: 'Schedule' },
    { icon: 'credit-card', label: 'Payment' },
    { icon: 'truck', label: 'Pickup' },
    { icon: 'check-circle', label: 'Complete' }
  ];

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center position-relative">
        {steps.map((step, index) => (
          <div key={index} className="text-center flex-fill position-relative" style={{ zIndex: 2 }}>
            <div className={`mx-auto mb-2 d-flex align-items-center justify-content-center ${
              index + 1 <= currentStep ? 'bg-success text-white' : 'bg-light text-muted'
            }`} style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              boxShadow: index + 1 <= currentStep ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none'
            }}>
              <i className={`fas fa-${step.icon} fa-sm`}></i>
            </div>
            <small className={index + 1 <= currentStep ? 'text-success fw-bold' : 'text-muted'}>
              {step.label}
            </small>
          </div>
        ))}
        
        {/* Progress line behind the circles */}
        <div className="position-absolute w-100" style={{
          height: '2px',
          backgroundColor: '#e5e7eb',
          top: '20px',
          zIndex: 1
        }}>
          <div 
            className="h-100 transition-all"
            style={{
              backgroundColor: '#10b981',
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;