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
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;