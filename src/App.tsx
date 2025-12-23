import { useEffect, useState } from "react";
import { http } from "./api/http";
import type { Team } from "./types/team";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await http.get("/team"); 
        setTeams(res.data);
        console.log("Equipos:", res.data);
      } catch (err) {
        console.error("Error al traer equipos:", err);
      }
    };

    fetchTeams();
  }, []);

  return (
  <div>
    <h1>Equipos</h1>
    <ul>
      {teams.map((team) => (
        <li key={team.id}>
          <strong>{team.name}</strong>
          {team.players && team.players.length > 0 ? (
            <ul>
              {team.players.map((player) => (
                <li key={player.id}>
                  {player.name} - {player.position}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay jugadores en este equipo</p>
          )}
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;