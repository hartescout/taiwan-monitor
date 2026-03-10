import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  crumbs: Crumb[];
};

export function BrowseBreadcrumb({ crumbs }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Breadcrumb>
        <BreadcrumbList className="text-xs [--muted-foreground:var(--t3)] [--foreground:var(--t1)]">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <span key={i} className="contents">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-[var(--t1)]">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={crumb.href!}
                        className="no-underline text-[var(--t3)] hover:text-[var(--t1)]"
                      >
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator className="text-[var(--t4)]" />
                )}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <Button
        variant="outline"
        size="xs"
        asChild
        className="[--border:var(--bd)] [--background:var(--bg-1)] [--accent:var(--bg-3)] [--accent-foreground:var(--t1)] text-[var(--t2)] hover:text-[var(--t1)]"
      >
        <Link href="/dashboard">Dashboard &rarr;</Link>
      </Button>
    </div>
  );
}
