import ChatButton from "@components/chat/ChatButton";
import { UserProvider } from "@contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">
          AMB-IA CIUDADANO
        </h1>
        <p className="mt-4 text-gray-700">
          Asistente IA para temas catastrales
        </p>
        <ChatButton />
      </div>
    </UserProvider>
  );
}