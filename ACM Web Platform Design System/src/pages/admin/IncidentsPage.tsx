export function IncidentsPage() {
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
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Incidents</h2>
                    <p className="text-muted-foreground mb-4">Sự cố</p>
                    <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md">
                        <p className="text-sm font-medium">🚧 Under Construction / Đang xây dựng</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        This page will track and manage incidents across all farms and operations.
                    </p>
                </div>
            </div>
        </div>
    );
}
