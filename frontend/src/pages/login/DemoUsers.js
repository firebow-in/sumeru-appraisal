import React from 'react';

const DemoUsers = ({ onDemoLogin }) => {
  const demoUsers = [
    { role: 'employee', label: '👤 Employee', color: '#3b82f6' },
    { role: 'hr', label: '👥 HR Manager', color: '#10b981' },
    { role: 'pm', label: '📋 Project Manager', color: '#f59e0b' },
    { role: 'ceo', label: '👑 CEO', color: '#8b5cf6' },
    { role: 'intern', label: '🎓 Intern', color: '#06b6d4' },
  ];

  return (
    <div className="demo-users">
      <h3>Demo Users</h3>
      <div className="demo-buttons">
        {demoUsers.map((user) => (
          <button
            key={user.role}
            className={`demo-btn ${user.role}`}
            onClick={() => onDemoLogin(user.role)}
            style={{ '--hover-color': user.color }}
          >
            {user.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoUsers;

