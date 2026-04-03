import { AppShell } from '@/shared/layouts/AppShell';
import { AppRoutes } from '@/app/router/router';

export function App() {
  return (
    <AppShell>
      <AppRoutes />
    </AppShell>
  );
}

export default App;
