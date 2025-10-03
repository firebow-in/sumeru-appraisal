import React from 'react';
import DashboardCard from './DashboardCard';
import AppraisalProgress from '../AppraisalProgress';

const AppraisalCard = ({ percentage, onClick }) => {
  return (
    <DashboardCard 
      size="large"
      onClick={onClick}
      className="clickable"
    >
      <AppraisalProgress percentage={percentage} />
    </DashboardCard>
  );
};

export default AppraisalCard;
