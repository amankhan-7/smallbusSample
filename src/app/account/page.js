import AccountPage from "@/components/account/account-page";
import AuthGuard from "@/components/auth/AuthGuard";

export default function Account() {
  return (
    <AuthGuard redirectTo="/login" requireAuth>
      <AccountPage />
    </AuthGuard>
  );
}
