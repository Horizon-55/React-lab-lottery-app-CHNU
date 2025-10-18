export interface Participant {
  id: string;
  name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

export interface FormErrors {
  name?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
}

export interface FormTouched {
  name?: boolean;
  dateOfBirth?: boolean;
  email?: boolean;
  phone?: boolean;
}

