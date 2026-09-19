"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { useRouter } from "next/navigation";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signinSchema, SigninInput } from "@/lib/validations/auth-schema";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { signInWithGoogle } from "@/lib/services/signInWithGoogle";

export default function SigninPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninInput) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message as string);
      return;
    }

    toast.success("Signed in successfully");
    router.replace("/account");
  };

  return (
    <FrontEndLayout>
      <section className="mx-auto grid max-w-6xl overflow-hidden border-x border-border bg-card shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 relative min-h-310px overflow-hidden bg-primary text-primary-foreground lg:order-1 lg:min-h-700px">
          <Image
            src="/images/hero-urban-studio-pose-01.jpg"
            alt="Editorial fashion portrait in an urban studio"
            fill
            priority
            className="object-cover object-center opacity-75"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/35 to-transparent" />
          <div className="relative flex h-full min-h-310px flex-col justify-between p-7 sm:p-10 lg:min-h-700px lg:p-12">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.22em]">
              <span>Nexus / 02</span>
              <FiArrowUpRight size={20} aria-hidden="true" />
            </div>
            <div className="max-w-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white/65">
                Welcome back
              </p>
              <h2 className="text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl">
                Your next good find is waiting.
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
                Pick up where you left off and keep your edit moving forward.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 px-6 py-10 sm:px-12 sm:py-14 lg:order-2 lg:px-16 lg:py-20">
          <div className="max-w-md">
            <div className="mb-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                Your space
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Welcome back.
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Sign in to see your saved pieces, recent orders, and the latest
                from NexusMart.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

              <div className="space-y-3 pt-3">
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? "Verifying Credentials..." : "Sign In"}
                </Button>

                <Button
                  onClick={signInWithGoogle}
                  type="button"
                  fullWidth
                  variant="hover"
                  leftIcon={<FcGoogle size={18} />}
                >
                  Continue with Google
                </Button>
              </div>
            </form>

            <div className="mt-8 border-t border-border pt-6">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <FiCheck className="text-success" /> Saved favorites
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiCheck className="text-success" /> Order history
                </span>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                New to NexusMart?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-accent transition-colors hover:text-foreground"
                >
                  Create an account <span aria-hidden="true">-&gt;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </FrontEndLayout>
  );
}
