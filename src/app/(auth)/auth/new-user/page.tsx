import { getAppSessionServer } from "@/kernel/lib/next-auth/server";
import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { Separator } from "@/shared/ui/separator";
import { redirect } from "next/navigation";

export default async function NewUserPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await getAppSessionServer();

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Last step</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile, this is how other users will see you on the site
        </p>
      </div>
      <Separator />
      <UpdateProfileForm
        userId={session.user.id}
        callbackUrl={searchParams.callbackUrl}
      />
    </main>
  );
}
