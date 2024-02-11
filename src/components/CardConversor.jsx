import { useState, useEffect } from "react";
import { data } from "../lib/dolarapi";

export default function CardConversor() {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [conversionResult, setConversionResult] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  useEffect(() => {
    if (selectedCurrency && inputValue !== "") {
     
      const selectedData = data.find(
        (item) => item.nombre === selectedCurrency
      );
      console.log(selectedData);
      if (selectedData) {
        const result = parseFloat(inputValue) / selectedData.venta;
        setConversionResult(result.toFixed(2));
      }
    }
    
  }, [selectedCurrency, inputValue]);


  return (
    <div className="flex flex-col gap-y-2 px-5 py-4 mx-auto bg-slate-800 rounded-xl border-2 border-slate-700">
      <div className="flex items-center justify-center px-2 py-2">
        <select
          className="bg-slate-700 rounded-md px-4 py-2 text-md font-light"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="">Seleccione el tipo de moneda</option>
          {data.map(({ nombre }) => (
            <option key={nombre} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mt-2">
        <div className="flex px-2 py-2">
          <div className="bg-sky-500 px-3 py-2 rounded-l-full font-medium">AR$</div>
          <input
            className="bg-slate-400 px-4 py-2 rounded-r-full"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="flex px-2 py-2">
          <div className="bg-green-500 px-3 py-2 rounded-l-full font-medium">U$D</div>
          <input
            className="bg-slate-400 px-4 py-2 rounded-r-full"
            type="number"
            value={conversionResult}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
