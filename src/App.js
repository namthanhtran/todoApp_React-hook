import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './component/Loading/Loading';
import TodoFeature from './todo';

function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    const loadingTimeout = setTimeout(() => {
        setLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, [])

  return (
    <React.Fragment>
      { loading && <Loading />}
      { !loading && <TodoFeature />}
    </React.Fragment>
  );
}

export default App;
