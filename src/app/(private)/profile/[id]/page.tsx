import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
import { Separator } from "@/shared/ui/separator";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="space-y-6 py-14 container  max-w-[600px]">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how other users see you on the site.
        </p>
      </div>
      <Separator />
      <UpdateProfileForm userId={params.id} />
    </main>
  );
}
