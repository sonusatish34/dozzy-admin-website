import React from 'react';

const ComponentName = (props) => {
  function GetBooking() {
    // Example start and end times
    var start = new Date('2024-09-11T13:00:00'); // Start: 14th Sept 2024, 1:00 PM
    var end = new Date('2024-09-19T10:00:00'); // End: 18th Sept 2024, 11:00 AM

    // Function to calculate the difference in full hours (rounded)
    function getHourDifference(start, end) {
      const millisecondsInHour = 1000 * 60 * 60;

      // Calculate the difference in milliseconds
      var diffInMillis = end - start;

      // Convert milliseconds to hours
      return Math.round(diffInMillis / millisecondsInHour); // Rounding to nearest full hour
    }

    // Get the hour difference
    var hourDiff = getHourDifference(start, end);

    // Log the result for debugging
    return hourDiff
    console.log(hourDiff, "hourDiff"); // This should log the number of hours between start and end
  }

  GetBooking();


  function GetBooking2(start, end) {
    // Example start and end times
    var start = new Date(start); // Start: 14th Sept 2024, 1:00 PM
    var end = new Date(end); // End: 18th Sept 2024, 11:00 AM

    // Function to calculate the difference in full calendar days
    function getDayDifference(start, end) {
      const millisecondsInDay = 1000 * 60 * 60 * 24;

      // Set both start and end time to midnight (00:00:00)
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      // Calculate the difference in days
      return (end - start) / millisecondsInDay;
    }

    // Get the day difference (this will give you the full calendar days)
    var dayDiff = getDayDifference(start, end);

    // Round to the nearest whole number (because you want full days)
    dayDiff = Math.round(dayDiff);
    return dayDiff
    // Log the result for debugging
    console.log(dayDiff, "dayDiff"); // This should log '4'
  }

  GetBooking2('2024-11-24T11:00:00', '2024-11-27T12:00:00'); // Call the function to test with example dates
  return (
    <div>
      HIII
      <div class="flex justify-center items-center h-screen">
        <div class="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>


    </div>
  );
};

export default ComponentName;