import { useEffect, useState } from "react";
import { marketSelectionService } from "../../services/marketSelection.service";
import type { Market } from "../../types/market";
import type { MarketSelectionCreateDTO } from "../../types/marketSelection";

interface Props {
  markets: Market[];
}

const MarketsList = ({ markets }: Props) => {
  const [formData, setFormData] = useState<
    Record<
      number,
      {
        name: string;
        odd: string;
        threshold: string;
        message?: string;
        error?: boolean;
      }
    >
  >({});

  const [selectionsByMarket, setSelectionsByMarket] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<number, any[]>
  >({});

  useEffect(() => {
    markets.forEach(market => {
      marketSelectionService.getByMarket(market.id).then(selections => {
        setSelectionsByMarket(prev => ({
          ...prev,
          [market.id]: selections,
        }));
      });
    });
  }, [markets]);

  const handleChange = (
    marketId: number,
    field: "name" | "odd" | "threshold",
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [marketId]: {
        ...prev[marketId],
        [field]: value,
        message: undefined,
        error: false,
      },
    }));
  };

  const handleCreateSelection = async (marketId: number) => {
    const data = formData[marketId];

    if (!data?.name || !data?.odd) {
      setFormData(prev => ({
        ...prev,
        [marketId]: {
          ...data,
          message: "Nombre y odd son obligatorios",
          error: true,
        },
      }));
      return;
    }

    const dto: MarketSelectionCreateDTO = {
      name: data.name,
      odd: Number(data.odd),
      threshold: data.threshold ? Number(data.threshold) : undefined,
    };

    try {
      await marketSelectionService.create(marketId, dto);

      // refrescar selecciones
      const updatedSelections =
        await marketSelectionService.getByMarket(marketId);

      setSelectionsByMarket(prev => ({
        ...prev,
        [marketId]: updatedSelections,
      }));

      setFormData(prev => ({
        ...prev,
        [marketId]: {
          name: "",
          odd: "",
          threshold: "",
          message: "✅ Selección creada correctamente",
          error: false,
        },
      }));
    } catch {
      setFormData(prev => ({
        ...prev,
        [marketId]: {
          ...data,
          message: "❌ Error al crear la selección",
          error: true,
        },
      }));
    }
  };

  return (
    <div>
      <h3>Markets</h3>

      {markets.map(market => {
        const data = formData[market.id];

        return (
          <div key={market.id} className="admin-market-card">
            <h4>{market.marketType}</h4>

            <input
              type="text"
              placeholder="Nombre (Home / Draw / Away / Over / Under / Yes / No)"
              value={data?.name || ""}
              onChange={e =>
                handleChange(market.id, "name", e.target.value)
              }
            />

            <input
              type="number"
              step="0.01"
              placeholder="Odd"
              value={data?.odd || ""}
              onChange={e =>
                handleChange(market.id, "odd", e.target.value)
              }
            />

            <input
              type="number"
              step="0.5"
              placeholder="Threshold (ej: 2.5)"
              value={data?.threshold || ""}
              onChange={e =>
                handleChange(market.id, "threshold", e.target.value)
              }
            />

            <button onClick={() => handleCreateSelection(market.id)}>
              ➕ Añadir selección
            </button>

            {data?.message && (
              <div
                className={`admin-message ${
                  data.error ? "error" : "success"
                }`}
              >
                {data.message}
              </div>
            )}

            {/* SELECCIONES EXISTENTES */}
            {selectionsByMarket[market.id]?.length > 0 && (
              <table className="admin-table small">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Odd</th>
                    <th>Threshold</th>
                  </tr>
                </thead>
                <tbody>
                  {selectionsByMarket[market.id].map(sel => (
                    <tr key={sel.id}>
                      <td>{sel.id}</td>
                      <td>{sel.name}</td>
                      <td>{sel.odd}</td>
                      <td>{sel.threshold ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MarketsList;