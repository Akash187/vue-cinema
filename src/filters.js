import Vue from 'vue';

Vue.filter('formatRuntime', function(value) {
  let hour = Math.floor(parseInt(value) / 60);
  let minute = parseInt(value) % 60;
  return `${hour}hr ${minute}min`
});

Vue.filter('formatDate', function(value) {
  let year = value.substring(0, 4);
  let month = monthNumToLetter(value.substring(5,7));
  let date = value.substring(8,10);
  return `${date} ${month} ${year}`
});

function monthNumToLetter(month) {
  switch (month){
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
  }
}
