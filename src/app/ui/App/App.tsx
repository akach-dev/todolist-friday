import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "app/ui/App/App.css";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { selectIsInitialized } from "app/model/appSelectors";
import { authThunks } from "features/auth/model/authSlice";
import { AppHeader } from "app/ui/App/AppHeader/AppHeader";
import { AppMain } from "app/ui/App/AppMain/AppMain";

function App() {
  const isInitialized = useSelector(selectIsInitialized);
  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppHeader />
        <AppMain />
      </div>
    </BrowserRouter>
  );
}

export default App;
