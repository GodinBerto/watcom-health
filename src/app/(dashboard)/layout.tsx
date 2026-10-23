"use client";
import { Logo } from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { clearSessionUser, getSessionUser } from "@/lib/auth";
import { courses } from "@/lib/courses";
import { Award, BookOpen, LayoutDashboard, LogOut, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState(() => getSessionUser());
  const enrolled = [courses[0], courses[2]].filter((course): course is (typeof courses)[number] =>
    Boolean(course),
  );

  function logout() {
    clearSessionUser();
    router.replace("/auth");
  }

  return (
    <main>
      <SidebarProvider>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Student portal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/courses">
                        <ShoppingBag />
                        <span>Browse courses</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>My learning</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {enrolled.map((course) => (
                    <SidebarMenuItem key={course.slug}>
                      <SidebarMenuButton asChild>
                        <Link href={`/courses/${course.slug}`}>
                          <BookOpen />
                          <span>{course.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {enrolled.map((course) => (
                    <SidebarMenuItem key={`${course.slug}-certificate`}>
                      <SidebarMenuButton asChild>
                        <Link href={`/certificate/${course.slug}`}>
                          <Award />
                          <span>{course.title} certificate</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-3">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <span>Log out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 items-center justify-between gap-3 border-b bg-background px-4 md:px-6">
            <div className="flex h-14 items-center gap-3">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground">Student dashboard</span>
            </div>
            <div className="mb-2 flex items-center gap-3 px-2">
              <div className="rounded-full bg-black p-2 text-white">
                <User size={15} />
              </div>
              <div>
                <p className="truncate text-sm font-medium">{user?.name ?? "Student"}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
