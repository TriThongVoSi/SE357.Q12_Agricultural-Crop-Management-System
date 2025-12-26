import * as React from "react";
import { cn } from "@/shared/lib";

export interface PageHeaderProps {
    /** Icon to display before the title */
    icon?: React.ReactNode;
    /** Page title */
    title: string;
    /** Page subtitle/description */
    subtitle?: string;
    /** Action buttons to display on the right */
    actions?: React.ReactNode;
    /** Additional className for the container */
    className?: string;
}

/**
 * PageHeader Component
 * 
 * Standardized page header following the design system:
 * - Left: Icon + Title + Subtitle
 * - Right: Action buttons
 * 
 * @example
 * ```tsx
 * <PageHeader
 *   icon={<Calendar className="w-8 h-8 text-[#2F9E44]" />}
 *   title="Seasons"
 *   subtitle="Manage your farming seasons"
 *   actions={
 *     <Button>
 *       <Plus className="w-4 h-4 mr-2" />
 *       Create Season
 *     </Button>
 *   }
 * />
 * ```
 */
export function PageHeader({
    icon,
    title,
    subtitle,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
                className
            )}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="flex-shrink-0 text-primary">
                        {icon}
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {actions && (
                <div className="flex items-center gap-2 flex-shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}

PageHeader.displayName = "PageHeader";
