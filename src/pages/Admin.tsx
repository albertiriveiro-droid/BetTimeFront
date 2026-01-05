
import UsersList from "../components/Admin/UserList";
import LeaguesList from "../components/Admin/LeaguesList";
import TeamsList from "../components/Admin/TeamList";
import AdminMatchMarkets from "../components/Admin/AdminMatchMarkets";
import MatchStats from "../components/Admin/MatchStats";
import PlayersList from "../components/Admin/PlayerList";


const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Panel de Administración</h1>

      <section>
      <UsersList />
      </section>

      <section>
        <LeaguesList />
      </section>

      <section>
        <TeamsList />
      </section>

      <section>
      <PlayersList/>
      </section>

      <section>
      
        <MatchStats />
      </section>

  
       <section>
      
        <AdminMatchMarkets />
      </section>

      
       
       

       
    </div>
  );
};

export default AdminPage;
