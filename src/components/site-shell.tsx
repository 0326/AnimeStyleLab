import { LocaleProvider } from "./locale-provider";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <LocaleProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </LocaleProvider>
  );
}
