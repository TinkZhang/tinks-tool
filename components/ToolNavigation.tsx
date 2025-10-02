"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { tools } from "@/lib/tools"

export function ToolNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {tools.map((tool) => (
          <NavigationMenuItem key={tool.id}>
            <Link href={`/${tool.id}`} legacyBehavior passHref>
              <NavigationMenuLink className="px-3">{tool.title}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

