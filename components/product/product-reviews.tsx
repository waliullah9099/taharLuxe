"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

const mockReviews = [
  {
    id: "1",
    author: "John D.",
    avatar: "JD",
    date: "2025-03-01T00:00:00.000Z",
    rating: 5,
    title: "Exceeded my expectations",
    content:
      "This product is absolutely amazing. The quality is top-notch and it looks even better in person. I've received so many compliments. Highly recommend!",
  },
  {
    id: "2",
    author: "Sarah W.",
    avatar: "SW",
    date: "2025-02-20T00:00:00.000Z",
    rating: 4,
    title: "Great quality",
    content:
      "Very impressed with the quality. The only reason I'm giving 4 stars instead of 5 is because the delivery took a bit longer than expected. Otherwise, perfect!",
  },
  {
    id: "3",
    author: "Michael J.",
    avatar: "MJ",
    date: "2025-02-15T00:00:00.000Z",
    rating: 5,
    title: "Perfect addition to my collection",
    content:
      "I've been looking for something like this for a while and I'm so glad I found it here. The attention to detail is impressive and it's exactly as described.",
  },
];

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState(mockReviews);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Count ratings by star level
  const ratingCounts = Array(5)
    .fill(0)
    .map(
      (_, index) =>
        reviews.filter((review) => review.rating === 5 - index).length
    );

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newReview = {
      id: (reviews.length + 1).toString(),
      author: formData.get("name") as string,
      avatar: (formData.get("name") as string).split(" ").map(n => n[0]).join(""),
      date: new Date().toISOString(),
      rating: Number(formData.get("rating")),
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };
    
    setReviews([newReview, ...reviews]);
    setIsReviewDialogOpen(false);
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Reviews summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <div className="mt-2 flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Based on {reviews.length} reviews
              </div>

              <div className="mt-6 w-full space-y-3">
                {ratingCounts.map((count, index) => (
                  <div key={5 - index} className="flex items-center">
                    <div className="w-10 text-sm">{5 - index} stars</div>
                    <div className="ml-4 h-2 flex-1 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${(count / reviews.length) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="ml-4 w-10 text-right text-sm">
                      {count}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Write a Review</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Write a Review</DialogTitle>
                      <DialogDescription>
                        Share your experience with this product. Your review will help other customers make better purchasing decisions.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="rating" className="text-right">
                            Rating
                          </Label>
                          <select
                            id="rating"
                            name="rating"
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          >
                            <option value="">Select rating</option>
                            <option value="5">5 Stars - Excellent</option>
                            <option value="4">4 Stars - Good</option>
                            <option value="3">3 Stars - Average</option>
                            <option value="2">2 Stars - Poor</option>
                            <option value="1">1 Star - Very Poor</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="content" className="text-right">
                            Review
                          </Label>
                          <Textarea
                            id="content"
                            name="content"
                            className="col-span-3"
                            rows={4}
                            required
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Submit Review</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Review list */}
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="border-b pb-8 last:border-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h4 className="font-medium">{review.author}</h4>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <div className="mt-1 flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                    </div>
                    <h5 className="mt-2 font-medium">{review.title}</h5>
                    <p className="mt-2 text-muted-foreground">
                      {review.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}