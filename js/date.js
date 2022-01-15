function getHour(milliseconds) {
  const time = new Date(milliseconds*1000);
  const hour = addZero(time.getHours());
  const minutes = addZero(time.getMinutes());
  
  return `${hour}:${minutes}`;
}

function getDayMonth(milliseconds) {
  const time = new Date(milliseconds*1000);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = time.getMonth();

  const month = months[monthIndex];
  const day = time.getDate();

  return `${day} ${month}`;
}

function addZero(time) {
  return (time < 10) ? '0' + time : time;
}

export { getHour, getDayMonth }