import Image from 'next/image';
import crLogo from '../../public/logo.svg';

export default function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
                <Image src={crLogo} alt="Logo" width={24} height={24} />
                <span className="text-lg font-semibold text-gray-900">Chain Rank</span>
            </a>
        </div>
    );
}