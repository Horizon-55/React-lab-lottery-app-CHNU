import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import type { Participant, FormErrors, FormTouched } from '../types/Participant';
import { validateEmail, validatePhone, validateName, validateDate, formatPhoneNumber } from '../utils/validation';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface EditParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant | null;
  onUpdate: (id: string, updatedData: Omit<Participant, 'id'>) => void;
  existingParticipants: Participant[];
}

export const EditParticipantModal = ({
  isOpen,
  onClose,
  participant,
  onUpdate,
  existingParticipants
}: EditParticipantModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: ''
  });

  const [touched, setTouched] = useState<FormTouched>({});
  const [errors, setErrors] = useState<FormErrors>({});

  // Заповнюємо форму даними учасника при відкритті
  useEffect(() => {
    if (participant) {
      setFormData({
        name: participant.name,
        dateOfBirth: participant.dateOfBirth,
        email: participant.email,
        phone: participant.phone
      });
      setTouched({});
      setErrors({});
    }
  }, [participant]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email': {
        // Перевіряємо унікальність email, виключаючи поточний email учасника
        const emailError = validateEmail(value);
        if (emailError) return emailError;
        
        const emailExists = existingParticipants.some(
          p => p.email === value && p.id !== participant?.id
        );
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

    if (!participant) return;

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

    const hasErrors = Object.values(newErrors).some(error => error !== undefined);
    
    if (!hasErrors) {
      onUpdate(participant.id, formData);
      onClose();
    }
  };

  const isFieldValid = (fieldName: keyof FormErrors) => {
    return !!(touched[fieldName] && !errors[fieldName] && formData[fieldName]);
  };

  if (!participant) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Participant"
      footer={
        <>
          <Button variant="danger" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={() => handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>)}>
            Update Data
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="edit-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter user name"
          error={touched.name ? errors.name : undefined}
          isValid={isFieldValid('name')}
        />

        <Input
          label="Date of Birth"
          type="date"
          id="edit-dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.dateOfBirth ? errors.dateOfBirth : undefined}
          isValid={isFieldValid('dateOfBirth')}
        />

        <Input
          label="Email"
          type="email"
          id="edit-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email"
          error={touched.email ? errors.email : undefined}
          isValid={isFieldValid('email')}
        />

        <Input
          label="Phone number"
          type="text"
          id="edit-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Phone number"
          error={touched.phone ? errors.phone : undefined}
          isValid={isFieldValid('phone')}
        />
      </form>
    </Modal>
  );
};

