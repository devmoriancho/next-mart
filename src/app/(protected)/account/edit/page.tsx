import { redirect } from "next/navigation";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import EditProfileForm from "@/components/user/EditProfileForm";
import { getProfile } from "@/server-actions/user/getProfile";

export default async function EditProfilePage() {
  const userProfile = await getProfile();

  if (!userProfile) {
    redirect("/signin");
  }

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-border pb-5 text-center sm:text-left max-w-4xl mx-auto">
          <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Edit Account Profile
          </h1>
          <p className="mt-1.5 text-sm font-medium text-muted-foreground">
            Update your profile and default delivery address
            coordinates.
          </p>
        </div>

        <EditProfileForm userProfile={userProfile} />
      </section>
    </FrontEndLayout>
  );
}
