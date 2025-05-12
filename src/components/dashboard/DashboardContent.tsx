
import { ReactNode } from "react";

interface DashboardContentProps {
  pageTitle: string;
  children: ReactNode;
}

export default function DashboardContent({ pageTitle, children }: DashboardContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>
        
        {children}
      </div>
    </main>
  );
}
