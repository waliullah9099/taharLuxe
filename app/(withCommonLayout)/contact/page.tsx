"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    // Show success message
    alert("Your message has been sent. We'll get back to you soon!")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Fill out the form below or use our contact information
          to get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="grid gap-6">
              <div className="flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground mt-1">
                    123 E-Commerce Street, Suite 100
                    <br />
                    New York, NY 10001, USA
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone Number</h3>
                  <p className="text-muted-foreground mt-1">
                    Customer Support: +1 (555) 123-4567
                    <br />
                    Sales Inquiries: +1 (555) 987-6543
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Address</h3>
                  <p className="text-muted-foreground mt-1">
                    Customer Support: support@ecommerce.com
                    <br />
                    Sales Inquiries: sales@ecommerce.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-muted-foreground mt-1">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
            <p className="text-muted-foreground mb-4">
              Follow us on social media to stay updated with our latest products and offers.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border h-[400px] relative mb-16">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Map location" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button>View on Google Maps</Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              question: "What are your shipping options?",
              answer:
                "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select areas. Shipping costs vary based on location and chosen method.",
            },
            {
              question: "How can I track my order?",
              answer:
                "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
            },
            {
              question: "What is your return policy?",
              answer:
                "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Please visit our Returns page for more information.",
            },
            {
              question: "Do you ship internationally?",
              answer:
                "Yes, we ship to most countries worldwide. International shipping times and costs vary by location. Please check our International Shipping page for details.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
