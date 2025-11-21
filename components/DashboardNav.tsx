// components/DashboardNav.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardNav() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/rag', label: 'RAG Analytics' },
    { href: '/dashboard/users', label: 'User Analytics' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-4 px-3 border-b-2 font-medium text-sm ${
                pathname === link.href
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
