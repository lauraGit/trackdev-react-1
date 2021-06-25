import { createContext } from 'react'

// If user is null, assume nothing about current session.
// It is neither logged in or logged out.
// user                     {Object}    Information about current user in session
// user.isLoggedIn          {Boolean}   Whether there is an authenticated user or not
// user.profile             {Object}    Profile of the user as it comes from API
// user.profile.username    {String}
// user.profile.roles       {String[]}

const UserContext = createContext({ 
    user: null,
    setUser: () => {}
})

export default UserContext