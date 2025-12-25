// src/pages/AdminPage.tsx
import UsersList from "../components/Admin/UserList";
import LeaguesList from "../components/Admin/LeaguesList";
import TeamsList from "../components/Admin/TeamList";
import MatchCreateForm from "../components/Admin/MatchCreateForm";
import MatchesList from "../components/Admin/MatchesList";
import AdminMatchMarkets from "../components/Admin/AdminMatchMarkets";


const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Panel de Administración</h1>

      <section>
        <h2>Usuarios</h2>
        <UsersList />
      </section>

      <section>
        <h2>Ligas</h2>
        <LeaguesList />
      </section>

      <section>
        <h2>Equipos</h2>
        <TeamsList />
      </section>

      <section>
        <h2>Creación de partido</h2>
        <MatchCreateForm />
      </section>

       <section>
        <h2>Partidos</h2>
        <MatchesList />
      </section>
       <section>
      
        <AdminMatchMarkets />
      </section>
       

       
    </div>
  );
};

export default AdminPage;
