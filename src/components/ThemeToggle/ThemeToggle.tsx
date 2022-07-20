import "./ThemeToggle.css";

function ThemeToggle() {
    function changeTheme() {
        let theme;
        if (document.documentElement.className === "dark-theme") {
            theme = "white-theme";
        } else {
            theme = "dark-theme";
        }
        document.documentElement.className = theme;
    }
    
    return (
        <div className="toogle-container">
            <input type="checkbox" id="toggle_checkbox" />
            <label htmlFor="toggle_checkbox" onClick={changeTheme}>
                <div id="star">
                    <div className="star" id="star-1">★</div>
                    <div className="star" id="star-2">★</div>
                </div>
                <div id="moon"></div>
            </label>
        </div>
    );
}

export default ThemeToggle;