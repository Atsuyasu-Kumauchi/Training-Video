
interface UserAvatarProps {
    name: string;
}

// Simple random color generator
const getRandomColor = (): string => {
    const colors = [
        '#3b82f6', // blue
        '#ef4444', // red
        '#10b981', // green
        '#f59e0b', // yellow
        '#8b5cf6', // purple
        '#ec4899', // pink
        '#06b6d4', // cyan
        '#f97316'  // orange
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (name: string): string => {
    if (!name) return '';

    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    } else {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
};

export const Avatar: React.FC<UserAvatarProps> = ({ name }) => {
    const initials = getInitials(name);
    const backgroundColor = getRandomColor(); // Random color each render

    return (
        <div className="flex items-center">
            {/* Avatar Circle with Random Color */}
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor }}
            >
                {initials}
            </div>

            {/* Name */}
            <span className="ml-2 text-gray-800 font-medium">{name}</span>
        </div>
    );
};