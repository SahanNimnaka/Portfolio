import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[calc(100dvh-5rem)] items-center pt-20"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-6xl font-bold text-foreground md:text-8xl">
            404
          </h1>
          <h2 className="mb-6 text-2xl font-semibold text-foreground md:text-3xl">
            Page Not Found
          </h2>
          <p className="mb-8 text-muted">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Button href="/">Go Back Home</Button>
        </div>
      </Container>
    </main>
  );
}
