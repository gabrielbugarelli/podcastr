export const convertDurationToTimeString = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  //Converte hours, minutes e seconds para 00:00:00
  const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, "0"))
    .join(":");

  return timeString;
}
