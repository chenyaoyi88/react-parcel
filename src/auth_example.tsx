import * as React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    history,
    withRouter
} from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const AuthExample = () =>
    (
        <Router>
            <div>
                <AuthButton />
                <ul>
                    <li>
                        <Link to="/public">查看公共页面</Link>
                    </li>
                    <li>
                        <Link to="/protected">查看保护页面</Link>
                    </li>
                </ul>
                <Route path="/public" component={Public} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/protected" component={Protected} />
            </div>
        </Router>
    );




// const fnClick = () => {
//     alert(123);
// };

// return (
//     <div>
//         <button onClick={fnClick}>按钮</button>
//     </div>
// )



const loginAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 1000); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 1000);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        loginAuth.isAuthenticated ? (
            <p>
                欢迎!{" "}
                <button onClick={() => {
                    loginAuth.signout(() => history.push("/"));
                }}>退出登录</button>
            </p>
        ) : (<p>你还没有登录</p>)
);

const PrivateRoute = ({ component: Component, ...other }) => (
    <Route
        {...other}
        render={props =>
            loginAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const Public = () => <h3>公共页面</h3>;
const Protected = () => <h3>保护页面</h3>;

class Login extends React.Component<any, any> {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        loginAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <p>你必须登录才能查看 {from.pathname}</p>
                <button onClick={this.login}>登录</button>
            </div>
        );
    }
}

export default AuthExample;