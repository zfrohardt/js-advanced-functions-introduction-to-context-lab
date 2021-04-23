// Your code here

// creates a new employee record
let createEmployeeRecord = args => {
    return {
        firstName: args[0],
        familyName: args[1],
        title: args[2],
        payPerHour: args[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

// creates an array of employee records
let createEmployeeRecords = records => {
    return records.map(createEmployeeRecord);
}

// creates a time in event for a given employee
let createTimeInEvent = (employee, timeStamp) => {
    let ts = parseTimeStamp(timeStamp);
    employee.timeInEvents.push({
        type: "TimeIn",
        date: ts.date,
        hour: ts.hour,
    })

    return employee;
}

// creates a time out event for a given employee
let createTimeOutEvent = (employee, timeStamp) => {
    let ts = parseTimeStamp(timeStamp);
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: ts.date,
        hour: ts.hour,
    })

    return employee;
}

// returns the number of hours worked on a given employee and date
let hoursWorkedOnDate = (employee, timeStamp) => {
    let date = parseTimeStamp(timeStamp).date;
    let timeIn = employee.timeInEvents.find(timeIn => timeIn.date === date);
    let timeOut = employee.timeOutEvents.find(timeOut => timeOut.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// returns the wages earned by an employee on a given date
let wagesEarnedOnDate = (employee, timeStamp) => {
    return employee.payPerHour * hoursWorkedOnDate(employee, timeStamp);
}

// finds an employee by first name
let findEmployeeByFirstName = (employees, firstName) => {
    return employees.find(employee => employee.firstName === firstName);
}

// sums all the wages an employee has earned
let allWagesFor = employee => {
    return employee.timeInEvents.reduce((acc, timeInEvent) => {
        return acc + wagesEarnedOnDate(employee, timeInEvent.date)
    }, 0)
}

// calculates payroll for all employees
let calculatePayroll = employees => {
    return employees.reduce((acc, employee) => {
        return acc + allWagesFor(employee);
    }, 0)
}

// parses a timestamp into date and hour
let parseTimeStamp = timeStamp => {
    return {
        date: timeStamp.split(" ")[0],
        hour: Number.parseInt(timeStamp.split(" ")[1])
    };
}