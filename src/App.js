import './App.css';
import Welcome from './components/Welcome'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TrackDev</h1>
      </header>
      <main className="App-main">
        <Welcome />
        <Login />
      </main>
    </div>
  );
}

export default App;
