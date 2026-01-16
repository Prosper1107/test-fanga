import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
                <FileQuestion size={48} className="text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Page introuvable</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-fanga-green text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
                Retour au tableau de bord
            </Link>
        </div>
    );
}
