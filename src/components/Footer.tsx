export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--lagoon)] px-4 py-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-0 sm:text-left">
        <p className="m-0 text-xs sm:text-sm">
          &copy; {year} Your name here. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
