"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real app, you would send this to your API
    console.log(values);
    setIsSubmitted(true);
  };

  return (
    <section className="bg-muted/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Stay updated with the latest products, exclusive offers, and style inspiration.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {isSubmitted ? (
            <div className="rounded-lg border bg-card p-6 text-center">
              <Badge variant="outline" className="mb-2 bg-primary/10">
                Success
              </Badge>
              <h3 className="text-lg font-medium">Thank you for subscribing!</h3>
              <p className="mt-2 text-muted-foreground">
                You're now on the list and will be the first to hear about our latest collections
                and exclusive offers.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12" size="lg">
                  Subscribe
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <a href="/privacy-policy" className="underline">
                    Privacy Policy
                  </a>
                  . We promise not to spam your inbox.
                </p>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
}