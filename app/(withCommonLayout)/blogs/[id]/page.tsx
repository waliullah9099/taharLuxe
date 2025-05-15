import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Share2, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Mock blog post data
  const post = {
    id: params.id,
    title: `Detailed Blog Post Title ${params.id}`,
    date: "May 15, 2024",
    author: "John Doe",
    category: "Technology",
    image: "/placeholder.svg?height=600&width=1200",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    ],
    tags: ["Technology", "Innovation", "Design", "Trends"],
  }

  // Related posts
  const relatedPosts = Array.from({ length: 3 }).map((_, i) => ({
    id: Number(params.id) + i + 1,
    title: `Related Blog Post ${Number(params.id) + i + 1}`,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "May 10, 2024",
    image: "/placeholder.svg?height=300&width=500",
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/blogs" className="inline-flex items-center text-sm hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-muted-foreground">{post.date}</span>
            <span className="text-sm px-2 py-1 bg-muted rounded-full">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src="/placeholder.svg?height=100&width=100" alt={post.author} fill className="object-cover" />
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video overflow-hidden rounded-xl mb-8">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        {/* Social Actions */}
        <div className="flex items-center gap-4 mt-8 border-t border-b py-4">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" /> Like
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" /> Comment
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>

        {/* Author Bio */}
        <div className="flex items-start gap-4 mt-8 p-6 bg-muted rounded-lg">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
            <Image src="/placeholder.svg?height=100&width=100" alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-lg">About {post.author}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} href={`/blogs/${post.id}`} className="group border rounded-lg overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
