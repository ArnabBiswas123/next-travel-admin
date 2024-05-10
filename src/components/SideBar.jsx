"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation'
export default function SideBar() {
  const pathname = usePathname();


  return (
    <div className="bg-gray-800 text-white h-screen w-64 py-6">
      <ul className="mt-4">
        <Link href="/dashboard/tours/upload_tour_category">
          <li className={`py-2 px-4 hover:bg-gray-700 cursor-pointer font-home text-sm ${pathname==='/dashboard/tours/upload_tour_category'?'bg-gray-700':''}`}>
            Upload Tour Category
          </li>
        </Link>
        <Link  href="/dashboard/tours/alltours">
        <li className={`py-2 px-4 hover:bg-gray-700 cursor-pointer font-home text-sm ${pathname==='/dashboard/tours/alltours'?'bg-gray-700':''}`}>
          Tour Categories
        </li>
        </Link>
        <Link  href="/dashboard/tours/upload_inclusions">
        <li className={`py-2 px-4 hover:bg-gray-700 cursor-pointer font-home text-sm ${pathname==='/dashboard/tours/upload_inclusions'?'bg-gray-700':''}`}>
          Upload Inclusions
        </li>
        </Link>
        <Link  href="/dashboard/tours/all_inclusions">
        <li className={`py-2 px-4 hover:bg-gray-700 cursor-pointer font-home text-sm ${pathname==='/dashboard/tours/all_inclusions'?'bg-gray-700':''}`}>
          Inclusions
        </li>
        </Link>
        <Link  href="/dashboard/tours/upload_exclusions">
        <li className={`py-2 px-4 hover:bg-gray-700 cursor-pointer font-home text-sm ${pathname==='/dashboard/tours/upload_exclusions'?'bg-gray-700':''}`}>
          Upload Exclusions
        </li>
        </Link>
        <Link  href="/dashboard/tours/all_exclusions">
        <li className={`py-2 px-4 hover:bg-gray-700 cursor-pointer font-home text-sm ${pathname==='/dashboard/tours/all_exclusions'?'bg-gray-700':''}`}>
          Exclusions
        </li>
        </Link>
        {/* <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Menu Item 3</li> */}
      </ul>
    </div>
  );
}
