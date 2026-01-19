
import { useEffect, useState } from "react";
import { teamService } from "../../services/team.service";
import type { Team, TeamCreateDTO, TeamUpdateDTO } from "../../types/team";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./admin.css";

const TeamsList = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<TeamUpdateDTO>({});
  const [createForm, setCreateForm] = useState<TeamCreateDTO>({
    name: "",
    leagueId: 0,
  });
  const [success, setSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const loadTeams = () => {
    teamService.getAll().then(setTeams);
  };

  useEffect(() => {
    loadTeams();
  }, []);

 
  const confirmDelete = async () => {
    if (!teamToDelete) return;

    try {
      await teamService.delete(teamToDelete.id);
      setTeamToDelete(null);
      setDeleteError("");
      loadTeams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setDeleteError(
        "No puedes eliminar un equipo con partidos asociados"
      );
      setTeamToDelete(null);
    }
  };

 
  const startEdit = (team: Team) => {
    setEditingTeamId(team.id);
    setEditForm({ name: team.name, leagueId: team.leagueId });
  };

  const cancelEdit = () => {
    setEditingTeamId(null);
    setEditForm({});
  };

  const saveEdit = async (teamId: number) => {
    await teamService.update(teamId, editForm);
    setEditingTeamId(null);
    loadTeams();
  };


  const handleCreate = async () => {
    await teamService.create(createForm);
    setCreateForm({ name: "", leagueId: 0 });
    setSuccess("Equipo creado correctamente");
    loadTeams();
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="admin-section">
      <h2>Equipos</h2>

      <table className="team-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>League ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>

              <td>
                {editingTeamId === t.id ? (
                  <input
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                ) : (
                  t.name
                )}
              </td>

              <td>
                {editingTeamId === t.id ? (
                  <input
                    type="number"
                    value={editForm.leagueId || ""}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        leagueId: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  t.leagueId
                )}
              </td>

              <td className="admin-actions">
                {editingTeamId === t.id ? (
                  <>
                    <button
                      className="admin-matchstats-btn"
                      onClick={() => saveEdit(t.id)}
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
                      onClick={() => startEdit(t)}
                    >
                      ✏️
                    </button>
                    <button
                      className="admin-delete-btn"
                      onClick={() => setTeamToDelete(t)}
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

     
      {deleteError && (
        <div className="admin-message error">
          {deleteError}
        </div>
      )}

      
      <div className="admin-form">
        <h3>Crear nuevo equipo</h3>

        <input
          placeholder="Nombre del equipo"
          value={createForm.name}
          onChange={(e) =>
            setCreateForm({ ...createForm, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="League ID"
          value={createForm.leagueId}
          onChange={(e) =>
            setCreateForm({
              ...createForm,
              leagueId: Number(e.target.value),
            })
          }
        />

        <button onClick={handleCreate}>Crear equipo</button>

        {success && <div className="admin-success">{success}</div>}
      </div>

     
      {teamToDelete && (
        <ConfirmDeleteModal
          title="Eliminar equipo"
          message={`¿Seguro que quieres eliminar "${teamToDelete.name}"?
Si el equipo tiene partidos asociados no se podrá eliminar.`}
          onCancel={() => setTeamToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default TeamsList;
