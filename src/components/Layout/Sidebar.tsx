import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  CreditCard,
  Wallet,
  Wallet2,
  Banknote,
  Upload,
  PhoneCall,
  Phone,
  Search,
  Users,
  Menu,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  hasArrow?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Revenue settlement', path: '/revenue-settlement', icon: <DollarSign size={18} /> },
  { label: 'Reports', path: '/reports', icon: <FileText size={18} /> },
  { label: 'Cash Memo', path: '/cash-memo', icon: <CreditCard size={18} /> },
  { label: 'Cash Deposit', path: '/cash-deposit', icon: <Wallet size={18} /> },
  { label: 'Opening Balance', path: '/opening-balance', icon: <Wallet2 size={18} /> },
  { label: 'Salary', path: '/salary', icon: <Banknote size={18} /> },
  { label: 'Bulk Upload', path: '/bulk-upload', icon: <Upload size={18} /> },
  { label: 'Call Upload', path: '/call-upload', icon: <PhoneCall size={18} /> },
  { label: 'User Creation', path: '/setup/users', icon: <Users size={18} /> },
  { label: 'Calls', path: '/calls', icon: <Phone size={18} />, hasArrow: true },
  { label: 'Calls Search', path: '/calls-search', icon: <Search size={18} /> },
  { label: 'Customers', path: '/customers', icon: <Users size={18} /> },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-52 bg-gradient-to-b from-gray-50 to-white h-screen fixed left-0 top-0 shadow-sm overflow-y-auto border-r border-gray-100">
      <div className="p-4 flex items-center gap-2 border-b border-gray-100">
        <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-xs">ETCR</span>
        </div>
        <button className="ml-auto text-gray-600 hover:text-gray-900">
          <Menu size={20} />
        </button>
      </div>

      <nav className="p-2 pt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5
                transition-all duration-200
                ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <span className={`${isActive ? 'text-white' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span className="text-sm flex-1">{item.label}</span>
              {item.hasArrow && (
                <ChevronRight size={14} className={isActive ? 'text-white' : 'text-gray-400'} />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
