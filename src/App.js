import React, { useEffect, useState } from 'react';
import Loading from './component/Loading/Loading';
import TodoFeature from './todo';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeOut = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return clearTimeout(loadingTimeOut)
  }, []);

  return (
    <React.Fragment>
      { loading && <Loading />}
      { !loading && <TodoFeature />}
    </React.Fragment>
  );
}

export default App;
