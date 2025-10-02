import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tools } from "@/lib/tools"

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Tink's Tools</h1>
        <p className="text-muted-foreground">
          A collection of handy utilities to make your work easier.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link key={tool.id} href={`/${tool.id}`}>
            <Card className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
