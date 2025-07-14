

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-center py-4 mt-auto border-t dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Minimal Library Management. All rights
        reserved.
      </p>
    </footer>
  );
}
