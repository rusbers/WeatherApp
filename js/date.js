import {format} from 'date-fns';

export const getDate = {
  hourMinutes(milliseconds) {
    return format(new Date(milliseconds*1000), "HH:mm");
  },

  dayMonth(milliseconds) {
    return format(new Date(milliseconds*1000), 'dd LLLL');
  }
}