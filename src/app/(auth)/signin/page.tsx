"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signinSchema, SigninInput } from "@/lib/validations/auth";

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Validated Sign-In Submission Object:", data);
  };

  return (
    <FrontEndLayout>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface/30 p-8 shadow-xl backdrop-blur-sm">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Access your personalized portal and orders.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              label="Email Address"
              placeholder="john@gmail.com"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="relative">
              <Input
                label="Password"
                placeholder="••••••••"
                type="password"
                error={errors.password?.message}
                {...register("password")}
              />
              <div className="absolute right-0 top-0 flex h-6 items-center">
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-accent hover:text-foreground transition-colors"
                >
                  Forgot?
                </Link>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? "Verifying Credentials..." : "Sign In"}
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
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="font-semibold text-accent transition-colors hover:text-foreground hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </FrontEndLayout>
  );
}
