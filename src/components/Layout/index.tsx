import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';

export function Layout() {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleUpdatePassword = () => {
    console.log('Update password clicked');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-52 flex flex-col">
        <DashboardHeader onRefresh={handleRefresh} onUpdatePassword={handleUpdatePassword} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}