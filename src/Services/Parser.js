export const parseDates = (date, dayfirst) => {
  let newDate = new Date(date);
  var dd = String(newDate.getDate()).padStart(2, "0");
  var mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = newDate.getFullYear();
  if (dayfirst === true) {
    const result = dd + "/" + mm + "/" + yyyy;
    return result;
  }
  else
  {
  const result = mm + "/" + dd + "/" + yyyy;
  return result;
  }
};
export function compare(a, b) {
  if (parseInt(a.timingWeeks) < parseInt(b.timingWeeks)) {
    return -1;
  }
  if (parseInt(a.timingWeeks) > parseInt(b.timingWeeks)) {
    return 1;
  }
  return 0;
}
export function compareDates(a, b) {
    const d1 = new Date(a)
    const d2 = new Date(b)
    if (d1 < d2) {
      return -1;
    }
    if (d1> d2) {
      return 1;
    }
    return 0;
  }
  
export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const calculateAge = (birthDate) => {
  //get bday get todays date
  //minus both
  //check age in weeks
  //run query to list all the vaccine
  //filter and show only those vaccines which can be given to child
  var dob = new Date(birthDate);

  //check user provide input or not
  if (birthDate === null || birthDate === "") {
    console.log("ERROR date is null");
    return false;
  } else {
    //extract the year, month, and date from user date input
    var dobYear = dob.getYear();
    var dobMonth = dob.getMonth();
    var dobDate = dob.getDate();
    var now = new Date();
    var currentYear = now.getYear();
    var currentMonth = now.getMonth();
    var currentDate = now.getDate();
    var weekAge = 0;
    var age = {};

    //get years
    var yearAge = currentYear - dobYear;

    //get months
    if (currentMonth >= dobMonth)
      //get months when current month is greater
      var monthAge = currentMonth - dobMonth;
    else {
      yearAge--;
      var monthAge = 12 + currentMonth - dobMonth;
    }

    //get days
    if (currentDate >= dobDate)
      //get days when the current date is greater
      var dateAge = currentDate - dobDate;
    else {
      monthAge--;
      var dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
    //group the age in a single variable
    age = {
      years: parseInt(yearAge),
      months: monthAge,
      weeks: weekAge,
      days: dateAge,
    };
    if(age.years>0)
    {
      return age.years + " Years"
    }
    else if(age.months>0)
    {
      return age.months + " Months"
    }
    else if(age.weeks>0)
    {
      return age.weeks + " Weeks"
    }
    else if(age.days>0)
    {
      return age.days + " Days"
    }
  }
};

export const getLongDate = (date)=>
{
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  const d1 = new Date(date)
  return d1.toLocaleDateString("en-US", options)

}