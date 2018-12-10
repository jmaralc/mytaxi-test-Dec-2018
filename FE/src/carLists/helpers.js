export default (interior, exterior) => {
  if (interior === 'GOOD' && exterior === 'GOOD') {
    return 4;
  }
  if (interior === 'GOOD' && exterior === 'UNACCEPTABLE') {
    return 3;
  }
  if (interior === 'UNACCEPTABLE' && exterior === 'GOOD') {
    return 2;
  }
  if (interior === 'UNACCEPTABLE' && exterior === 'UNACCEPTABLE') {
    return 1;
  }
  return 0;
};
