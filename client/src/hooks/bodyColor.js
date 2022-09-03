
export default function useSetBodyColor({color}) {
    document.documentElement.style.setProperty('--home-primary', color)
    return document.documentElement.style.getPropertyValue("--home-primary")
}
