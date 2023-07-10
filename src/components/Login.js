const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <h2>Login to application</h2>
        
            <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                    />
            </div>
            <div>
                password
                <input
                    type="text"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                    />
            </div>
            <button type='submit'>Login</button>
            </form>
        </div>
       
    )
}

export default LoginForm