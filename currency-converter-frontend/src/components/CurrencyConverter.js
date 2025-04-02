import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [cantidad, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Obtener lista de monedas desde la API
    axios.get("https://api.exchangerate-api.com/v4/latest/USD")
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch(error => console.error("Error al obtener las monedas", error));
  }, []);

  const handleConvert = async () => {

    if(!cantidad.trim() || cantidad == 0.0){
      setError("Debes introducir una cantidad");
      setResult(null);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8090/api/conversor/convertir", {
        params: { cantidad, from: fromCurrency, to: toCurrency },
      });
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al convertir la moneda", error);
      setError("Hubo un problema con la conversión. Intentalo de nuevo.")
    }
  };

  return (
    <div>
      <h1 id="titulo">Creado por Gonzalo Pulleiro</h1>
      <p id="subtitulo">Pequeño proyecto personal de un conversor de moneda empleando API externa.</p>
      <br></br>
      <h2 id="titulo">Conversor de Moneda</h2>

      <div class="conversor">

        <p>Introduce la cantidad
          <input id="quantity"
            type="input"
            value={cantidad}
            autoFocus
            required
            onChange={(e) => setAmount(e.target.value)}
          /></p>

        <p>Selecciona la moneda de origen
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </p>

        <p>Selecciona la moneda a obtener
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </p>

        <button onClick={handleConvert}>Convertir</button>

            {error && <p id="error">{error}</p>}
        {result !== null && <h3>{fromCurrency} {result.toFixed(2)} {toCurrency}</h3>}


      </div>
    </div>
  );
};

export default CurrencyConverter;
