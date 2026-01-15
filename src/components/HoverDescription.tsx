import { useState, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    title: string;
    description: string;
    children: React.ReactNode;
}

const HoverDescription = ({ title, description, children }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            top: rect.top - 10,
            left: rect.left + rect.width / 2
        });
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // Portal target 
    const portalRoot = document.body;

    if (!isValidElement(children)) {
        return <div className="relative group">{children}</div>;
    }

    const child = children as React.ReactElement<any>;

    return (
        <>
            {cloneElement(child, {
                onMouseEnter: (e: React.MouseEvent) => {
                    handleMouseEnter(e);
                    child.props.onMouseEnter?.(e);
                },
                onMouseLeave: (e: React.MouseEvent) => {
                    handleMouseLeave();
                    child.props.onMouseLeave?.(e);
                }
            })}
            {isHovered && createPortal(
                <div
                    className="fixed z-[9999] w-48 pointer-events-none transform -translate-x-1/2 -translate-y-full px-3 py-2 bg-black/90 border border-white/50 rounded-lg shadow-xl backdrop-blur-md"
                    style={{ top: position.top, left: position.left }}
                >
                    <h4 className="text-yellow-300 font-bold text-xs uppercase mb-1 border-b border-white/20 pb-0.5">{title}</h4>
                    <p className="text-white text-[10px] leading-tight">{description || 'No description available.'}</p>
                    {/* Triangle pointer */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-black/90"></div>
                </div>,
                portalRoot
            )}
        </>
    );
};

export default HoverDescription;
