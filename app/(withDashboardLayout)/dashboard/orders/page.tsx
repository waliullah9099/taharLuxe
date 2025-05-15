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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye } from "lucide-react"

// Mock order data
const orders = Array.from({ length: 10 }).map((_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  date: new Date(2024, 4, 15 - i).toLocaleDateString(),
  total: Math.floor(Math.random() * 500) + 50,
  status: ["Delivered", "Processing", "Shipped", "Pending", "Cancelled"][i % 5],
  items: Math.floor(Math.random() * 5) + 1,
  paymentMethod: ["Credit Card", "PayPal", "Bank Transfer"][i % 3],
}))

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false)

  const handleViewOrder = (order: (typeof orders)[0]) => {
    setSelectedOrder(order)
    setIsViewOrderOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Orders</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewOrder(order)}>View Order</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
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

      {/* Order Details Dialog */}
      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>{selectedOrder ? `Order ID: ${selectedOrder.id}` : ""}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Customer Information</h3>
                  <p className="text-sm">{selectedOrder.customer}</p>
                  <p className="text-sm">customer@example.com</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Order Information</h3>
                  <p className="text-sm">Date: {selectedOrder.date}</p>
                  <p className="text-sm">Payment: {selectedOrder.paymentMethod}</p>
                  <p className="text-sm">Status: {selectedOrder.status}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Order Items</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: selectedOrder.items }).map((_, i) => {
                        const price = Math.floor(Math.random() * 100) + 10
                        const quantity = Math.floor(Math.random() * 3) + 1
                        return (
                          <TableRow key={i}>
                            <TableCell>Product {i + 1}</TableCell>
                            <TableCell>{quantity}</TableCell>
                            <TableCell>${price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${(price * quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between border-t pt-4">
                <div>
                  <p className="text-sm">Subtotal:</p>
                  <p className="text-sm">Shipping:</p>
                  <p className="text-sm">Tax:</p>
                  <p className="text-sm font-bold">Total:</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">${(selectedOrder.total * 0.85).toFixed(2)}</p>
                  <p className="text-sm">${(selectedOrder.total * 0.05).toFixed(2)}</p>
                  <p className="text-sm">${(selectedOrder.total * 0.1).toFixed(2)}</p>
                  <p className="text-sm font-bold">${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Print Invoice</Button>
                <Button>Update Status</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Orders", value: "1,234", icon: Eye },
          { title: "Pending Orders", value: "56", icon: Eye },
          { title: "Completed Orders", value: "1,178", icon: Eye },
          { title: "Cancelled Orders", value: "24", icon: Eye },
        ].map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-4 text-2xl font-bold">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
