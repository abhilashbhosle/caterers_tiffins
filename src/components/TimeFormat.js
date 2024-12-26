export const timeSince=(date)=> {
    var ms = new Date().getTime() - new Date(date).getTime();
    var seconds = Math.floor(ms / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);
    if (seconds < 1) {
      return "Just now";
    }
    if (seconds < 60) {
      return seconds + "s";
    }
    if (minutes < 60) {
      return minutes + "m";
    }
    if (hours < 24) {
      return hours + (hours<1 ?" hour ago":" hours ago");
    }
    if (days < 30) {
      return days + (days<1?" day ago":" days ago");
    }
    if (months < 12) {
      return months + (months<1?" month ago":" months ago");
    } else {
      return years + "y";
    }
  }