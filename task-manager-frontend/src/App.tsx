import React from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <TaskForm />
        <TaskList />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 text-sm">
        <p>Task Manager UI © 2025 | Built for Cybermax test</p>
      </footer>
    </div>
  );
};

export default App;