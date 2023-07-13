import { Link } from "react-router-dom"

export const Welcum = () => {
    return (
        <main id="main" className="main">
            <div>
                <p>Welcum to my womb</p>
                <Link to="/signin">
                    <p>Join the cult of the lamp</p>
                </Link>
                <Link to="/">
                    <p>Welcome back anon</p>
                </Link>
                <Link to="/home">
                    <p>Wanna see my private square?</p>
                </Link>
            </div>
        </main>
    )
}