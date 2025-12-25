import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/user.service";

const ProfileForm = () => {
  const { user, login } = useAuth();

  const [username, setUsername] = useState(user!.username);
  const [email, setEmail] = useState(user!.email);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!user) return;

    await userService.update(user.id, { username, email });


    login(
      localStorage.getItem("token")!,
      { ...user, username, email }
    );

    setMessage("Datos actualizados correctamente");
  };

  return (
    <div>
      <label>Usuario</label>
      <input value={username} onChange={e => setUsername(e.target.value)} />

      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} />

      <button onClick={handleSave}>Guardar cambios</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileForm;