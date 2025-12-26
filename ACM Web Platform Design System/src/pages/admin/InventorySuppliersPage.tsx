export function InventorySuppliersPage() {
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
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Inventory & Suppliers</h2>
                    <p className="text-muted-foreground mb-4">Vật tư & Nhà cung cấp</p>
                    <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md">
                        <p className="text-sm font-medium">🚧 Under Construction / Đang xây dựng</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        This page will manage inventory items and supplier relationships.
                    </p>
                </div>
            </div>
        </div>
    );
}
