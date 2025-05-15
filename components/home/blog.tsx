import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock blog data
const blogs = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: `Blog Post Title ${i + 1}`,
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  date: "May 15, 2024",
  category: ["Fashion", "Technology", "Lifestyle", "Home Decor"][i % 4],
  image: "/placeholder.svg?height=300&width=500",
}))

const Blog = () => {
      const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)
    
    return (
        <>
             <section className="bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-muted-foreground">
              Our most popular items loved by customers
            </p>
          </div>
          <Button variant="link" size="sm" asChild className="mt-4 sm:mt-0">
            <Link href="/products">
              View all blogs
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

         {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {otherBlogs.slice(0,3).map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`} className="group border rounded-lg overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-muted-foreground">{blog.date}</span>
                <span className="text-xs px-2 py-1 bg-muted rounded-full">{blog.category}</span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{blog.excerpt}</p>
              <Button variant="link" className="p-0 h-auto">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
        </>
    );
};

export default Blog;