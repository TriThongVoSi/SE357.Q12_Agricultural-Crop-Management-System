export function CropsVarietiesPage() {
    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <svg
                                className="w-8 h-8 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Crops & Varieties</h2>
                    <p className="text-muted-foreground mb-4">Cây trồng & Giống</p>
                    <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md">
                        <p className="text-sm font-medium">🚧 Under Construction / Đang xây dựng</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        This page will manage the catalog of crops and varieties available in the system.
                    </p>
                </div>
            </div>
        </div>
    );
}
