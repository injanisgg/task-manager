import React, { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import { generateTaskReport } from "../utils/pdfGenerator";
import { Download, Loader2 } from "lucide-react";

const Header: React.FC = () => {
  const { tasks } = useTaskStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
        generateTaskReport(tasks);

        await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
        setIsDownloading(false);
    }
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-2 py-3 md:px-4 md:py-6">
        <div className="flex flex-col justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-center">Task Manager</h1>
            <p className="text-blue-100 mt-1 text-center">
              Manage your tasks efficiently
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Stats */}
            <div className="flex gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm text-center">
                <div className="font-semibold">{tasks.length}</div>
                <div className="text-xs text-blue-100">Total</div>
              </div>
              <div className="bg-green-500/30 px-4 py-2 rounded-lg backdrop-blur-sm text-center">
                <div className="font-semibold">{completedCount}</div>
                <div className="text-xs text-green-100">Completed</div>
              </div>
              <div className="bg-yellow-500/30 px-4 py-2 rounded-lg backdrop-blur-sm text-center">
                <div className="font-semibold">{pendingCount}</div>
                <div className="text-xs text-yellow-100">Pending</div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadReport}
              disabled={tasks.length === 0 || isDownloading}
              className="w-full bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              {isDownloading ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Downloading...
                </>
              ) : (
                <>
                    <Download className="h-5 w-5" />
                    Download Report
                </> 
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;