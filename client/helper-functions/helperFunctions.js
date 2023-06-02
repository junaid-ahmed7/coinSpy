export default {
  //HELPER FUNCS TO DETERMINE DATE AND TIME OF TRANSACTIONS COMPARED TO CATALYST DATE AND TIME

  //RETURNS FALSE IF DATE IS AFTER CATALYST, TRUE IF DATE IS OLDER OR EQUAL
  compareDates(date1, date2) {
    const [year1, month1, day1] = date1.split("-").map(Number);
    const [year2, month2, day2] = date2.split("-").map(Number);

    if (year1 !== year2) {
      return year1 < year2;
    }

    if (month1 !== month2) {
      return month1 < month2;
    }

    return day1 <= day2;
  },
  //RETURNS IF DATES EQUAL
  compareDateEquality(date1, date2) {
    const [year1, month1, day1] = date1.split("-").map(Number);
    const [year2, month2, day2] = date2.split("-").map(Number);

    return year1 === year2 && month1 === month2 && day1 === day2;
  },
  //RETURNS FALSE IF TIME IS AFTER CATALYST TIME, TRUE OTHERWISE
  compareTimes(time1, time2) {
    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = time2.split(":").map(Number);

    if (hour1 < hour2) {
      return true;
    }

    if (hour1 === hour2 && minute1 < minute2) {
      return true;
    }

    return false;
  },
  //RETURNS BOOL INDICATING WETHER SUBTRACTING OR ADDING THE CATALYST WINDOW TO THE HOURS PUSHES OUT OF BOUNDS TO ANY INVALID TIME
  checkTimeValidity(time, integer) {
    const [hours] = time.split(":").map(Number);
    // NEW HOURS DECREMENTING WINDOW
    const decreasedHour = hours - integer;
    const isValidWithDecrement = decreasedHour >= 0;

    // NEW HOURS INCREMENTED WITH WINDOW
    const increasedHour = hours + integer;
    const isValidWithAddition = increasedHour <= 23;

    return isValidWithAddition && isValidWithDecrement;
  },
  incrementTime(time, integer) {
    const [hours, minutes] = time.split(":").map(Number);

    // Calculate the new hours by adding the integer
    const newHours = (hours + integer) % 24;

    // Return the new time with leading zeros for formatting
    return `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  },
  decrementTime(time, integer) {
    const [hours, minutes] = time.split(":").map(Number);

    // Calculate the new hours by subtracting the integer
    const newHours = (hours - integer + 24) % 24;

    // Return the new time with leading zeros for formatting
    return `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  },
};
