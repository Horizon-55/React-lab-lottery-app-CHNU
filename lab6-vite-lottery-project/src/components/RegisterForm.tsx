import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { Participant, FormErrors, FormTouched } from '../types/Participant';
import { validateEmail, validatePhone, validateName, validateDate, formatPhoneNumber } from '../utils/validation';

interface RegisterFormProps {
  onAddParticipant: (participant: Omit<Participant, 'id'>) => void;
  existingParticipants: Participant[];
}

export const RegisterForm = ({ onAddParticipant, existingParticipants }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: ''
  });

  const [touched, setTouched] = useState<FormTouched>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email': {
        // Перевіряємо формат email
        const emailError = validateEmail(value);
        if (emailError) return emailError;
        
        // Перевіряємо унікальність
        const emailExists = existingParticipants.some(p => p.email === value);
        if (emailExists) {
          return 'This email is already taken.';
        }
        return undefined;
      }
      case 'phone':
        return validatePhone(value);
      case 'dateOfBirth':
        return validateDate(value);
      default:
        return undefined;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Валідація тільки якщо поле було touched
    if (touched[name as keyof FormTouched]) {
      const error = validateField(name, processedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валідація всіх полів
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateField('email', formData.email),
      phone: validatePhone(formData.phone),
      dateOfBirth: validateDate(formData.dateOfBirth)
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      dateOfBirth: true
    });

    // Перевірка чи є помилки
    const hasErrors = Object.values(newErrors).some(error => error !== undefined);
    
    if (!hasErrors) {
      onAddParticipant(formData);
      
      // Очищення форми без спрацювання валідації
      setFormData({
        name: '',
        dateOfBirth: '',
        email: '',
        phone: ''
      });
      setTouched({});
      setErrors({});
    }
  };

  // Обробка Enter для submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const getInputClass = (fieldName: keyof FormErrors) => {
    const baseClass = 'form-control';
    if (!touched[fieldName]) return baseClass;
    if (errors[fieldName]) return `${baseClass} is-invalid`;
    if (formData[fieldName]) return `${baseClass} is-valid`;
    return baseClass;
  };

  const isFieldValid = (fieldName: keyof FormErrors) => {
    return !!(touched[fieldName] && !errors[fieldName] && formData[fieldName]);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h3 className="card-title">REGISTER FORM</h3>
        <p className="text-muted">Please fill in all the fields.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <div className="position-relative">
              <input
                type="text"
                className={getInputClass('name')}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Enter user name"
              />
              {isFieldValid('name') && (
                <span className="position-absolute top-50 end-0 translate-middle-y me-3 text-success">
                  ✓
                </span>
              )}
            </div>
            {touched.name && errors.name && (
              <div className="invalid-feedback d-block">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input
              type="date"
              className={getInputClass('dateOfBirth')}
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="mm/dd/yyyy"
            />
            {touched.dateOfBirth && errors.dateOfBirth && (
              <div className="invalid-feedback d-block">{errors.dateOfBirth}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="position-relative">
              <input
                type="email"
                className={getInputClass('email')}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Enter email"
              />
              {isFieldValid('email') && (
                <span className="position-absolute top-50 end-0 translate-middle-y me-3 text-success">
                  ✓
                </span>
              )}
            </div>
            {touched.email && errors.email && (
              <div className="invalid-feedback d-block">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone number</label>
            <div className="position-relative">
              <input
                type="text"
                className={getInputClass('phone')}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Enter Phone number"
              />
              {isFieldValid('phone') && (
                <span className="position-absolute top-50 end-0 translate-middle-y me-3 text-success">
                  ✓
                </span>
              )}
            </div>
            {touched.phone && errors.phone && (
              <div className="invalid-feedback d-block">{errors.phone}</div>
            )}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-info text-white px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

