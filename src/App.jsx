import ChatButton from "@components/chat/ChatButton";
import { UserProvider } from "@contexts/UserContext";
import { ConfigProvider } from "@contexts/ConfigContext";
import { config } from "@/config";

export default function App() {
  return (
    <ConfigProvider apiKey={config.api_key}>
      <UserProvider>
        <ChatButton />
      </UserProvider>
    </ConfigProvider>
  );
}