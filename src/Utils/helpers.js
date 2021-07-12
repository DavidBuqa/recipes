import moment from 'moment';


export const toHHMM = minutes => {
    if (!minutes) {
      return '';
    }

    let hours = Math.floor(minutes / 60);
    
    if (hours < 10) {
      hours = '0' + hours;
    }

    minutes = minutes - hours * 60;

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}h ${minutes}min`;
};

export const getRandomDate = () => moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000)))
.format('YYYY/MM/DD');
