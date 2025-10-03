import React from 'react';
import DashboardCard from './DashboardCard';

const TopPerformerCard = () => {
  return (
    <DashboardCard 
      title="Top Performer of the Month"
      size="medium"
      variant="accent"
    >
      <div className="card-content-space-between">
        <div className="performer-info">
          <div className="performer-name-badge">ABC</div>
          <div className="performer-role">Junior Web Developer</div>
        </div>
        <div className="performer-avatar">
          <div className="performer-image"></div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default TopPerformerCard;
