export function UsersRolesPage() {
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
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Users & Roles</h2>
                    <p className="text-muted-foreground mb-4">Người dùng & Phân quyền</p>
                    <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md">
                        <p className="text-sm font-medium">🚧 Under Construction / Đang xây dựng</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        This page will allow you to manage users and their roles across the system.
                    </p>
                </div>
            </div>
        </div>
    );
}
