"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FiUser, FiMapPin } from "react-icons/fi";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getProfile } from "@/server-actions/user/getProfile";
import { updateProfile } from "@/server-actions/user/updateProfile";

const EditProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  firstName: z.string().min(1, "Shipping first name is required"),
  lastName: z.string().min(1, "Shipping last name is required"),
  addressPhone: z.string().min(5, "Shipping phone number is required"),
  Street: z.string().min(3, "Street address is required"),
  City: z.string().min(2, "City is required"),
  State: z.string().min(2, "State/County is required"),
  country: z.string().min(2, "Country is required"),
  PostalCode: z.string().optional().or(z.literal("")),
});

type EditProfileFormValues = z.infer<typeof EditProfileSchema>;

interface EditProfileFormProps {
  userProfile: Awaited<ReturnType<typeof getProfile>>;
}

export default function EditProfileForm({ userProfile }: EditProfileFormProps) {
  const router = useRouter();
  const defaultAddress = userProfile?.addresses?.[0] || null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
      firstName: defaultAddress?.firstName || "",
      lastName: defaultAddress?.lastName || "",
      addressPhone: defaultAddress?.phone || "",
      Street: defaultAddress?.Street || "",
      City: defaultAddress?.City || "",
      State: defaultAddress?.State || "",
      country: userProfile?.country || "Kenya",
      PostalCode: defaultAddress?.PostalCode || "",
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    const result = await updateProfile(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
    router.push("/account");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-4">
        <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3 flex items-center gap-2">
          <FiUser /> 1. Core Profile Details
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Full Name"
            type="text"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email Address"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <div className="md:col-span-2">
            <Input
              label="Phone Reference (Optional)"
              type="tel"
              placeholder="e.g. 0712 345 678"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-4">
        <h3 className="text-xs font-bold tracking-wider text-foreground uppercase border-b border-border pb-3 flex items-center gap-2">
          <FiMapPin /> 2. Default Shipping Hub Coordinates
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="First Name"
            type="text"
            placeholder="Recipient's first name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Recipient's last name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
          <div className="md:col-span-2">
            <Input
              label="Shipping Delivery Phone"
              type="tel"
              placeholder="Contact number for courier dispatch"
              error={errors.addressPhone?.message}
              {...register("addressPhone")}
            />
          </div>
          <div className="md:col-span-2">
            <Input
              label="Street Address"
              type="text"
              placeholder="e.g. Wood Avenue Towers, Apartment 4B"
              error={errors.Street?.message}
              {...register("Street")}
            />
          </div>
          <Input
            label="City"
            type="text"
            placeholder="e.g. Kilimani / Nairobi"
            error={errors.City?.message}
            {...register("City")}
          />
          <Input
            label="State / County"
            type="text"
            placeholder="e.g. Nairobi Area"
            error={errors.State?.message}
            {...register("State")}
          />
          <Input
            label="Postal Code (Optional)"
            type="text"
            placeholder="e.g. 00100"
            error={errors.PostalCode?.message}
            {...register("PostalCode")}
          />
          <Input
            label="Country"
            type="text"
            error={errors.country?.message}
            {...register("country")}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-fit sm:px-12"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
