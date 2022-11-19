import React from "react";
import { Button } from "reactstrap";
import MySpinner from "./MySpinner/MySpinner";
import Rating from "./Rating";
import { UserContext } from "../App";
import useErrorHandler from "./ErrorHandler/useErrorHandler";
import confirmReducer from "./confirmReducer";
import useScreenWidthHeight from "./MyHooks/useScreenWidthHeight";
import InfoPanen from "./InfoPanel";

const Start = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const context = React.useContext(UserContext);
  const [confirm, confirmDispatch] = React.useReducer(confirmReducer, {});
  const screenSize = useScreenWidthHeight();

  const setError = useErrorHandler();

  React.useEffect(() => {
    doTest();
  }, []);

  const asyncFuncTest = (arg) => {
    return new Promise((cb) => {
      setTimeout(() => {
        cb(arg + " :)");
        const errorMessage = `1.Проба за грешка...
2.Проба за грешка...
3.Проба за грешка...
4.Проба за грешка...`;
        setError("Проба", errorMessage);
      }, 2000);
    });
  };

  const doTest = async () => {
    setIsLoading(true);
    let ret = await asyncFuncTest("Столе");
    setResult(ret);
    setIsLoading(false);
  };

  const doDisable = () => (isLoading ? true : null);

  return (
    <div className="pt-4">
      {isLoading ? <MySpinner /> : <b>{result}</b>}
      <Button color="primary" onClick={doTest} disabled={doDisable()}>
        {context.userState.user ? context.userState.user.fullName : null} :)
      </Button>
      {JSON.stringify(screenSize)}
      <Rating
        value={rating}
        onChange={(val) => setRating(val)}
        color="red"
        fontSize={32}
      />
      <h1 onClick={() => setRating(0)} style={{ cursor: "pointer" }}>
        {rating}
      </h1>
      <p>
        {JSON.stringify(
          context.userState.user ? context.userState.user.roles : null
        )}
      </p>
      <p>
        {context.userState.user ? context.userState.user.roles[0] : null} :)
      </p>
      <InfoPanen title="Информации ...">
        <p>По детални информации...Друг пат</p>
        <p>По детални информации...Друг пат</p>
        <p>По детални информации...Друг пат</p>
        <p>По детални информации...Друг пат</p>
        <p>По детални информации...Друг пат</p>
        <p>По детални информации...Друг пат</p>
      </InfoPanen>
      <button
        onClick={() => confirmDispatch({ type: "START" })}
        disabled={confirm.confirmButtonDisabled}
      >
        Confirm
      </button>
      <div className="App-message">{confirm.message}</div>

      {confirm.showConfirmation && (
        <div className="App-dialog">
          <p>Внеси:</p>
          <input
            type="text"
            onChange={(event) => setResult(event.target.value)}
            autoFocus
          />
          <button
            onClick={() =>
              confirmDispatch({
                type: "CONFIRM",
                payload: result,
              })
            }
          >
            Yes
          </button>
          <button
            onClick={() =>
              confirmDispatch({
                type: "CANCEL",
              })
            }
          >
            No
          </button>
        </div>
      )}
      <button
        onClick={() => {
          confirmDispatch({ type: "START_DELETE" });
        }}
        disabled={confirm.deleteButtonDisabled}
      >
        Delete Widget!
      </button>
      {confirm.showDelete && (
        <div className="App-dialog">
          <p>Are you sure you want to delete the widget?</p>
          <button
            onClick={() =>
              confirmDispatch({
                type: "CONFIRM_DELETE",
              })
            }
          >
            Yes
          </button>
          <button
            onClick={() =>
              confirmDispatch({
                type: "CANCEL",
              })
            }
          >
            No
          </button>
        </div>
      )}
      {confirm.showResult && (
        <div className="App-dialog">
          <p>The widget was deleted</p>
          <button
            onClick={() =>
              confirmDispatch({
                type: "FINISH",
              })
            }
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default Start;
