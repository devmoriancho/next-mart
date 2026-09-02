"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signupSchema, SignupInput } from "../../../lib/validations/auth";
import FrontEndLayout from "@/components/layout/FrontEndLayout";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Validated Form Submission Object:", data);
  };

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface/30 p-8 shadow-xl backdrop-blur-sm">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Create an Account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Join NexusMart today and explore premium collections.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              label="Full Name"
              placeholder="John Doe"
              type="text"
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            <Input
              label="Email Address"
              placeholder="john@gmail.com"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="pt-2 space-y-3">
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>

              <Button
                type="button"
                fullWidth
                variant="hover"
                leftIcon={<FcGoogle size={18} />}
              >
                Continue with Google
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-accent transition-colors hover:text-foreground hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </FrontEndLayout>
  );
}
