import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Lightbulb, UserCircle, MessageCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useStore } from '../../store/useStore';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, getUnreadCount, logout } = useStore();

  const pendingConnectionsCount = currentUser?.pendingConnections.incoming.length || 0;
  const unreadMessagesCount = currentUser ? getUnreadCount(currentUser.id) : 0;

  // Don't show connection requests notification on the network page
  const showConnectionBadge = pendingConnectionsCount > 0 && location.pathname !== '/network';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer flex items-center gap-2"
            >
              <Lightbulb className="h-6 w-6" />
              Wechieve
            </h1>
          </div>

          <nav className="flex items-center gap-6">
            {currentUser && (
              <>
                <div className="relative">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/network')}
                    className="gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Network
                  </Button>
                  {showConnectionBadge && (
                    <Badge count={pendingConnectionsCount} />
                  )}
                </div>
                <div className="relative">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/messages')}
                    className="gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Messages
                  </Button>
                  {unreadMessagesCount > 0 && (
                    <Badge count={unreadMessagesCount} />
                  )}
                </div>
              </>
            )}
            <Button
              variant="secondary"
              onClick={() => navigate('/projects')}
              className="gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              Projects
            </Button>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/profile')}
                  className="gap-2"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}