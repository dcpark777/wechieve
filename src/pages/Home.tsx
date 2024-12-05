import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center py-12">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Connect. Collaborate. Create.
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
        Join a community of innovators and bring your ideas to life. Find the perfect collaborators
        for your next big project or become part of something amazing.
      </p>
      <div className="flex gap-4">
        <Button
          size="lg"
          onClick={() => navigate('/projects')}
          className="gap-2"
        >
          Explore Projects
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate('/network')}
        >
          Browse Network
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Share Your Vision</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Post your project ideas and find talented collaborators who share your passion.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Build Your Network</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Connect with like-minded professionals and expand your professional circle.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Make It Happen</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Turn ideas into reality with a supportive community backing your success.
          </p>
        </div>
      </div>
    </div>
  );
}