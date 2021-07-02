import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import UserContext from './contexts/UserContext'
import Header from './components/Header'
import Main from './components/Main'
import MainRoutes from './pages/MainRoutes'
import Api from './utils/api'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() =>  {
    requestUserSelf()
  }, [])

  function requestUserSelf() {
    Api.get("/auth/self")
      .then(data => {
        const user = {
          isLoggedIn: true,
          profile: data
        }
        setUser(user)
      })
      .catch((error) => {
        if(error.status === 403 || error.status === 404) {
          const user = { isLoggedIn: false, profile: null }
          setUser(user)
        }
      })
  }

  return (
    <UserContext.Provider value={{user: user, setUser: setUser}}>
      <Router>
        <div className="app">
          <Header />
          <Main>
            <MainRoutes />
          </Main>   
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
