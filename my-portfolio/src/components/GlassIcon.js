import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GlassIcon = ({ items, className }) => {
    const getBackgroundStyle = (item) => {
        if (item.image) {
            return {
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            };
        }
        return {
            background: 'linear-gradient(hsla(0, 0%, 100%, 0.22), hsla(0, 0%, 100%, 0.08))'
        };
    };
    return (_jsx("div", { className: `grid gap-[6em] grid-cols-2 md:grid-cols-3 mx-auto py-[3.5em] overflow-visible ${className || ''}`, children: items.map((item, index) => (_jsxs("button", { type: "button", "aria-label": item.label, className: `relative bg-transparent outline-none border-none cursor-pointer w-[20em] h-[20em] [perspective:28em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${item.customClass || ''}`, children: [_jsx("span", { className: "absolute top-0 left-0 w-full h-full rounded-[1.9em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.75em,-0.75em,0.75em)]", style: {
                        ...getBackgroundStyle(item),
                        boxShadow: '0.75em -0.75em 1em hsla(223, 10%, 10%, 0.15)'
                    } }), _jsx("span", { className: "absolute top-0 left-0 w-full h-full rounded-[1.9em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] [-moz-backdrop-filter:blur(0.75em)] [will-change:transform] transform group-hover:[transform:translate3d(0,0,2.5em)]", style: {
                        boxShadow: '0 0 0 0.12em hsla(0, 0%, 100%, 0.3) inset'
                    }, children: _jsx("span", { className: "m-auto w-[2.4em] h-[2.4em] flex items-center justify-center", "aria-hidden": "true", children: item.icon }) }), _jsx("span", { className: "absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-lg opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]", children: item.label })] }, index))) }));
};
export default GlassIcon;
