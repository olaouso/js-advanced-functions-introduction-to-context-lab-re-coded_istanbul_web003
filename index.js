const { template } = require("babel-core");

function createEmployeeRecord(arr){
    let tmp =  {
      firstName  : arr[0],
      familyName  : arr[1],
      title : arr[2],
      payPerHour : arr[3],
      timeInEvents : [],
      timeOutEvents : []
    }
    return tmp;
  }

  function createEmployeeRecords(arr){
     let tmp = [];
      arr.map(x =>{
        tmp.push(createEmployeeRecord(x))
      })
      return tmp;
  }
  function createTimeInEvent(obj,stamp){
      let date = stamp.split(" ");
      let hour = stamp.split(" ");
       obj.timeInEvents.push( {
          type : "TimeIn",
          hour: parseInt(hour[1]),
          date: date[0]
      })

      return obj
  }


  function createTimeOutEvent(obj,stamp){
      let date = stamp.split(" ");
      let hour = stamp.split(" ");
       obj.timeOutEvents.push( {
          type : "TimeOut",
          hour: parseInt(hour[1]),
          date: date[0]      
        })
      return obj
  }

  function hoursWorkedOnDate(obj,stamp){
      let timeIn = obj.timeInEvents.find(x => x.date === stamp);
      let timeOut = obj.timeOutEvents.find(x => x.date === stamp);
      let int = (timeOut.hour - timeIn.hour) /100
      return int;
  }

  function wagesEarnedOnDate(obj,stamp){
    let tmp =  obj.payPerHour * hoursWorkedOnDate(obj , stamp);
    return tmp
  }


  function allWagesFor(obj) {
     let allDates = obj.timeInEvents.map(x => x.date);
     let allPay = allDates.reduce((acc, e) => {
         return acc + wagesEarnedOnDate(obj , e);
      }, 0);
      return allPay;
  }


  function findEmployeeByFirstName(arr, name) {
    let tmp =  arr.find(x => {
        return x.firstName === name
    });

    return tmp;
  }


  function calculatePayroll(arr) {
    let tmp  = arr.reduce((acc, employee) => {
        return acc + allWagesFor(employee);
    } , 0) 
    return tmp;
  }
