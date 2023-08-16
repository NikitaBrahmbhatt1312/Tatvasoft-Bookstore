import "./App.css";
import BooksList from "./components/BooksList";
import HomePage from "./components/HomePage";
import PageNotFound from "./components/PageNotFound";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { globalStyles } from "./styles/globalStyles";
// import Logo from "./logo.svg";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
    const name = "Nikita Brahmbhatt";

    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#277BC0",
                        "&:hover": {
                            backgroundColor: "#FFB200",
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <ToastContainer />
                <div
                    // style={{
                    //     display: "flex",
                    //     justifyContent: "space-between",
                    // }}
                    // className="navbar"
                    style={{
                        ...globalStyles.navbar,
                    }}
                >
                    <div>BookStore</div>
                    <div>
                        <NavLink
                            style={{
                                color: "white",
                                textDecoration: "none",
                                ...globalStyles.navLink,
                            }}
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            style={{
                                color: "white",
                                textDecoration: "none",
                                ...globalStyles.navLink,
                            }}
                            to="bookslist"
                        >
                            BooksList
                        </NavLink>
                        <NavLink
                            style={{
                                color: "white",
                                textDecoration: "none",
                                ...globalStyles.navLink,
                            }}
                            to="form"
                        >
                            Form
                        </NavLink>
                    </div>
                </div>
                <div className="main">
                    {/* <div className="imgWrapper">
                    <img src={Logo} alt="IMG" className="image" />
                </div> */}
                </div>

                <Routes>
                    <Route
                        path="/"
                        element={<HomePage username={name} />}
                    ></Route>
                    <Route path="/bookslist" element={<BooksList />}></Route>
                    <Route path="/form" element={<Form />}></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
