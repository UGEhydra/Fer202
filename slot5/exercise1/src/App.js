import { Ex1 } from './ex1';   // ex1 đang export function Ex1
import { Ex2 } from './ex2';   // ex2 cũng export function Ex2
import Ex3 from './ex3';       // ex3 trở đi export default
import Ex4 from './ex4';
import Ex5 from './ex5';
import Ex6 from './ex6';
import Ex7 from './ex7';
import Ex8 from './ex8';

function App() {
  return (
    <div className="App">
      <Ex1 />
      <hr />
      <Ex2 />
      <hr />
      <Ex3 />
      <hr />
      <Ex4 />
      <hr />
      <Ex5 />
      <hr />
      <Ex6 />
      <hr />
      <Ex7 />
      <hr />
      <Ex8 />
    </div>
  );
}

export default App;
