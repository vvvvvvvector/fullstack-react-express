export const formatDate = (createdAt: string) => {
  const d = new Date(createdAt);

  const fullYear = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  const dateAndTime: string = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + (month + 1) : month + 1
  }-${fullYear} at ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

  return dateAndTime;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export const setUserToken = (token: string) => {
  window.localStorage.setItem("jwt-token", token);
};

export const getUserToken = () => {
  return window.localStorage.getItem("jwt-token");
};

export const clearUserToken = () => {
  window.localStorage.removeItem("jwt-token");
};
