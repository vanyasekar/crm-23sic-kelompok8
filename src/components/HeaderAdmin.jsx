import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient"; // Sesuaikan path ke supabase client Anda
import { useLocation, useNavigate } from "react-router-dom"; // Import untuk routing
import { Search, User, LogOut } from "lucide-react";

// Helper function untuk membuat nama tampilan dari email
const getDisplayNameFromEmail = (email) => {
  if (!email) return "User";
  const username = email.split("@")[0];
  // Mengubah 'john.doe' menjadi 'John Doe'
  const formattedName = username.replace(/[._-]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  return formattedName;
};

// Helper function untuk membuat breadcrumbs dari path URL
const generateBreadcrumbs = (pathname) => {
    if (pathname === '/dashboard') return 'Dashboard';
    const path = pathname.replace('/', '').replace(/-/g, ' ');
    return path.charAt(0).toUpperCase() + path.slice(1);
}

export default function Header() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("User");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Efek untuk mengambil data pengguna saat komponen dimuat
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setDisplayName(getDisplayNameFromEmail(user.email));
      }
    };
    fetchUser();
  }, []);

  // Efek untuk menutup dropdown saat klik di luar area dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Arahkan pengguna ke halaman login setelah sign out
    navigate("/"); 
  };
  
  const currentBreadcrumb = generateBreadcrumbs(location.pathname);

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow-sm border-b sticky top-0 z-20">
      {/* Breadcrumbs Dinamis */}
      <div className="text-sm text-gray-500">
        Pages / <span className="text-gray-900 font-semibold">{currentBreadcrumb}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 pl-10 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-purple-700 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">{displayName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}