import Stack from './dir/stack/Stack';
import { AuthProvider } from "./dir/contexts/useAuth";


function App() {
  return (
    <div >
      <AuthProvider>
      <Stack />
      </AuthProvider>
    </div>
  );
}

export default App;
