import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <p className="text-lg font-bold text-foreground">
              Sahan
              <span aria-hidden="true" className="text-primary">
                .
              </span>
            </p>

            <p className="mt-1 text-sm text-muted">
              Building modern digital experiences.
            </p>
          </div>

          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Sahan Nimnaka. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
