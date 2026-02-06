import { UserSettings } from '@/store/settings';

export type UserFormData = Omit<UserSettings, 'id'>;