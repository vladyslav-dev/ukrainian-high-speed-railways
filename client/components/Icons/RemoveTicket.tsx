export default function RemoveTicketIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="10" cy="10" r="10" fill="#636363"/>
            <path d="M7.5 7.5L12.5 12.5M7.5 12.5L12.5 7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}