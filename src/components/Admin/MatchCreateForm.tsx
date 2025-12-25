import { useState } from "react";
import { matchService } from "../../services/match.service";
import "./admin.css";

const MatchCreateForm = () => {
  const [leagueId, setLeagueId] = useState<number | "">("");
  const [homeTeamId, setHomeTeamId] = useState<number | "">("");
  const [awayTeamId, setAwayTeamId] = useState<number | "">("");
  const [startTime, setStartTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState<number | "">("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = async () => {
     const isoStartTime = new Date(startTime).toISOString();
    try {

      await matchService.create({
        leagueId: Number(leagueId),
        homeTeamId: Number(homeTeamId),
        awayTeamId: Number(awayTeamId),
        startTime: isoStartTime,
        durationMinutes: Number(durationMinutes),
      });

      setSuccessMessage("✅ Partido creado con éxito");
     
      setLeagueId("");
      setHomeTeamId("");
      setAwayTeamId("");
      setStartTime("");
      setDurationMinutes("");
    } catch (err) {
      console.error(err);
      setSuccessMessage("❌ Error al crear el partido");
    }
  };

  return (
    <div className="admin-form">
      <h3>Crear Partido</h3>

      <input
        type="number"
        value={leagueId}
        onChange={(e) => setLeagueId(e.target.value ? +e.target.value : "")}
        placeholder="League ID"
      />
      <input
        type="number"
        value={homeTeamId}
        onChange={(e) => setHomeTeamId(e.target.value ? +e.target.value : "")}
        placeholder="Home Team ID"
      />
      <input
        type="number"
        value={awayTeamId}
        onChange={(e) => setAwayTeamId(e.target.value ? +e.target.value : "")}
        placeholder="Away Team ID"
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="number"
        value={durationMinutes}
        onChange={(e) => setDurationMinutes(e.target.value ? +e.target.value : "")}
        placeholder="Duración (min)"
      />

      <button className="btn btn-primary" onClick={handleCreate}>
        Crear Partido
      </button>

      {successMessage && <p className="admin-success">{successMessage}</p>}
    </div>
  );
};

export default MatchCreateForm;