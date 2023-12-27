import { useState, useEffect } from 'react';

const relog = () => {
  const [contadorS, setContadorS] = useState(0);
  const [contadorM, setContadorM] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (contadorS === 60) {
        setContadorS(0);
        setContadorM((prevContadorM) => prevContadorM + 1);
      } else {
        setContadorS((prevContadorS) => prevContadorS + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contadorS]);

  return (
    <div>
      <div>
        <span id="minutos">{contadorM}</span>:<span id="segundos">{contadorS}</span>
      </div>
    </div>
  );
};

export default relog;
