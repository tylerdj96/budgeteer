import React, { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import "./App.css";

function App() {
  const onSuccess = useCallback((token, metadata) => {
    // send token to server
  }, []);

  const config = {
    token: "link-development-2d1acd98-81e7-4d92-a6ad-471cf2030bf2",
    onSuccess,
    // ...
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account!
    </button>
  );
}

export default App;
