// src/App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import tất cả 6 bài
import CounterComponent from "./components/CounterComponent";          // Exercise 1
import ToggleComponent from "./components/ToggleComponent";            // Exercise 2
import LoginForm from "./components/LoginForm";                        // Exercise 3
import SignUpForm from "./components/SignUpForm";                      // Exercise 4
import QuestionBank from "./components/QuestionBank";                  // Exercise 5
import QuestionBankAdvanced from "./components/QuestionBankAdvanced";  // Exercise 6

function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🎯 Hook Exercises – useReducer & useContext</h1>

      {/* Exercise 1 */}
      <section className="mb-5 p-4 border rounded shadow-sm">
        <h3>Exercise 1: CounterComponent</h3>
        <CounterComponent />
      </section>

      {/* Exercise 2 */}
      <section className="mb-5 p-4 border rounded shadow-sm">
        <h3>Exercise 2: ToggleComponent</h3>
        <ToggleComponent />
      </section>

      {/* Exercise 3 */}
      <section className="mb-5 p-4 border rounded shadow-sm">
        <h3>Exercise 3: LoginForm</h3>
        <LoginForm />
      </section>

      {/* Exercise 4 */}
      <section className="mb-5 p-4 border rounded shadow-sm">
        <h3>Exercise 4: SignUpForm</h3>
        <SignUpForm />
      </section>

      {/* Exercise 5 */}
      <section className="mb-5 p-4 border rounded shadow-sm">
        <h3>Exercise 5: QuestionBank (Basic Quiz)</h3>
        <QuestionBank />
      </section>

      {/* Exercise 6 */}
      <section className="mb-5 p-4 border rounded shadow-sm">
        <h3>Exercise 6: QuestionBank Advanced (Quiz with Timer & Feedback)</h3>
        <QuestionBankAdvanced />
      </section>
    </div>
  );
}

export default App;
