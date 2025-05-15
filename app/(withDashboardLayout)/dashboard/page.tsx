import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +20.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +12.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                +8.4%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDown className="mr-1 h-3 w-3" />
                -2.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  name: "John Doe",
                  email: "john.doe@example.com",
                  amount: "$250.00",
                  date: "2 hours ago",
                },
                {
                  name: "Jane Smith",
                  email: "jane.smith@example.com",
                  amount: "$169.50",
                  date: "3 hours ago",
                },
                {
                  name: "Robert Johnson",
                  email: "robert.johnson@example.com",
                  amount: "$350.00",
                  date: "5 hours ago",
                },
                {
                  name: "Emily Davis",
                  email: "emily.davis@example.com",
                  amount: "$450.00",
                  date: "6 hours ago",
                },
                {
                  name: "Michael Wilson",
                  email: "michael.wilson@example.com",
                  amount: "$199.99",
                  date: "8 hours ago",
                },
              ].map((sale, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-muted-foreground">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You received 30 orders this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  id: "ORD-001",
                  status: "Delivered",
                  items: 3,
                  amount: "$250.00",
                },
                {
                  id: "ORD-002",
                  status: "Processing",
                  items: 1,
                  amount: "$169.50",
                },
                {
                  id: "ORD-003",
                  status: "Shipped",
                  items: 2,
                  amount: "$350.00",
                },
                {
                  id: "ORD-004",
                  status: "Pending",
                  items: 5,
                  amount: "$450.00",
                },
                {
                  id: "ORD-005",
                  status: "Delivered",
                  items: 2,
                  amount: "$199.99",
                },
              ].map((order, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.status} • {order.items} items
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{order.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>Add, edit, or remove products from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/products">View Products</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Process Orders</CardTitle>
            <CardDescription>View and manage customer orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/orders">View Orders</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/users">View Users</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Store Settings</CardTitle>
            <CardDescription>Configure your store settings and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard/settings">View Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
