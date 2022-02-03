
import './App.css';
import List from './components/List'
import Item from './components/Item'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <List></List>
    // </div>

  <div>
    <Routes>
      <Route path="/" element={<List />}>
        <Route path=":itemId" element={<Item />}></Route>
      </Route>
    </Routes>
</div>
  );
}

export default App;
