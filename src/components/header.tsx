import {createSignal, onCleanup} from "solid-js";
import {ModeToggle} from "~/components/mode-toggle";
import {Link} from "@kobalte/core/link";


export function Socials() {
    return (
        <div class="flex space-x-4 items-center">
            <p class=" text-gray-500 font-semibold text-lg">Share: </p>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class={`lucide lucide-instagram w-6 h-6 opacity-85 hover:opacity-100 dark:text-white`}>
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
            </Link>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class={`lucide lucide-facebook w-6 h-6 opacity-85 hover:opacity-100 dark:text-white`}>
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
            </Link>
        </div>
    );
}

export function Header() {
    const [isScrolled, setIsScrolled] = createSignal(false);
    let lastScrollTop = 0;

    const checkScroll = () => {
        let st = window.scrollY || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', checkScroll);

    onCleanup(() => {
        window.removeEventListener('scroll', checkScroll);
    });

    return <nav class={`fixed inset-x-0 top-0 z-50 bg-white shadow-sm 
            border-b border-gray-200 dark:border-gray-700 dark:bg-gray-950/90 
            transition-all duration-400 ease-in-out transform ${isScrolled() ? 'translate-y-0 opacity-0' : 'translate-y-100 opacity-100'}`}>
        <div class="w-full max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-14 items-center">
                <Socials />
                <ModeToggle />
            </div>
        </div>
    </nav>;
}