export function SeasonsTasksPage() {
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
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Seasons & Tasks</h2>
                    <p className="text-muted-foreground mb-4">Mùa vụ & Công việc</p>
                    <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md">
                        <p className="text-sm font-medium">🚧 Under Construction / Đang xây dựng</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        This page will provide monitoring and oversight of all seasons and tasks across the system.
                    </p>
                </div>
            </div>
        </div>
    );
}
