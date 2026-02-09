import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroMenu from '@/components/HeroMenu';
import HeroSection from '@/components/HeroSection';
import QuoteSection from '@/components/QuoteSection';
import AboutMeSection from '@/components/AboutMeSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorFollower from '@/components/CursorFollower';
import Footer from '@/components/footer';
import ProjectDetail from '@/pages/ProjectDetail';
import RouteScrollManager from '@/components/RouteScrollManager';
function HomePage() {
    return (_jsxs("div", { className: "relative w-full min-h-screen bg-black flex flex-col", children: [_jsx(CursorFollower, {}), _jsx(AnimatedBackground, {}), _jsxs("div", { className: "relative z-10 w-full flex flex-col flex-1", children: [_jsx(HeroMenu, {}), _jsx(HeroSection, {}), _jsx(QuoteSection, {}), _jsx(AboutMeSection, {}), _jsx(SkillsSection, {}), _jsx(ExperienceSection, {})] }), _jsx(Footer, {})] }));
}
export default function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(RouteScrollManager, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/projects/:projectId", element: _jsx(ProjectDetail, {}) })] })] }));
}
