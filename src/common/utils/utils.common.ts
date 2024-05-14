export const formatTimePlayer = (duration: number) => {
  if (duration < 0) return;
  const hours = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = Math.floor(duration % 60);

  let timePlayer = '';

  if (hours > 0) {
    timePlayer += '' + hours + ':' + (mins < 10 ? '0' : '');
  }

  timePlayer += '' + mins + ':' + (secs < 10 ? '0' : '');
  timePlayer += '' + secs;
  return timePlayer;
};
