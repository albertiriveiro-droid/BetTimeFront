import { useEffect, useState } from "react";
import { playerMarketSelectionService } from "../../services/playerMarketSelection.service";
import type { PlayerMarket } from "../../types/playerMarket";
import type { PlayerMarketSelectionCreateDTO } from "../../types/playerMarketSelection";

interface Props {
  playerMarkets: PlayerMarket[];
}

const PlayerMarketsList = ({ playerMarkets }: Props) => {
  const [formData, setFormData] = useState<
    Record<
      number,
      {
        name: string;
        odds: string;
        message?: string;
        error?: boolean;
      }
    >
  >({});

  const [selectionsByPlayerMarket, setSelectionsByPlayerMarket] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<number, any[]>
  >({});

  
  useEffect(() => {
    playerMarkets.forEach(pm => {
      playerMarketSelectionService.getByPlayerMarket(pm.id).then(selections => {
        setSelectionsByPlayerMarket(prev => ({
          ...prev,
          [pm.id]: selections,
        }));
      });
    });
  }, [playerMarkets]);

  const handleChange = (
    playerMarketId: number,
    field: "name" | "odds",
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [playerMarketId]: {
        ...prev[playerMarketId],
        [field]: value,
        message: undefined,
        error: false,
      },
    }));
  };

  const handleCreateSelection = async (playerMarketId: number) => {
    const data = formData[playerMarketId];

    if (!data?.name || !data?.odds) {
      setFormData(prev => ({
        ...prev,
        [playerMarketId]: {
          ...data,
          message: "Nombre y odds son obligatorios",
          error: true,
        },
      }));
      return;
    }

    const dto: PlayerMarketSelectionCreateDTO = {
      name: data.name,
      odds: Number(data.odds),
    };

    try {
      await playerMarketSelectionService.create(playerMarketId, dto);

      const updatedSelections =
        await playerMarketSelectionService.getByPlayerMarket(playerMarketId);
      setSelectionsByPlayerMarket(prev => ({
        ...prev,
        [playerMarketId]: updatedSelections,
      }));

      setFormData(prev => ({
        ...prev,
        [playerMarketId]: {
          name: "",
          odds: "",
          message: "✅ Selección creada correctamente",
          error: false,
        },
      }));
    } catch {
      setFormData(prev => ({
        ...prev,
        [playerMarketId]: {
          ...data,
          message: "❌ Error al crear la selección",
          error: true,
        },
      }));
    }
  };

  return (
    <div className="admin-section">
      <h2>Player Markets</h2>

      {playerMarkets.map(pm => {
        const data = formData[pm.id];
        const selections = selectionsByPlayerMarket[pm.id] || [];

        return (
          <div key={pm.id} className="admin-market-card">
            <h4>
              {pm.playerMarketType} (Player ID: {pm.playerId})
            </h4>

            <input
              className="admin-form-input"
              type="text"
              placeholder="Nombre"
              value={data?.name || ""}
              onChange={e => handleChange(pm.id, "name", e.target.value)}
            />

            <input
              className="admin-form-input"
              type="number"
              step="0.01"
              placeholder="Odds"
              value={data?.odds || ""}
              onChange={e => handleChange(pm.id, "odds", e.target.value)}
            />

            <button
              className="admin-form-button"
              onClick={() => handleCreateSelection(pm.id)}
            >
              ➕ Añadir selección
            </button>

            {data?.message && (
              <div className={`admin-message ${data.error ? "error" : "success"}`}>
                {data.message}
              </div>
            )}

            {selections.length > 0 && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Odds</th>
                  </tr>
                </thead>
                <tbody>
                  {selections.map(sel => (
                    <tr key={sel.id}>
                      <td>{sel.id}</td>
                      <td>{sel.name}</td>
                      <td>{sel.odd}</td>
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

export default PlayerMarketsList;
