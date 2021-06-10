import './App.css';
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TrackDev</h1>
      </header>
      <main className="App-main">
        <Welcome />
        <Login />
        <Register />
      </main>
    </div>
  );
}

export default App;
