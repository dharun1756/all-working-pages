# Business Management Dashboard

## Overview

This project is a comprehensive Business Management Dashboard built with **React**, **TypeScript**, and **Vite**. It provides a robust interface for managing various aspects of a business, including sales, purchases, inventory, and customer relationships. The application leverages **Tailwind CSS** and **shadcn/ui** for a modern, responsive, and accessible user interface.

## Key Features

The application includes the following modules:

### 📊 Dashboard
- **Dashboard (Index)**: A central hub for viewing key business metrics and quick actions.

### 💰 Sales Management
- **Sale Order**: Create and manage sale orders.
- **Delivery Challan**: Generate delivery challans for shipments.
- **Sale Invoices**: Create and track sales invoices.
- **Estimates**: Generate cost estimates for clients.
- **Proforma Invoice**: Issue proforma invoices.
- **Payment In**: Record and track incoming payments.

### 🛒 Purchase Management
- **Purchase Order**: Create and manage purchase orders for suppliers.
- **Purchase Return**: Handle returns of purchased goods.

### 📦 Inventory & Parties
- **Items**: Manage product inventory and services.
- **Parties**: Maintain a directory of customers and suppliers.

### 👤 User Management
- **Profile**: Manage user profile and settings.

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)
- **Backend Integration**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:8080` (or similar port).

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Static data or mock data
├── hooks/          # Custom React hooks
├── integrations/   # External service integrations (e.g., Supabase)
├── lib/            # Utility functions and library configurations
├── pages/          # Application pages/routes
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
