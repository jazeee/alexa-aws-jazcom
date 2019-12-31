exports.getTrendName = (trend) => {
  // https://materialdesignicons.com/
  switch (trend) {
    case 1:
      return 'Up Up Up';
    case 2:
      return 'up';
    case 3:
      return 'upish';
    case 4:
      return 'steady';
    case 5:
      return 'downish';
    case 6:
      return 'down';
    case 7:
      return 'down down down';
    default:
      return 'unknown';
  }
};
