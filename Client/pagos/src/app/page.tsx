'use client'


import { FormEvent, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "react-toastify";

export default function Home() {
  const [formData, setFormData] = useState({
    idPago: 0,
    cantidad: 0,
    concepto: ""
  });

  const [socket, setSocket] = useState<Socket | null>(null);
  const [facturatInfo, setFacturaInfo] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/pagos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    
    toast.info('Processing pago, status: pending')
    console.log("se ha mandado un archivo")
  };

  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:3005");
      newSocket.on("payment-processed", (pago) => {
        console.log(pago);
        setFacturaInfo(pago);
        toast.success('pago confirmed!')
        console.log("Se ha realizado el pago")
      });
      setSocket(newSocket);
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <main className="min-h-screen bg-gradient-to-r from-neutral-800 to-sky-800 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col min-w-[400px]"
      >
        <h1 className="text-3xl text-neutral-800 font-bold mb-4">Datos</h1>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            ID Pago
          </label>
          <input
            type="number"
            name="idPago"
            value={formData.idPago}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            Cantidad
          </label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            Concepto
          </label>
          <textarea
            name="concepto"
            value={formData.concepto}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-sky-800 p-2 text-white rounded font-semibold w-full"
        >
          Enviar
        </button>
      </form>
      {facturatInfo && (
        <div>
          <h2>Pago Confirmado:</h2>
          <p>ID Pago: {facturatInfo.idFactura}</p>
          <p>PAGOID:{facturatInfo.pagoid}</p>
          
        </div>
      )}

    </main>
  );
}
