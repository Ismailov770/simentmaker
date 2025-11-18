# SimentMaker - Cement Production & Warehouse Management Platform

A professional, enterprise-grade cement production and warehouse management system built with Next.js, React, and modern web technologies.

## 🏭 Overview

SimentMaker is a complete digital management solution for cement factories, providing separate interfaces for operators (Boshlovchi) and managers (Ish Boshqaruvchi) to streamline production tracking, material management, sales operations, and business analytics.

## ✨ Key Features

### For Operators (Boshlovchi)
- **Dashboard** - Real-time overview of daily production and material intake
- **Raw Material Intake** - Record incoming materials with type, amount, supplier info
- **Production Tracking** - Monitor planned vs actual cement production with analytics
- **Expense Management** - Track operational expenses by category with detailed records

### For Managers (Ish Boshqaruvchi)
- **Dashboard** - Comprehensive business overview with KPIs and trends
- **Sales Management** - Track cement sales with customer details and pricing
- **Distribution** - Monitor delivery status and regional distribution
- **Client Management** - Maintain customer profiles and contact information
- **Reports** - Generate and export business reports in PDF/Excel

## 🎨 Design Features

- **Industrial Theme** - Navy (#0f172a), Cement Gray (#cbd5e1), Blue Accents (#2563eb)
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Professional transitions and interactions throughout
- **Card-Based Layout** - Clean, organized UI with soft shadows and rounded corners
- **Data Visualization** - Advanced charts (bar, line, pie) using Recharts
- **Accessible Components** - Semantic HTML and ARIA attributes

## 🛠️ Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19.2 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icons
- **Form Handling**: React hooks for state management

## 📁 Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Login page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & theme
│   ├── operator/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── raw-materials/page.tsx
│   │   ├── production/page.tsx
│   │   └── expenses/page.tsx
│   └── manager/
│       ├── layout.tsx
│       ├── dashboard/page.tsx
│       ├── sales/page.tsx
│       ├── distribution/page.tsx
│       ├── clients/page.tsx
│       └── reports/page.tsx
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── sidebar.tsx              # Navigation sidebar
│   ├── top-bar.tsx              # Top navigation bar
│   ├── stat-card.tsx            # Statistics card component
│   ├── data-table.tsx           # Reusable data table
│   └── modal.tsx                # Modal dialog component
└── lib/
    └── utils.ts                 # Utility functions
\`\`\`

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   \`\`\`bash
   # Using GitHub
   git clone <repository-url>
   cd simentmaker
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 🔐 Authentication

**Demo Access**
- Navigate to the login page
- Choose your role: "Login as Operator" or "Login as Manager"
- Enter any email and password combination
- Click "Sign In" to access the dashboard

Note: This is a demo implementation. For production, integrate with a proper authentication system like Supabase Auth, Firebase, or your preferred provider.

## 🌓 Theme Switching

Click the theme toggle button (Sun/Moon icon) in:
- Top right of login page
- Top bar of dashboard pages

The theme preference is stored in the DOM using the `dark` class on the HTML element.

## 📊 Data Tables Features

All data tables include:
- **Search** - Real-time search across all columns
- **Sorting** - Click column headers to sort ascending/descending
- **Pagination** - Navigate through large datasets
- **Responsive** - Auto-scroll on mobile devices

## 📱 Mobile Optimization

- **Responsive Sidebar** - Hamburger menu on mobile
- **Touch-Friendly** - Larger touch targets for mobile interaction
- **Optimized Charts** - Charts resize for smaller screens
- **Mobile Navigation** - Easy-to-use mobile navigation

## ✅ Component Library

### Core Components
- `Sidebar` - Role-based navigation
- `TopBar` - Header with theme toggle
- `StatCard` - Display key metrics
- `DataTable` - Searchable, sortable table
- `Modal` - Dialog for forms and confirmations

### UI Components (shadcn/ui)
- Button, Input, Card, Select
- And all other default shadcn components

## 🎨 Color System

### Light Mode
- Background: `#faf8f6`
- Foreground: `#1a1a1a`
- Primary: Navy Blue `#1e3a8a`
- Secondary: Cement Gray `#cbd5e1`
- Accent: Light Blue `#2563eb`

### Dark Mode
- Background: `#141414`
- Foreground: `#f2f2f2`
- Primary: Light Blue `#60a5fa`
- Secondary: Dark Blue `#1e3a8a`
- Accent: Bright Blue `#3b82f6`

## 🔄 API Integration (Future)

To connect real data:
1. Replace sample data arrays with API calls
2. Use `fetch` or a library like `axios`
3. Handle loading and error states
4. Implement proper data caching with SWR

## 📈 Analytics & Charts

Charts are built with Recharts and support:
- Bar charts for comparative data
- Line charts for trends over time
- Pie charts for distribution analysis
- Area charts for cumulative trends
- Custom tooltips and legends

## 🚀 Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Push to GitHub
git push origin main

# Import in Vercel dashboard
# Select the repository and deploy
\`\`\`

### Manual Deployment

\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

## 📝 Available Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run linter
\`\`\`

## 🐛 Troubleshooting

### Dark mode not working
- Clear browser cache
- Check if `dark` class is applied to `<html>` element
- Verify CSS variables are defined in `:root` and `.dark`

### Charts not rendering
- Ensure data format matches expected structure
- Check browser console for errors
- Verify Recharts is installed

### Responsive issues on mobile
- Clear cache and refresh
- Check viewport meta tag in HTML
- Test with device-specific viewport in DevTools

## 📧 Features Overview

### Operator Dashboard
- Daily material intake tracking (tons)
- Total monthly intake summary
- Cement production metrics
- Weekly production trend analysis
- Material composition breakdown
- Production vs target comparison

### Manager Dashboard
- Total cement produced/sold metrics
- Warehouse stock levels
- Sales revenue overview
- Regional distribution charts
- Top clients performance
- Multi-month revenue trends

## 🔐 Security Notes

- All demo data is hardcoded for preview purposes
- Implement proper authentication before production
- Use environment variables for sensitive data
- Validate and sanitize all user inputs
- Implement role-based access control (RBAC)

## 📄 License

This project is provided as-is for educational and demonstration purposes.

## 🤝 Support

For issues or feature requests, please visit the documentation or contact support.

---

**SimentMaker** - Professional Cement Management at Your Fingertips
