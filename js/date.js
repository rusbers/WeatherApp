import {format} from 'date-fns';

function getHour(milliseconds) {
  return format(new Date(milliseconds*1000), "HH:mm");
}

function getDayMonth(milliseconds) {
  return format(new Date(milliseconds*1000), 'dd LLLL');
}

export { getHour, getDayMonth }