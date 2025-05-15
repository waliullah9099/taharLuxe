"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Package } from "lucide-react"
import Image from "next/image"

// Mock product data
const products = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `Product Name ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 9.99,
  category: ["Electronics", "Clothing", "Home & Kitchen", "Beauty"][i % 4],
  stock: Math.floor(Math.random() * 100),
  status: ["In Stock", "Low Stock", "Out of Stock"][i % 3],
}))

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Fill in the details to add a new product to your store.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <Input id="image" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddProductOpen(false)}>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your store products, inventory, and categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 rounded-md overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : product.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Product</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to <strong>10</strong> of <strong>100</strong> results
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Product Categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "Electronics", count: 24 },
          { name: "Clothing", count: 36 },
          { name: "Home & Kitchen", count: 18 },
          { name: "Beauty", count: 12 },
        ].map((category, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{category.name}</CardTitle>
              <CardDescription>{category.count} products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4">
                  <Button variant="link" className="p-0 h-auto">
                    View Category
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
