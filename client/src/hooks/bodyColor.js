
export default function useSetBodyColor({color}) {
    document.documentElement.style.setProperty('--home-primary', color)
}
