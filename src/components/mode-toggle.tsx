import {Toggle} from "~/components/ui/toggle";
import {Show} from "solid-js";
import {storageManager} from "~/index";
import {useColorMode} from "@kobalte/core";


function MoonIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-moon absolute size-6 transition-all dark:-translate-x-6 text-gray-600">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
}

function SunIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-sun size-6 transition-all dark:-translate-x-6 text-gray-600">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
}

function getIcon() {
    return storageManager.get() === 'dark' ? <SunIcon/> : <MoonIcon/>;
}

function getFallback() {
    return storageManager.get() === 'dark' ? <SunIcon/> : <MoonIcon/>;
}

export function ModeToggle() {
    const {setColorMode} = useColorMode();
    const toggleColorMode = () => {
        setColorMode(storageManager.get() === 'dark' ? 'light' : 'dark');
    };
    
    return <Toggle onChange={toggleColorMode}>
        {(state) => (
            <Show when={state.pressed()} fallback={getFallback()}>
                {getIcon()}
            </Show>
        )}
    </Toggle>;
}
