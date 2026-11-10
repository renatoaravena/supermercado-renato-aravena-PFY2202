import { InventarioProvider } from './context/InventarioContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <InventarioProvider>
      <AppRoutes />
    </InventarioProvider>
  );
}
