import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Services/firebase";

export function DashboardHeader() {

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div className="w-full items-center flex h-10 bg-red-600 rounded-lg text-white font-medium gap-4 px-4 mb-4 max-[420px]:text-sm">
            <Link to="/">
                Dashboard
            </Link>
            <Link to="/dashboard/new">
                Cadastrar carro
            </Link>

            <button className="ml-auto" onClick={handleLogout}>
                Sair da conta
            </button>
        </div>
    )
}