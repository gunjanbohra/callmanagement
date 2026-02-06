import { Box, Paper } from '@mui/material';
import { PageTitle } from '@/components/common/PageTitle';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { useUserSetup } from './hooks/useUserSetup';

export function UserSetup() {
  const {
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
  } = useUserSetup();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <PageTitle 
          title="User Setup" 
          subtitle="Manage user accounts and permissions"
        />

        <UserForm
          data={formData}
          error={error}
          success={success}
          isLoading={isLoading}
          isEditing={!!editingId}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>
    </Box>
  );
}