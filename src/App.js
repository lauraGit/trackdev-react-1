import { useState } from 'react'
import './App.css';
import Welcome from './components/Welcome'
import Login from './components/Login'
import Register from './components/Register'
import UserContext from './contexts/UserContext'

function App() {
  const [user, setUser] = useState({ loggedIn: false, username: null})

  return (
    <UserContext.Provider value={{user: user, setUser: setUser}}>
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
    </UserContext.Provider>
  );
}

export default App;
