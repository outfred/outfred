import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    home: 'Home',
    merchants: 'Merchants',
    account: 'Account',
    joinAsMerchant: 'Join as Merchant',
    about: 'About',
    privacy: 'Privacy',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Home
    searchPlaceholder: 'Search for fashion items...',
    searchByImage: 'Search by Image',
    generateOutfit: 'Generate AI Outfit',
    smartSearch: 'Smart Search',
    uploadImage: 'Upload Image',
    
    // Merchants
    allMerchants: 'All Merchants',
    approvedMerchants: 'Approved Merchants',
    viewProducts: 'View Products',
    
    // Account
    myAccount: 'My Account',
    favorites: 'Favorites',
    settings: 'Settings',
    
    // Join as Merchant
    merchantApplication: 'Merchant Application',
    brandName: 'Brand Name',
    contactName: 'Contact Name',
    email: 'Email',
    phone: 'Phone',
    website: 'Website',
    description: 'Description',
    logo: 'Logo URL',
    submit: 'Submit',
    
    // Admin
    adminPanel: 'Admin Panel',
    users: 'Users',
    products: 'Products',
    designSettings: 'Design Settings',
    pageBuilder: 'Page Builder',
    analytics: 'Analytics',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    importProducts: 'Import Products',
    addUser: 'Add User',
    editMerchant: 'Edit Merchant',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    approve: 'Approve',
    reject: 'Reject',
  },
  ar: {
    // Header - باللهجة المصرية
    home: 'الصفحة الرئيسية',
    merchants: 'المحلات',
    account: 'حسابي',
    joinAsMerchant: 'انضم كتاجر',
    about: 'عن المنصة',
    privacy: 'سياسة الخصوصية',
    contact: 'تواصل معانا',
    login: 'دخول',
    register: 'اشترك',
    logout: 'خروج',
    
    // Home - باللهجة المصرية
    searchPlaceholder: 'دور على اللي عاوزه...',
    searchByImage: 'دور بالصورة',
    generateOutfit: 'كوّن لوك كامل',
    smartSearch: 'بحث ذكي',
    uploadImage: 'ارفع صورة',
    
    // Merchants - باللهجة المصرية
    allMerchants: 'كل المحلات',
    approvedMerchants: 'المحلات المعتمدة',
    viewProducts: 'شوف المنتجات',
    
    // Account - باللهجة المصرية
    myAccount: 'حسابي',
    favorites: 'المفضلة',
    settings: 'الإعدادات',
    
    // Join as Merchant - باللهجة المصرية
    merchantApplication: 'طلب انضمام للتجار',
    brandName: 'اسم البراند',
    contactName: 'اسم الشخص المسؤول',
    email: 'الإيميل',
    phone: 'رقم الموبايل',
    website: 'الموقع',
    description: 'وصف المحل',
    logo: 'لوجو المحل',
    submit: 'ابعت',
    
    // Admin - باللهجة المصرية
    adminPanel: 'لوحة التحكم',
    users: 'المستخدمين',
    products: 'المنتجات',
    designSettings: 'إعدادات الشكل',
    pageBuilder: 'بناء الصفحات',
    analytics: 'الإحصائيات',
    addProduct: 'ضيف منتج',
    editProduct: 'عدّل منتج',
    importProducts: 'استورد منتجات',
    addUser: 'ضيف مستخدم',
    editMerchant: 'عدّل محل',
    
    // Common - باللهجة المصرية
    loading: 'بيحمّل...',
    error: 'في مشكلة',
    success: 'تمام',
    save: 'احفظ',
    cancel: 'الغي',
    delete: 'امسح',
    edit: 'عدّل',
    approve: 'وافق',
    reject: 'ارفض',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    // Set RTL/LTR on document
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
