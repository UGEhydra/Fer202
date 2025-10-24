import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import LoginForm from "./components/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <ThemeProvider>
        <CounterComponent />
        <LightSwitch />
      </ThemeProvider>

      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </div>
  );
}

export default App;
