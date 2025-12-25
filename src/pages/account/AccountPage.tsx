import { useAuth } from "../../context/AuthContext";
import ProfileForm from "../../components/Profile/ProfileForm";
import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";
import "./AccountPage.css";

const AccountPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="account-page">
      <h1>Mi cuenta</h1>

      <section className="account-section">
        <h2>Datos personales</h2>
        <ProfileForm />
      </section>

      <section className="account-section">
        <h2>Seguridad</h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
};

export default AccountPage;