import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { sidebarState } from '@/store/ui';

export function Layout() {
  const isSidebarOpen = useRecoilValue(sidebarState);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleUpdatePassword = () => {
    console.log('Update password clicked');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-52' : 'ml-16'
        }`}
      >
        <DashboardHeader onRefresh={handleRefresh} onUpdatePassword={handleUpdatePassword} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}