import { useEffect, useState } from "react";
import { playerService } from "../../services/player.service";
import { teamService } from "../../services/team.service";
import type { Player, PlayerCreateDTO, PlayerUpdateDTO } from "../../types/player";
import type { Team } from "../../types/team";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./admin.css";

const PlayersList = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<PlayerUpdateDTO>({});
  const [createForm, setCreateForm] = useState<PlayerCreateDTO>({
    name: "",
    teamId: 0,
    shirtNumber: 0,
    position: "Midfielder",
  });
  const [success, setSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");

 
  useEffect(() => {
    teamService.getAll().then(setTeams);
  }, []);

  
  useEffect(() => {
  const fetchPlayers = async () => {
    if (selectedTeamId !== null) {
      const data = await playerService.getByTeam(selectedTeamId);
      setPlayers(data);
    } else {
      setPlayers([]);
    }
  };

  fetchPlayers(); 
}, [selectedTeamId]);
 
  const handleSelectTeam = (teamId: number) => {
    setSelectedTeamId(teamId);
    setCreateForm({
      name: "",
      shirtNumber: 0,
      position: "Midfielder",
      teamId, 
    });
  };

  
  const confirmDelete = async () => {
    if (!playerToDelete) return;
    try {
      await playerService.delete(playerToDelete.id);
      setPlayerToDelete(null);
      setDeleteError("");
      if (selectedTeamId) {
        const updatedPlayers = await playerService.getByTeam(selectedTeamId);
        setPlayers(updatedPlayers);
      }
    } catch {
      setDeleteError("No se pudo eliminar el jugador");
      setPlayerToDelete(null);
    }
  };

 
  const startEdit = (player: Player) => {
    setEditingPlayerId(player.id);
    setEditForm({
      name: player.name,
      shirtNumber: player.shirtNumber,
      position: player.position,
      teamId: player.teamId,
    });
  };

  const cancelEdit = () => {
    setEditingPlayerId(null);
    setEditForm({});
  };

  const saveEdit = async (playerId: number) => {
    await playerService.update(playerId, editForm);
    setEditingPlayerId(null);
    if (selectedTeamId) {
      const updatedPlayers = await playerService.getByTeam(selectedTeamId);
      setPlayers(updatedPlayers);
    }
    setSuccess("Jugador actualizado correctamente");
    setTimeout(() => setSuccess(""), 3000);
  };

  
  const handleCreate = async () => {
    if (selectedTeamId === null) return;
    await playerService.create(createForm);
    const updatedPlayers = await playerService.getByTeam(selectedTeamId);
    setPlayers(updatedPlayers);
    setCreateForm({
      name: "",
      shirtNumber: 0,
      position: "Midfielder",
      teamId: selectedTeamId,
    });
    setSuccess("Jugador creado correctamente");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="admin-section">
      <h2>Jugadores</h2>

    
      <select
        value={selectedTeamId || ""}
        onChange={(e) => handleSelectTeam(Number(e.target.value))}
      >
        <option value="">-- Selecciona un equipo --</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      
      {deleteError && <div className="admin-message error">{deleteError}</div>}
      {success && <div className="admin-success">{success}</div>}

    
      {selectedTeamId && (
        <table className="player-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nº Camiseta</th>
              <th>Posición</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {editingPlayerId === p.id ? (
                    <input
                      value={editForm.name || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  ) : (
                    p.name
                  )}
                </td>
                <td>
                  {editingPlayerId === p.id ? (
                    <input
                      type="number"
                      value={editForm.shirtNumber || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                        shirtNumber: Number(e.target.value),
                        })
                      }
                    />
                  ) : (
                    p.shirtNumber
                  )}
                </td>
                <td>
                  {editingPlayerId === p.id ? (
                    <select
                      value={editForm.position || "Midfielder"}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          position: e.target.value as any,
                        })
                      }
                    >
                      <option value="Goalkeeper">Portero</option>
                      <option value="Defender">Defensa</option>
                      <option value="Midfielder">Centrocampista</option>
                      <option value="Forward">Delantero</option>
                    </select>
                  ) : (
                    p.position
                  )}
                </td>
                <td>{p.isActive ? "Sí" : "No"}</td>
                <td className="admin-actions">
                  {editingPlayerId === p.id ? (
                    <>
                      <button
                        className="admin-matchstats-btn"
                        onClick={() => saveEdit(p.id)}
                      >
                        ✔
                      </button>
                      <button
                        className="admin-matchstats-btn"
                        onClick={cancelEdit}
                      >
                        ✖
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="admin-matchstats-btn"
                        onClick={() => startEdit(p)}
                      >
                        ✏️
                      </button>
                      <button
                        className="admin-delete-btn"
                        onClick={() => setPlayerToDelete(p)}
                      >
                        🗑
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    
      {selectedTeamId && (
        <div className="admin-form">
          <h3>Crear nuevo jugador</h3>

          <input
            placeholder="Nombre"
            value={createForm.name}
            onChange={(e) =>
              setCreateForm({ ...createForm, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Número de camiseta"
            value={createForm.shirtNumber === 0 ? "" : createForm.shirtNumber}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                shirtNumber: Number(e.target.value),
              })
            }
          />

          <select
            value={createForm.position}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                position: e.target.value as any,
              })
            }
          >
            <option value="Goalkeeper">Portero</option>
            <option value="Defender">Defensa</option>
            <option value="Midfielder">Centrocampista</option>
            <option value="Forward">Delantero</option>
          </select>

          <button onClick={handleCreate}>Crear jugador</button>
        </div>
      )}

      
      {playerToDelete && (
        <ConfirmDeleteModal
          title="Eliminar jugador"
          message={`¿Seguro que quieres eliminar "${playerToDelete.name}"?`}
          onCancel={() => setPlayerToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default PlayersList;
