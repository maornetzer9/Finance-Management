import { QueryStats as QueryStatsIcon, Timer as TimerIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';
  
export const YEARS = ["2023", "2024", "2025" ]; 

export const STEPS = ["פרטים אישיים", "פרטי התחברות"];

export const TABLE_HEADERS = [ "שם הנכס", "מחיר רכישה", "שווי נוכחי", "צמיחה", "תאריך רכישה", "פעולות" ];

export const MONTHS = [ "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר" ];

export const TRANSACTION_INFO_MESSAGE = { message: 'אנא הזן קובץ: אקסל עם טבלת הוצאות חודשיות, כדי שהקובץ יקרא בצורה נכונה אלו הם הכותרות של הטבלה שצריכות להיות בראש הרשימה: "תאריך עסקה", "שם בית עסק", "סכום עסקה", "תאריך חיוב", "סכום חיוב", "סוג עסקה", "ענף", "הערות"'};

export const FORM_FIELDS = [
    { label: "שם הנכס", name: "name", type: "text", required: true},
    { label: "מחיר רכישה", name: "purchasePrice", type: "number", required: true },
    { label: "שווי נוכחי", name: "currentValue", type: "number", required: true },
    { label: "", name: "createdAt", type: "date", required: true },
];

export const FORM_FIELDS_TRANSACTIONS = [
    { label: "שם בית עסק", name: "businessName", type: "text", required: true},
    { label: "סכום בש\"ח", name: "amount", type: "number", required: true },
    { label: "סוג עסקה", name: "transactionType", type: "text", required: true },
    { label: "מועד חיוב", name: "chargeDate", type: "date", required: true },
    // { label: "תאריך עסקה", name: "transactionDate", type: "date", required: true },
    { label: "הערות", name: "notes", type: "text", required: false },
    { label: "פעולות", name: "actions", type: "none", required: false },
];

export const investmentData = [
        { monthYear: "2023-05", stocks: 20000, bonds: 9213 },
        { monthYear: "2023-06", stocks: 30000, bonds: 3200 },
        { monthYear: "2023-07", stocks: 10000, bonds: 5341 },
        { monthYear: "2024-08", stocks: 50000, bonds: 2000 },
        { monthYear: "2024-09", stocks: 10500, bonds: 5100 },
        { monthYear: "2024-10", stocks: 11200, bonds: 5250 },
        { monthYear: "2024-11", stocks: 11800, bonds: 5400 },
        { monthYear: "2024-12", stocks: 12000, bonds: 5500 },
        { monthYear: "2025-01", stocks: 12500, bonds: 5700 },
        { monthYear: "2025-02", stocks: 12800, bonds: 5900 },
];

export const BUTTON_STYLES = {
    "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(123, 92, 255, 0.2)",
    },
    transition: "all 0.2s ease-in-out",
    borderRadius: 2,
    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
    gap: 1,
};

export const QUICK_LINKS = [
    { title: 'סקירת השקעות', href: '#' },
    { title: 'ניהול הוצאות', href: '#' },
    { title: 'דוחות', href: '#' },
    { title: 'תיק פנסיוני', href: '#' },
];

export const SUPPORT_LINKS = [
    { title: 'מרכז עזרה', href: '#' },
    { title: 'שאלות נפוצות', href: '#' },
    { title: 'צור קשר', href: '#' },
    { title: 'מדיניות פרטיות', href: '#' },
];

export const STATS = [
    { 
      value: '98%', 
      label: 'דיוק בניתוח נתונים',
      icon: QueryStatsIcon,
      iconColor: 'default'
    },
    { 
      value: '24/7', 
      label: 'מעקב בזמן אמת',
      icon: TimerIcon,
      iconColor: 'default'
    },
    { 
      value: '+15%', 
      label: 'תשואה ממוצעת',
      icon: TrendingUpIcon,
      iconColor: 'green'
    },
    { 
      value: '-25%', 
      label: 'הפחתת הוצאות',
      icon: TrendingDownIcon,
      iconColor: 'green'
    },
];