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

export default function BlogsPage() {
  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>

      {/* Featured Blog Post */}
      <div className="mb-12">
        <Link href={`/blogs/${featuredBlog.id}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={featuredBlog.image || "/placeholder.svg"}
              alt={featuredBlog.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{featuredBlog.date}</span>
              <span className="text-sm px-2 py-1 bg-muted rounded-full">{featuredBlog.category}</span>
            </div>
            <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">{featuredBlog.title}</h2>
            <p className="text-muted-foreground">{featuredBlog.excerpt}</p>
            <Button variant="link" className="p-0 h-auto">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherBlogs.map((blog) => (
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

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <Button variant="default" size="icon">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
