import React, { useEffect } from "react";
import Comments from "./components/Comments/Comments";
import "./App.sass";
import { StateType } from "./redux/store";
import { getCommentsThunk, getRepliesThunk } from "./redux/commentsReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
import AlertComponent from "./components/AlertComponent/AlertComponent";

function App() {
  const dispatch = useDispatch();

  const isFetching = useSelector(
    (state: StateType) => state.commentsReducer.isFetching
  );

  useEffect(() => {
    dispatch(getCommentsThunk());
    dispatch(getRepliesThunk());
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="App">
      <AlertComponent />
      <Comments />
    </div>
  );
}

export default App;
