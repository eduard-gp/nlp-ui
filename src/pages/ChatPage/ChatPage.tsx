import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";

import "./ChatPage.css";


function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector(state => state);

    return (
        <div>
            <h1>Chat Page</h1>
            <button onClick={() => dispatch(checkAuth())}>CheckAuth</button>
            {JSON.stringify(state)}
        </div>
    )
}

export default ChatPage;