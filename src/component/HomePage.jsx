import React from "react";

const HomePage = (props) => {
    const { username } = props;
    return (
        <div>
            <h1>This is Home Page.</h1>
            <i>Created by - {username}</i>
        </div>
    );
};

export default HomePage;
