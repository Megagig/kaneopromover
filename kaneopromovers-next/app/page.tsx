export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-text-primary md:text-6xl">
          Kaneo Pro Movers
        </h1>
        <p className="mt-4 font-body text-lg text-text-secondary">
          Professional Moving Services — Airdrie &amp; Calgary, AB
        </p>
        <div className="mt-8">
          <a
            href="/quote"
            className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-black transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </div>
  );
}
