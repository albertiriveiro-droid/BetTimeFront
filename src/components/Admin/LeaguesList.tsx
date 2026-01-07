import { useEffect, useState } from "react";
import { leagueService } from "../../services/league.service";
import type { League } from "../../types/league";
import type { LeagueCreateDTO } from "../../types/league";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./admin.css";

const LeaguesList = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [leagueToDelete, setLeagueToDelete] = useState<League | null>(null);
  const [form, setForm] = useState<LeagueCreateDTO>({
    name: "",
    sportId: 1,
  });
  const [success, setSuccess] = useState<string | null>(null);

  const loadLeagues = () => {
    leagueService.getAll().then(setLeagues);
  };

  useEffect(() => {
    loadLeagues();
  }, []);

  const handleCreate = async () => {
    if (!form.name.trim()) return;

    try {
      await leagueService.create(form);
      setForm({ name: "", sportId: 1 });
      setSuccess("Liga creada correctamente");
      loadLeagues();

      setTimeout(() => setSuccess(null), 2000);
    } catch {
      alert("Error al crear la liga");
    }
  };

  const confirmDelete = async () => {
    if (!leagueToDelete) return;

    try {
      await leagueService.delete(leagueToDelete.id);
      setLeagueToDelete(null);
      loadLeagues();
    } catch {
      alert("Error al eliminar la liga");
    }
  };

  return (
    <div className="admin-section">
      <h2>Ligas</h2>

    
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Sport ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leagues.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.name}</td>
              <td>{l.sportId}</td>
              <td className="admin-actions">
                <button
                  className="admin-delete-btn"
                  onClick={() => setLeagueToDelete(l)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="admin-form">
        <h3>Crear nueva liga</h3>

        <input
          type="text"
          placeholder="Nombre de la liga"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Sport ID"
          value={form.sportId}
          onChange={(e) =>
            setForm({ ...form, sportId: Number(e.target.value) })
          }
        />

        <button onClick={handleCreate}>Crear liga</button>

        {success && <div className="admin-success">{success}</div>}
      </div>

      
      {leagueToDelete && (
        <ConfirmDeleteModal
          title="Eliminar liga"
          message={`¿Seguro que quieres eliminar la liga "${leagueToDelete.name}"?`}
          onCancel={() => setLeagueToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
  </div>
  );
};

export default LeaguesList;
