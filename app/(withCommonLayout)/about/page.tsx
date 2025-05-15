import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Users, Globe, Award, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Company</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to revolutionize online shopping with quality products, exceptional service, and a seamless
          experience.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4">
            <p>
              Founded in 2015, E-Commerce began with a simple idea: to create an online shopping experience that truly
              puts customers first. What started as a small operation with just five team members has grown into a
              thriving marketplace serving customers worldwide.
            </p>
            <p>
              Our founder, Jane Smith, recognized a gap in the market for an e-commerce platform that combined quality
              products, transparent pricing, and exceptional customer service. Drawing from her background in retail and
              technology, she assembled a team of like-minded individuals who shared her vision.
            </p>
            <p>
              Over the years, we've expanded our product range, enhanced our technology, and refined our processes—all
              while staying true to our core values. Today, we're proud to offer thousands of products across multiple
              categories, but we still approach each customer interaction with the same care and attention as we did on
              day one.
            </p>
          </div>
          <Button className="mt-6" asChild>
            <Link href="/contact">
              Contact Us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden">
          <Image src="/placeholder.svg?height=600&width=600" alt="Our story" fill className="object-cover" />
        </div>
      </div>

      {/* Mission and Values */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're guided by a set of core principles that inform everything we do, from product selection to customer
            service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShoppingBag,
              title: "Quality Products",
              description:
                "We carefully curate our selection to offer only the highest quality products that meet our rigorous standards.",
            },
            {
              icon: Users,
              title: "Customer First",
              description:
                "Every decision we make is guided by what's best for our customers, from website design to return policies.",
            },
            {
              icon: Globe,
              title: "Sustainability",
              description:
                "We're committed to reducing our environmental impact through eco-friendly products and sustainable practices.",
            },
            {
              icon: Award,
              title: "Integrity",
              description:
                "We operate with transparency and honesty in all aspects of our business, earning trust through our actions.",
            },
          ].map((value, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind our success, working together to deliver an exceptional shopping
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Jane Smith",
              role: "Founder & CEO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Michael Johnson",
              role: "CTO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Sarah Williams",
              role: "Head of Product",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "David Chen",
              role: "Customer Experience Director",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Stats */}
      <div className="mb-20 bg-muted py-12 px-6 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Numbers that reflect our growth and commitment to customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "1M+", label: "Happy Customers" },
            { value: "50K+", label: "Products Available" },
            { value: "100+", label: "Countries Served" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it—hear from some of our satisfied customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "I've been shopping with E-Commerce for over two years now, and I'm consistently impressed by their product quality and customer service. My go-to online store!",
              author: "Emily R.",
              location: "New York, USA",
            },
            {
              quote:
                "The attention to detail in packaging and the speed of delivery is unmatched. I appreciate a company that values my time and provides a premium experience from browsing to unboxing.",
              author: "Marcus T.",
              location: "London, UK",
            },
            {
              quote:
                "As someone who shops primarily online, I've had my fair share of disappointing experiences. E-Commerce stands out for their transparency, reliability, and how they handle returns.",
              author: "Sophia L.",
              location: "Toronto, Canada",
            },
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-primary text-primary-foreground py-16 px-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Join thousands of satisfied customers who have made us their preferred online shopping destination.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
