const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\(\d{3}\)\s\d{3}-\d{4}$/;

export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return 'This value is required.';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address.';
  }
  return undefined;
};

export const validatePhone = (phone: string): string | undefined => {
  if (!phone) {
    return 'This value is required.';
  }
  if (!PHONE_REGEX.test(phone)) {
    return 'Please enter a valid phone number.';
  }
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name) {
    return 'This value is required.';
  }
  return undefined;
};

export const validateDate = (date: string): string | undefined => {
  if (!date) {
    return 'This value is required.';
  }
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate > today) {
    return 'Date of birth cannot be in the future.';
  }
  return undefined;
};

export const formatPhoneNumber = (value: string): string => {
  // Видаляємо всі нецифрові символи
  const numbers = value.replace(/\D/g, '');
  
  // Обмежуємо до 10 цифр
  const limited = numbers.slice(0, 10);
  
  // Форматуємо відповідно до маски (___) ___-____
  if (limited.length === 0) {
    return '';
  } else if (limited.length <= 3) {
    return `(${limited}`;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  } else {
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
  }
};

