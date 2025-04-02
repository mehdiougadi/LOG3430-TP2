import './App.css';
import FiveNodesDiagrams from './components/cassandra/five-nodes';
import ThreeNodesDiagrams from './components/cassandra/three-nodes';
import MongoDBThreeNodesDiagrams from './components/mongodb/three-nodes';
import MongoDBFiveNodesDiagrams  from './components/mongodb/five-nodes';

function App() {
  return (
    <div className="App">
      <ThreeNodesDiagrams />
      <FiveNodesDiagrams />
      <MongoDBThreeNodesDiagrams />
      <MongoDBFiveNodesDiagrams />
    </div>
  );
}

export default App;
