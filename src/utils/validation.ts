export const validateMobile = (mobile: string): boolean => {
  return /^[0-9]{10}$/.test(mobile);
};

export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePin = (pin: string): boolean => {
  return /^[0-9]{4}$/.test(pin);
};