const domModule = (() => {
  const timeDisp = document.getElementById("timeDisp");
  const dateDisp = document.getElementById("dateDisp");

  function setTime(timeStr) {
    timeDisp.textContent = timeStr;
  }

  function setDate(dateStr) {
    dateDisp.textContent = dateStr;
  }

  return { setTime, setDate };
})();

const clockModule = (() => {
  // get the current time, but it seems have to piece together the time
  const date = {
    day: 0,
    date: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    abbrv: "",

    _init() {
      const newDate = new Date();

      // new date
      this.day = newDate.getDay();
      this.date = newDate.getDate();
      this.month = newDate.getMonth();
      this.year = newDate.getFullYear();

      // new time
      this.seconds = newDate.getSeconds();
      this.minutes = newDate.getMinutes();
      this.hours = newDate.getHours() % 12 || 12;
      this.abbrv = newDate.getHours() < 12 ? "AM" : "PM";
    },
    _update() {
      // seconds
      if (this.seconds < 59) this.seconds++;
      else this.seconds = 0;

      // minutes
      if (this.seconds === 0) {
        if (this.minutes < 59) this.minutes++;
        else this.minutes = 0;
      }

      // hours
      if (this.seconds === 0 && this.minutes === 0) {
        if (this.hours < 12) {
          // abbrv
          if (this.hours === 11) {
            this.abbrv = this.abbrv === "AM" ? "PM" : "AM";
          }
          this.hours++;
        } else this.hours = 1;
      }
    },
    _toTimeString() {
      let timeStr = "";

      // build the formatted string
      timeStr += ("0" + this.hours).slice(-2) + ":";
      timeStr += ("0" + this.minutes).slice(-2) + ":";
      timeStr += ("0" + this.seconds).slice(-2) + " " + this.abbrv;

      return timeStr;
    },
    _toDateString() {
      const dayLong = dateUtil.getDayLong(this.day);
      const monthLong = dateUtil.getMonthLong(this.month);
      const dateLong = dateUtil.addSuffix(this.date);

      return `${dayLong}, ${monthLong} ${dateLong} ${this.year}`;
    },
  };

  // main
  function start() {
    initClock();
    setInterval(updateClock, 1000);
  }

  function initClock() {
    date._init();
    domModule.setTime(date._toTimeString());
    domModule.setDate(date._toDateString());
  }

  function updateClock() {
    date._update();
    domModule.setTime(date._toTimeString());
  }

  return { start };
})();

dateUtil = (() => {
  function getDayLong(dayInt) {
    switch (dayInt) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
    }
  }

  function getMonthLong(monthInt) {
    switch (monthInt) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  }

  function addSuffix(dateInt) {
    const firsts = [1, 21, 31];
    const seconds = [2, 22];
    const thirds = [3, 23];

    if (firsts.includes(dateInt)) {
      return dateInt + "st";
    } else if (seconds.includes(dateInt)) {
      return dateInt + "nd";
    } else if (thirds.includes(dateInt)) {
      return dateInt + "rd";
    } else return dateInt + "th";
  }

  return { getDayLong, getMonthLong, addSuffix };
})();

clockModule.start();
