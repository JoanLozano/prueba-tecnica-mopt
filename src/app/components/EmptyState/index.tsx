import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faComments, IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface EmptyStateProps {
    icon?: IconDefinition
    title: string
    description: string
    action?: {
        label: string
        onClick: () => void
    }
}

export default function EmptyState({ 
    icon = faUsers, 
    title, 
    description, 
    action 
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 mb-6 animate__animated animate__zoomIn">
                <FontAwesomeIcon 
                    icon={icon} 
                    className="w-10 h-10 text-blue-600 dark:text-blue-400" 
                />
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                {description}
            </p>
            
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    )
}
