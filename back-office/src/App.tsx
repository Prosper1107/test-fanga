import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import StationDetailPage from './pages/StationDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { LayoutSkeleton } from './components/layout/LayoutSkeleton';

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app resource loading
    const timer = setTimeout(() => setIsAppLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <LayoutSkeleton />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="stations/:id" element={<StationDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
