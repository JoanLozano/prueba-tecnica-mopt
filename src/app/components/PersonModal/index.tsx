"use client"

import { Person } from '../PeopleSection/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faEnvelope, faPhone, faBuilding, faGlobe, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

interface PersonModalProps {
    person: Person
    isOpen: boolean
    onClose: () => void
}

export default function PersonModal({ person, isOpen, onClose }: PersonModalProps) {
    if (!isOpen) return null

    const initials = (person.name ?? '')
        .split(/\s+/)
        .map(n => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()

    return (
        <div 
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate__animated animate__fadeIn animate__faster"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate__animated animate__zoomIn animate__faster"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                        Detalles del Contacto
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        aria-label="Cerrar"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-6 space-y-6">
                    {/* Profile Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shrink-0">
                            {initials}
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                {person.name}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                                <FontAwesomeIcon icon={faAt} className="mr-1" />
                                {person.username}
                            </p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                            Información de Contacto
                        </h4>
                        
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                    <a 
                                        href={`mailto:${person.email}`}
                                        className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-blue-400 dark:hover:text-blue-300 break-all"
                                    >
                                        {person.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Teléfono</p>
                                    <a 
                                        href={`tel:${person.phone}`}
                                        className="text-sm text-gray-900 dark:text-white hover:text-green-600 break-all"
                                    >
                                        {person.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <FontAwesomeIcon icon={faGlobe} className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Sitio Web</p>
                                    <a 
                                        href={`https://${person.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-700 break-all"
                                    >
                                        {person.website}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                            Información de la Empresa
                        </h4>
                        
                        <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <FontAwesomeIcon icon={faBuilding} className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Compañía</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {person.company.name}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-300 italic mt-1">
                                    &ldquo;{person.company.catchPhrase}&rdquo;
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {person.company.bs}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                            Dirección
                        </h4>
                        
                        <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {person.address.street}, {person.address.suite}
                                </p>
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {person.address.city}, {person.address.zipcode}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Coordenadas: {person.address.geo.lat}, {person.address.geo.lng}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-3 shadow-lg">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        Cerrar
                    </button>
                    <a
                        href={`mailto:${person.email}`}
                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors text-center"
                    >
                        Enviar Email
                    </a>
                </div>
            </div>
        </div>
    )
}
