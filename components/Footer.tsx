import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-400">
            <span className="font-medium text-gray-500">픽셀러</span>
            <span className="hidden sm:inline">·</span>
            <span>문의: baromcc@gmail.com</span>
            <span className="hidden sm:inline">·</span>
            <span>© {new Date().getFullYear()} 픽셀러. All rights reserved.</span>
          </div>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-gray-600 transition-colors">이용약관</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">개인정보처리방침</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
