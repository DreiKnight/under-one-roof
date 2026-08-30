import { RoofMark } from "@/components/RoofMark";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <RoofMark className="h-12 w-12" />
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink">
        Nothing under this roof
      </h1>
      <p className="mt-2 max-w-sm text-muted">
        We couldn't find that page. It may have moved, or never existed.
      </p>
      <Button to="/" className="mt-6">
        Back home
      </Button>
    </div>
  );
}
