import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function FooterSection() {
  return (
     <footer className="bg-white dark:bg-gray-900 w-full border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            href="https://github.com/JoanLozano" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/joan03lozano/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            &copy; 2025 - Joan Lozano.
          </p>
        </div>
      </div>
    </footer>
  )
}
