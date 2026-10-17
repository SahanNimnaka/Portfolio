import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="pt-20 min-h-screen flex items-center">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-foreground">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
