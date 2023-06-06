interface DateTimeInterface {
  compareDateTimes(datetime1: string, datetime2: string): Boolean;
  convertStringToDate(datetimeString: string): Date;
}

export const dateTimeUtils: DateTimeInterface = {
  // RETURNS TRUE IF DATETIME1 IS AFTER DATETIME2, FALSE OTHERWISE
  compareDateTimes(datetime1: string, datetime2: string): boolean {
    const date1 = new Date(datetime1);
    const date2 = new Date(datetime2);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      throw new Error(
        "Invalid datetime format. Please provide datetime strings in the format: YYYY-MM-DDTHH:MM"
      );
    }
    return date1 > date2;
  },
  convertStringToDate(datetimeString: string): Date {
    const [datePart, timePart] = datetimeString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    const dateObject = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );
    return dateObject;
  },
};
