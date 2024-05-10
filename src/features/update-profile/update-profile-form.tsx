"use client";
import { ProfileForm } from "./_ui/profile-form";
import { Spinner } from "@/shared/ui/spinner";
import { useRouter } from "next/navigation";
import { updateProfileApi } from "./_api";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: string;
  callbackUrl?: string;
}) {
  const profileQuery = updateProfileApi.updateProfile.get.useQuery({ userId });

  const router = useRouter();
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  if (profileQuery.isPending) {
    return <Spinner aria-label="Profile Loading" />;
  }

  if (!profileQuery.data) {
    return <div>Failed to upload profile, you may not have permissions</div>;
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? "Continue" : "Save"}
    />
  );
}
