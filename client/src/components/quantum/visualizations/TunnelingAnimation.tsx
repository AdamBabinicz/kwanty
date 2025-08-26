import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function TunnelingAnimation() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tunnelingProgress, setTunnelingProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        setTunnelingProgress(0);
      }, 5000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      setTunnelingProgress(0);
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    // Animate tunneling progress
    const interval = setInterval(() => {
      setTunnelingProgress((prev) => {
        const increment = Math.random() * 10 + 5;
        const newProgress = Math.min(prev + increment, 100);

        if (newProgress >= 100) {
          clearInterval(interval);
          submitMutation.mutate(data);
        }

        return newProgress;
      });
    }, 100);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Quantum Barrier */}
      <motion.div
        className={`absolute inset-0 rounded-xl border-4 border-quantum-cyan pointer-events-none z-10 ${
          isSubmitting ? "barrier-effect" : "border-opacity-30"
        }`}
        animate={
          isSubmitting
            ? {
                borderColor: [
                  "rgba(100, 255, 218, 0.3)",
                  "rgba(100, 255, 218, 1)",
                  "rgba(100, 255, 218, 0.3)",
                ],
              }
            : {}
        }
        transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
        data-testid="quantum-barrier"
      />

      {/* Contact Form */}
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card p-8 rounded-xl border border-quantum-cyan border-opacity-30 relative"
        data-testid="contact-form"
      >
        <h3
          className="text-2xl font-semibold mb-6 text-center text-quantum-cyan"
          data-testid="contact-form-title"
        >
          {t("sections.tunneling.contactForm")}
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
              data-testid="name-label"
            >
              {t("sections.tunneling.name")}
            </Label>
            <Input
              id="name"
              {...form.register("name")}
              className="w-full"
              placeholder={t("sections.tunneling.namePlaceholder")}
              data-testid="input-name"
            />
            {form.formState.errors.name && (
              <p
                className="text-sm text-destructive mt-1"
                data-testid="name-error"
              >
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              data-testid="email-label"
            >
              {t("sections.tunneling.email")}
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full"
              placeholder={t("sections.tunneling.emailPlaceholder")}
              data-testid="input-email"
            />
            {form.formState.errors.email && (
              <p
                className="text-sm text-destructive mt-1"
                data-testid="email-error"
              >
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label
            htmlFor="message"
            className="block text-sm font-medium mb-2"
            data-testid="message-label"
          >
            {t("sections.tunneling.message")}
          </Label>
          <Textarea
            id="message"
            {...form.register("message")}
            rows={4}
            className="w-full resize-none"
            placeholder={t("sections.tunneling.messagePlaceholder")}
            data-testid="textarea-message"
          />
          {form.formState.errors.message && (
            <p
              className="text-sm text-destructive mt-1"
              data-testid="message-error"
            >
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        {/* Tunneling Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-quantum-cyan to-quantum-blue text-background font-semibold rounded-lg hover:shadow-2xl hover:shadow-quantum-cyan hover:scale-105 transition-all duration-300 relative overflow-hidden"
            data-testid="submit-button"
          >
            <span className="relative z-10">
              {t("sections.tunneling.submit")}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-quantum-cyan opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Button>

          {/* Tunneling Animation Area */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                className="mt-4 h-16 relative overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 64 }}
                exit={{ opacity: 0, height: 0 }}
                data-testid="tunneling-animation"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="text-sm text-quantum-cyan"
                    data-testid="tunneling-probability-text"
                  >
                    {t("sections.tunneling.tunnelingProbability")}{" "}
                    <span data-testid="tunneling-probability">
                      {Math.round(tunnelingProgress)}
                    </span>
                    %
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                  <motion.div
                    className="h-full bg-gradient-to-r from-quantum-cyan to-purple-500"
                    style={{ width: `${tunnelingProgress}%` }}
                    transition={{ duration: 0.1 }}
                    data-testid="tunneling-progress-bar"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.form>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute inset-0 bg-card rounded-xl border-2 border-green-400 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            data-testid="success-message"
          >
            <div className="text-center">
              <motion.i
                className="fas fa-check-circle text-6xl text-green-400 mb-4"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <h4
                className="text-2xl font-bold text-green-400 mb-2"
                data-testid="success-title"
              >
                {t("sections.tunneling.successTitle")}
              </h4>
              <p className="text-green-300" data-testid="success-description">
                {t("sections.tunneling.successMessage")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
