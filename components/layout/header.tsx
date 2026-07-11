"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/common/container";
import { navigation } from "@/data/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-[-0.05em] text-foreground"
            onClick={closeMenu}
          >
            Novaire
            <span className="text-primary">.</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="#contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Solicitar presupuesto
            </Link>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {isOpen ? (
          <nav className="border-t border-border py-6 lg:hidden">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="#contact"
                onClick={closeMenu}
                className="mt-2 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Solicitar presupuesto
              </Link>
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}