import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Holidays.css';

const Holidays = () => {
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const holidaysData = [
      {
        date: new Date(currentYear, 0, 1),
        name: "New Year",
        isFloater: true
      },
      {
        date: new Date(currentYear, 0, 14),
        name: "Makar Sankranti",
        isFloater: false
      },
      {
        date: new Date(currentYear, 1, 26),
        name: "Maha Shivratri",
        isFloater: true
      },
      {
        date: new Date(currentYear, 2, 14),
        name: "Holi",
        isFloater: true
      },
      {
        date: new Date(currentYear, 2, 31),
        name: "Id-ul-Fitr (Ramzan)",
        isFloater: true
      },
      {
        date: new Date(currentYear, 3, 18),
        name: "Good Friday",
        isFloater: true
      },
      {
        date: new Date(currentYear, 4, 1),
        name: "May Day",
        isFloater: false
      },
      {
        date: new Date(currentYear, 5, 6),
        name: "Bakrid",
        isFloater: true
      },
      {
        date: new Date(currentYear, 7, 8),
        name: "Varamahalakshmi",
        isFloater: true
      },
      {
        date: new Date(currentYear, 7, 15),
        name: "Independence Day",
        isFloater: false
      },
      {
        date: new Date(currentYear, 7, 27),
        name: "Ganesh Chaturthi",
        isFloater: false
      },
      {
        date: new Date(currentYear, 8, 5),
        name: "Onam / Birthday of Prophet Mohammad",
        isFloater: true
      },
      {
        date: new Date(currentYear, 8, 30),
        name: "Maha Ashtami",
        isFloater: false
      },
      {
        date: new Date(currentYear, 9, 1),
        name: "Maha Navami",
        isFloater: true
      },
      {
        date: new Date(currentYear, 9, 2),
        name: "Gandhi Jayanti / Dussehra",
        isFloater: false
      },
      {
        date: new Date(currentYear, 9, 21),
        name: "Diwali",
        isFloater: false
      },
      {
        date: new Date(currentYear, 11, 25),
        name: "Christmas",
        isFloater: false
      }
    ];

    setHolidays(holidaysData);
  }, [currentYear]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleYearChange = (direction) => {
    if (direction === 'prev') {
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentYear(prev => prev + 1);
    }
  };

  const getMonthColor = (month) => {
    const colors = {
      0: '#e0f2fe', // January - light blue
      1: '#fce7f3', // February - pink
      2: '#fef3c7', // March - light brown
      3: '#dbeafe', // April - light blue
      4: '#fef3c7', // May - yellow
      5: '#e9d5ff', // June - purple
      6: '#fce7f3', // July - light pink
      7: '#dbeafe', // August - light blue
      8: '#dbeafe', // September - light blue
      9: '#fecaca', // October - red
      10: '#f3f4f6', // November - gray
      11: '#1e40af' // December - dark blue
    };
    return colors[month] || '#f3f4f6';
  };

  const getMonthTextColor = (month) => {
    return month === 11 ? '#ffffff' : '#374151'; // White text for December (dark blue background)
  };

  const getMonthAbbr = (month) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[month];
  };

  const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const isHolidayPassed = (holidayDate) => {
    const today = new Date();
    const holiday = new Date(holidayDate);
    
    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0);
    holiday.setHours(0, 0, 0, 0);
    
    return holiday < today;
  };

  return (
    <div className="holidays-page">
      <div className="holidays-container">
        <div className="holidays-header">
          <h1 className="holidays-title">Holidays</h1>
          <div className="year-navigation">
            <button 
              className="nav-arrow" 
              onClick={() => handleYearChange('prev')}
              aria-label="Previous year"
            >
              ←
            </button>
            <span className="current-year">{currentYear}</span>
            <button 
              className="nav-arrow" 
              onClick={() => handleYearChange('next')}
              aria-label="Next year"
            >
              →
            </button>
          </div>
          <button 
            className="close-button" 
            onClick={handleClose}
            aria-label="Close holidays"
          >
            ✕
          </button>
        </div>

        <div className="holidays-grid">
          {holidays.map((holiday, index) => {
            const isPassed = isHolidayPassed(holiday.date);
            return (
              <div key={index} className={`holiday-item ${isPassed ? 'disabled' : ''}`}>
                <div 
                  className="date-box"
                  style={{ 
                    backgroundColor: isPassed ? '#f3f4f6' : getMonthColor(holiday.date.getMonth()),
                    color: isPassed ? '#9ca3af' : getMonthTextColor(holiday.date.getMonth())
                  }}
                >
                  <div className="month-abbr">{getMonthAbbr(holiday.date.getMonth())}</div>
                  <div className="day-number">{holiday.date.getDate().toString().padStart(2, '0')}</div>
                </div>
                <div className="holiday-info">
                  <div className={`holiday-name ${isPassed ? 'disabled-text' : ''}`}>{holiday.name}</div>
                  <div className={`holiday-day ${isPassed ? 'disabled-text' : ''}`}>{getDayOfWeek(holiday.date)}</div>
                  {holiday.isFloater && (
                    <div className={`floater-tag ${isPassed ? 'disabled-tag' : ''}`}>FLOATER LEAVE</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Holidays;
