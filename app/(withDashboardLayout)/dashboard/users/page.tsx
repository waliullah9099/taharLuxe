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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, User, UserPlus } from "lucide-react"
import Image from "next/image"

// Mock user data
const users = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Customer", "Manager"][i % 3],
  status: ["Active", "Inactive"][i % 2],
  lastLogin: new Date(2024, 4, 15 - i).toLocaleDateString(),
  orders: Math.floor(Math.random() * 20),
}))

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <div className="flex items-center gap-2">
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Fill in the details to add a new user to your system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddUserOpen(false)}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage users and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>{user.orders}</TableCell>
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
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
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

      {/* User Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: "1,234", icon: User },
          { title: "Active Users", value: "1,178", icon: User },
          { title: "New Users (This Month)", value: "56", icon: UserPlus },
          { title: "Admins", value: "8", icon: User },
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
