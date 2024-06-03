export const validDateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};
export const validDatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  if (passwordRegex.test(password)) {
    return true;
  }
  return false;
};
