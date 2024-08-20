export const generateRandomKey = (text: string | number) => {
  const randomNumber = Math.floor(Math.random() * Date.now());
  return `${text}-${randomNumber}`;
};
