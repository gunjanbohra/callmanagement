import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userSettingsState } from '@/store/settings';
import { UserSettings } from '@/store/settings';
import { validateMobile } from '@/utils/validation';
import { UserFormData } from '../types';

const initialFormData: UserFormData = {
  name: '',
  mobile: '',
  pin: '',
  userType: 'field_engineer',
};

export function useUserSetup() {
  const [users, setUsers] = useRecoilState(userSettingsState);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const validateForm = (): boolean => {
    if (!validateMobile(formData.mobile)) {
      setError('Please enter a valid mobile number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (editingId) {
        setUsers(prev =>
          prev.map(user =>
            user.id === editingId
              ? { ...formData, id: editingId }
              : user
          )
        );
        setSuccess('User updated successfully');
      } else {
        setUsers(prev => [
          ...prev,
          { ...formData, id: Date.now().toString() }
        ]);
        setSuccess('User added successfully');
      }

      setFormData(initialFormData);
      setEditingId(null);
    } catch (err) {
      setError('Failed to save user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user: UserSettings) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      mobile: user.mobile,
      pin: user.pin,
      userType: user.userType,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      setUsers(prev => prev.filter(user => user.id !== id));
      setSuccess('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return {
    users,
    formData,
    editingId,
    error,
    success,
    isLoading,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
}