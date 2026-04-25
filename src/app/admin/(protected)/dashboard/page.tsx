import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  MessageSquare,
  FolderKanban,
  Users,
  Eye,
  TrendingUp,
  Plus,
  FileText,
  Quote,
  Settings,
  ArrowUpRight,
  Activity,
  Zap,
} from "lucide-react";
import { getActivityLogs, getDashboardSnapshot, getProjects, getUnreadMessages } from "@/lib/queries";
import { StatCard } from "@/components/admin/ui/card";
import { Card, CardHeader, CardContent } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/data-table";
import { Button } from "@/components/admin/ui/button";

export default async function DashboardPage() {
  const [snapshot, unreadMessages, activityLogs, projects] = await Promise.all([
    getDashboardSnapshot(),
    getUnreadMessages(),
    getActivityLogs(),
    getProjects(),
  ]);

  const stats = [
    {
      title: "Total Contacts",
      value: snapshot.totalContacts,
      subtitle: "All time",
      icon: <Users className="h-5 w-5" />,
      delay: 0,
    },
    {
      title: "Unread Messages",
      value: snapshot.unreadContacts,
      subtitle: "New inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
      delay: 0.1,
    },
    {
      title: "Total Projects",
      value: snapshot.totalProjects,
      subtitle: "Showcase items",
      icon: <FolderKanban className="h-5 w-5" />,
      delay: 0.2,
    },
    {
      title: "Featured",
      value: snapshot.featuredProjects,
      subtitle: "On homepage",
      icon: <TrendingUp className="h-5 w-5" />,
      delay: 0.3,
    },
  ];

  const quickActions = [
    { label: "Add Project", href: "/admin/projects", icon: <Plus className="h-4 w-4" /> },
    { label: "Write Blog", href: "/admin/blogs", icon: <FileText className="h-4 w-4" /> },
    { label: "Add Testimonial", href: "/admin/testimonials", icon: <Quote className="h-4 w-4" /> },
    { label: "Settings", href: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
  ];

  const chartData = [
    { name: "Mon", visitors: 120, pageViews: 240 },
    { name: "Tue", visitors: 180, pageViews: 320 },
    { name: "Wed", visitors: 150, pageViews: 280 },
    { name: "Thu", visitors: 220, pageViews: 400 },
    { name: "Fri", visitors: 280, pageViews: 520 },
    { name: "Sat", visitors: 190, pageViews: 360 },
    { name: "Sun", visitors: 140, pageViews: 260 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-white/50">Welcome back! Here&apos;s your portfolio overview.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button variant="secondary" size="sm" icon={action.icon}>
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages Section */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent Inquiries"
            subtitle="Latest contact form submissions"
            action={
              <Link href="/admin/messages">
                <Button variant="ghost" size="sm">
                  View All <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            }
          />
          <CardContent className="p-0">
            {unreadMessages.length > 0 ? (
              <div className="divide-y divide-white/5">
                {unreadMessages.slice(0, 5).map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-4 p-4 transition-colors hover:bg-white/5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="truncate font-medium text-white">{message.name}</h4>
                        <span className="flex-shrink-0 text-xs text-white/40">
                          {message.created_at
                            ? format(new Date(message.created_at), "MMM dd")
                            : "New"}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-white/50">{message.email}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-white/40">{message.message}</p>
                    </div>
                    <Badge variant="danger">New</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <MessageSquare className="h-8 w-8 text-white/20" />
                </div>
                <p className="mt-4 text-sm text-white/50">No new messages</p>
                <p className="mt-1 text-xs text-white/30">Contact form submissions will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card>
          <CardHeader title="Recent Activity" subtitle="Admin actions log" />
          <CardContent className="p-0">
            {activityLogs.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                <div className="divide-y divide-white/5">
                  {activityLogs.slice(0, 8).map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5">
                        <Activity className="h-4 w-4 text-white/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">{log.action}</p>
                        <p className="mt-0.5 text-xs text-white/40">
                          {log.created_at
                            ? format(new Date(log.created_at), "MMM dd, hh:mm a")
                            : "Recently"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <Zap className="h-8 w-8 text-white/20" />
                </div>
                <p className="mt-4 text-sm text-white/50">No activity yet</p>
                <p className="mt-1 text-xs text-white/30">Actions will be logged here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Projects & Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Projects Section */}
        <Card>
          <CardHeader
            title="Recent Projects"
            subtitle="Your portfolio showcase"
            action={
              <Link href="/admin/projects">
                <Button variant="ghost" size="sm">
                  Manage <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            }
          />
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {projects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-lg">
                    {project.icon || "📁"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate font-medium text-white">{project.title}</h4>
                    <p className="mt-0.5 truncate text-xs text-white/50">{project.summary}</p>
                  </div>
                  <Badge variant={project.featured ? "info" : "default"}>
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Chart Placeholder */}
        <Card>
          <CardHeader
            title="Visitor Analytics"
            subtitle="Last 7 days performance"
            action={
              <Button variant="ghost" size="sm">
                Details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            }
          />
          <CardContent>
            <div className="flex h-48 items-end justify-between gap-2">
              {chartData.map((day, index) => {
                const maxVisitors = Math.max(...chartData.map((d) => d.visitors));
                const height = (day.visitors / maxVisitors) * 100;
                return (
                  <div key={day.name} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative w-full flex-1 flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-500"
                        style={{ minHeight: "8px" }}
                      />
                    </div>
                    <span className="text-xs text-white/40">{day.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="text-white/50">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-white/50">Page Views</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}