/// container da página de configurações

import ChangePassword from "./ChangePassword";
import SocialConnections from "./SocialConnections";
import RecentActivity from "./RecentActivity";
import AccountActions from "./AccountActions";

export default function AccountSettings() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">⚙️ Configurações da Conta</h1>
      <ChangePassword />
      <SocialConnections />
      <RecentActivity />
      <AccountActions />
    </div>
  );
}
