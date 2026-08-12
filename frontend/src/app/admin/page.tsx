"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  description: string;
  badge?: string;
  isBestSeller?: boolean;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"home" | "products" | "settings" | "advice">("home");
  const [saveNotification, setSaveNotification] = useState("");

  // Home Page Settings State
  const [homeSettings, setHomeSettings] = useState({
    announcementText: "Anita's List - Choose, organise and buy your baby kit",
    heroTitle1: "Helping you choose the right baby essentials, based on *decades of trusted expertise.*",
    heroSubtitle1: "Discover baby essentials, seek advice and curate a list that feels right for you and your future little one.",
    heroTitle2: "Curate lists together with friends, family and *your loved ones.*",
    heroSubtitle2: "Share your registry links easily and coordinate gifts seamlessly.",
    heroTitle3: "Find expert suggestions for every stage of *your parenting journey.*",
    heroSubtitle3: "From newborn clothes to monitors and travel gear, we have you covered.",
    expertAdviceTitle: "Personalised advice based on years of experience",
    expertAdviceDesc: "Anita's list was created to strip away the noise and bring clarity to baby shopping.",
  });

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "Anita's List",
    contactEmail: "hello@anitaslist.com",
    contactPhone: "+44 (0) 20 7946 0912",
    loginBadge: "WELCOME BACK TO ANITA'S LIST",
    loginTitle: "Sign in to access your curated lists & recommendations.",
  });

  // Products State
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 1,
      name: "Bugaboo Fox 5 Pushchair",
      category: "Pushchairs",
      price: "£1,195.00",
      rating: 4.9,
      image: "/images/products/pushchair-1.png",
      description: "The ultimate all-terrain pushchair for effortless strolls.",
      badge: "Best Seller",
      isBestSeller: true,
    },
    {
      id: 2,
      name: "SnüzPod4 Bedside Crib",
      category: "Nursery",
      price: "£219.00",
      rating: 4.8,
      image: "/images/products/crib-1.png",
      description: "Keep your baby close with the breathable bedside crib.",
      badge: "Top Pick",
    },
    {
      id: 3,
      name: "Cybex Anoris T i-Size Car Seat",
      category: "Car Seats",
      price: "£599.00",
      rating: 5.0,
      image: "/images/products/car-seat-1.png",
      description: "Revolutionary full-body airbag technology for child safety.",
    },
  ]);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Pushchairs",
    price: "",
    image: "",
    description: "",
    badge: "",
  });

  // Load stored data from localStorage on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("anita_admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    const savedHome = localStorage.getItem("anita_home_settings");
    if (savedHome) setHomeSettings(JSON.parse(savedHome));

    const savedSite = localStorage.getItem("anita_site_settings");
    if (savedSite) setSiteSettings(JSON.parse(savedSite));

    const savedProducts = localStorage.getItem("anita_products_data");
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (loginEmail === "admin@anitaslist.com" && loginPassword === "admin123") ||
      loginEmail === "admin"
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("anita_admin_authenticated", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid credentials! Use email: admin@anitaslist.com and password: admin123");
    }
  };

  const handleQuickAdminLogin = () => {
    setLoginEmail("admin@anitaslist.com");
    setLoginPassword("admin123");
    setIsAuthenticated(true);
    localStorage.setItem("anita_admin_authenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("anita_admin_authenticated");
  };

  const showNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(""), 3500);
  };

  const handleSaveHomeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("anita_home_settings", JSON.stringify(homeSettings));
    showNotification("✅ Home Page content updated successfully!");
  };

  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("anita_site_settings", JSON.stringify(siteSettings));
    showNotification("✅ Site Settings saved successfully!");
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const item: ProductItem = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price.startsWith("£") ? newProduct.price : `£${newProduct.price}`,
      rating: 4.8,
      image: newProduct.image || "/images/products/pushchair-1.png",
      description: newProduct.description,
      badge: newProduct.badge,
    };

    const updated = [item, ...products];
    setProducts(updated);
    localStorage.setItem("anita_products_data", JSON.stringify(updated));
    setNewProduct({ name: "", category: "Pushchairs", price: "", image: "", description: "", badge: "" });
    showNotification("✅ New Product added to catalog!");
  };

  const handleDeleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("anita_products_data", JSON.stringify(updated));
    showNotification("🗑️ Product removed!");
  };

  // If Not Authenticated, show sleek Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#EBE7DF] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-[#F8F8F2] border border-[#CEBFA7] shadow-xl p-8 rounded-none">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <img src="/images/logo.svg" alt="Anita's List Logo" className="h-10 mx-auto" />
            </Link>
            <h1 className="font-accent text-2xl text-[#2D1A14] font-normal">Content Management System</h1>
            <p className="text-xs text-[#2D1A14]/70 mt-1 uppercase tracking-wider font-semibold">
              Admin CMS Login Panel
            </p>
          </div>

          {/* Quick Login Button */}
          <button
            onClick={handleQuickAdminLogin}
            className="w-full py-3 mb-6 bg-[#8B9A6B] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#788859] transition-colors border-none cursor-pointer text-center block"
          >
            ⚡ 1-Click Master Admin Login
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[1px] bg-[#CEBFA7]"></div>
            <span className="text-[11px] text-[#2D1A14]/60 uppercase font-semibold">OR ENTER CREDENTIALS</span>
            <div className="flex-1 h-[1px] bg-[#CEBFA7]"></div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {loginError && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-800 text-xs font-medium">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@anitaslist.com"
                required
                className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14] focus:outline-none focus:border-[#C77065]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14] focus:outline-none focus:border-[#C77065]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-[#2D1A14] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#C77065] transition-colors border-none cursor-pointer"
            >
              Sign In to CMS
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-[#CEBFA7]/50">
            <Link href="/" className="text-xs text-[#2D1A14]/80 hover:text-[#C77065] underline">
              ← Return to Anita's List Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBE7DF] text-[#2D1A14] font-sans">
      {/* Header Bar */}
      <header className="bg-[#2D1A14] text-white px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img src="/images/logo.svg" alt="Anita's List" className="h-8 invert brightness-200" />
          </Link>
          <span className="bg-[#C77065] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
            Content Manager
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-white/80 hover:text-white underline font-medium"
          >
            🌐 View Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-white/40 text-white text-xs font-bold px-3 py-1.5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Save Notification Banner */}
      {saveNotification && (
        <div className="bg-[#8B9A6B] text-white text-center py-2.5 px-4 font-bold text-sm tracking-wide sticky top-0 z-50 transition-all">
          {saveNotification}
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-[#CEBFA7]">
          <div>
            <h1 className="font-accent text-3xl font-normal text-[#2D1A14]">Website Content Management</h1>
            <p className="text-xs text-[#2D1A14]/70 mt-1">
              Update home page banners, product listings, advice sections and site settings.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-colors ${
                activeTab === "home" ? "bg-[#2D1A14] text-white" : "bg-[#CEBFA7]/40 text-[#2D1A14] hover:bg-[#CEBFA7]"
              }`}
            >
              🏠 Home Page
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-colors ${
                activeTab === "products" ? "bg-[#2D1A14] text-white" : "bg-[#CEBFA7]/40 text-[#2D1A14] hover:bg-[#CEBFA7]"
              }`}
            >
              🛒 Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer border-none transition-colors ${
                activeTab === "settings" ? "bg-[#2D1A14] text-white" : "bg-[#CEBFA7]/40 text-[#2D1A14] hover:bg-[#CEBFA7]"
              }`}
            >
              ⚙️ Site Settings
            </button>
          </div>
        </div>

        {/* TAB 1: HOME PAGE CONTENT */}
        {activeTab === "home" && (
          <form onSubmit={handleSaveHomeSettings} className="flex flex-col gap-6 max-w-4xl">
            <div className="bg-[#F8F8F2] border border-[#CEBFA7] p-6 flex flex-col gap-4">
              <h2 className="font-accent text-xl border-b border-[#CEBFA7] pb-2 font-normal">
                Announcement Bar
              </h2>
              <div>
                <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                  Top Bar Announcement Text
                </label>
                <input
                  type="text"
                  value={homeSettings.announcementText}
                  onChange={(e) => setHomeSettings({ ...homeSettings, announcementText: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                />
              </div>
            </div>

            <div className="bg-[#F8F8F2] border border-[#CEBFA7] p-6 flex flex-col gap-4">
              <h2 className="font-accent text-xl border-b border-[#CEBFA7] pb-2 font-normal">
                Hero Slide 1 (Main Banner)
              </h2>
              <div>
                <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                  Hero Title (Use *text* for italics)
                </label>
                <input
                  type="text"
                  value={homeSettings.heroTitle1}
                  onChange={(e) => setHomeSettings({ ...homeSettings, heroTitle1: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={homeSettings.heroSubtitle1}
                  onChange={(e) => setHomeSettings({ ...homeSettings, heroSubtitle1: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                />
              </div>
            </div>

            <div className="bg-[#F8F8F2] border border-[#CEBFA7] p-6 flex flex-col gap-4">
              <h2 className="font-accent text-xl border-b border-[#CEBFA7] pb-2 font-normal">
                Hero Slide 2 & Slide 3
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Slide 2 Title
                  </label>
                  <input
                    type="text"
                    value={homeSettings.heroTitle2}
                    onChange={(e) => setHomeSettings({ ...homeSettings, heroTitle2: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Slide 3 Title
                  </label>
                  <input
                    type="text"
                    value={homeSettings.heroTitle3}
                    onChange={(e) => setHomeSettings({ ...homeSettings, heroTitle3: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#F8F8F2] border border-[#CEBFA7] p-6 flex flex-col gap-4">
              <h2 className="font-accent text-xl border-b border-[#CEBFA7] pb-2 font-normal">
                Expert Advice Section
              </h2>
              <div>
                <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                  Advice Section Title
                </label>
                <input
                  type="text"
                  value={homeSettings.expertAdviceTitle}
                  onChange={(e) => setHomeSettings({ ...homeSettings, expertAdviceTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={homeSettings.expertAdviceDesc}
                  onChange={(e) => setHomeSettings({ ...homeSettings, expertAdviceDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-8 bg-[#C77065] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#b05d52] transition-colors border-none cursor-pointer self-start"
            >
              💾 Save Home Page Content
            </button>
          </form>
        )}

        {/* TAB 2: PRODUCTS CATALOG */}
        {activeTab === "products" && (
          <div className="flex flex-col gap-8">
            {/* Add New Product Form */}
            <form onSubmit={handleAddProduct} className="bg-[#F8F8F2] border border-[#CEBFA7] p-6">
              <h2 className="font-accent text-xl border-b border-[#CEBFA7] pb-3 mb-4 font-normal">
                ➕ Add New Product
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Silver Cross Dune Stroller"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  >
                    <option value="Pushchairs">Pushchairs</option>
                    <option value="Nursery">Nursery</option>
                    <option value="Car Seats">Car Seats</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Bathing & Feeding">Bathing & Feeding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. £895.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Image URL (or path)
                  </label>
                  <input
                    type="text"
                    placeholder="/images/products/pushchair-1.png"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Badge / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Best Seller / Editor's Pick"
                    value={newProduct.badge}
                    onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief overview of features..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 py-2.5 px-6 bg-[#2D1A14] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#C77065] transition-colors border-none cursor-pointer"
              >
                Add Product to Website
              </button>
            </form>

            {/* Product List */}
            <div className="bg-[#F8F8F2] border border-[#CEBFA7] p-6">
              <h2 className="font-accent text-xl border-b border-[#CEBFA7] pb-3 mb-4 font-normal">
                📦 Active Product Catalog
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-white border border-[#CEBFA7] p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EBE7DF] text-[#2D1A14] px-2 py-0.5 inline-block mb-2">
                        {prod.category}
                      </span>
                      <h3 className="font-accent text-lg font-medium text-[#2D1A14] mb-1">{prod.name}</h3>
                      <p className="text-xs text-[#2D1A14]/70 mb-2">{prod.description}</p>
                      <span className="text-sm font-bold text-[#C77065] block">{prod.price}</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EBE7DF] flex justify-between items-center">
                      <span className="text-xs text-amber-600">★ {prod.rating}</span>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold bg-transparent border-none cursor-pointer"
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SITE SETTINGS */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSiteSettings} className="flex flex-col gap-6 max-w-3xl">
            <div className="bg-[#F8F8F2] border border-[#CEBFA7] p-6 flex flex-col gap-4">
              <h2 className="font-accent text-xl border-b border-[#CEBFA7] pb-2 font-normal">
                Branding & General Info
              </h2>
              <div>
                <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                  Website Title
                </label>
                <input
                  type="text"
                  value={siteSettings.siteTitle}
                  onChange={(e) => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D1A14] uppercase tracking-wider mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={siteSettings.contactPhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CEBFA7] text-sm text-[#2D1A14]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-8 bg-[#C77065] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#b05d52] transition-colors border-none cursor-pointer self-start"
            >
              💾 Save General Settings
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
