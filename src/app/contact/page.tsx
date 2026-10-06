"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import FrontEndLayout from "@/components/layout/FrontEndLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { contactSchema, ContactInput } from "@/lib/validations/auth-schema";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Validated Contact Submission Object:", data);
    reset();
  };

  return (
    <FrontEndLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-border pb-6 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Have a question about our products or delivery? Send us a message.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface/20 p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FiClock size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider">
                  Response time
                </h3>
                <p className="mt-1 text-sm text-muted-foreground font-medium">
                  We usually reply to messages within two hours.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/20 p-6 space-y-5">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-border pb-3">
                Contact details
              </h3>

              <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                <FiMail size={18} className="text-accent" />
                <span>support@nexusmart.com</span>
              </div>

              <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                <FiPhone size={18} className="text-accent" />
                <span>+254 712 376 198</span>
              </div>

              <div className="flex items-start gap-4 text-sm font-medium text-muted-foreground">
                <FiMapPin size={18} className="text-accent mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-foreground font-semibold">
                    Wood Avenue Towers, Box 45
                  </p>
                  <p>Kilimani District</p>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/30 p-8 shadow-xl backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Your name"
                type="text"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <Input
                label="Email Address"
                placeholder="you@example.com"
                type="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="Subject Topic"
                placeholder="How can we help?"
                type="text"
                error={errors.subject?.message}
                {...register("subject")}
              />

              <Input
                label="Message"
                variant="textarea"
                placeholder="Write your message..."
                error={errors.message?.message}
                {...register("message")}
              />

              <div className="pt-2">
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </FrontEndLayout>
  );
}
