import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MapPin, Clock, ArrowRight, CalendarDays, Check, Loader2 } from "lucide-react";
import { supabase } from "./supabase";

function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── SVG ILLUSTRATIONS ─── */

function HeroCupIllustration() {
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 400 }}>
      <defs>
        <linearGradient id="cupBody" x1="100" y1="180" x2="300" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8DDD0" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="coffee" x1="130" y1="200" x2="270" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3D2215" />
          <stop offset="50%" stopColor="#5A3520" />
          <stop offset="100%" stopColor="#3D2215" />
        </linearGradient>
        <linearGradient id="steam1" x1="200" y1="160" x2="200" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B87333" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#B87333" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="steam2" x1="170" y1="150" x2="160" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4894A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4894A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="steam3" x1="230" y1="155" x2="240" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B87333" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#B87333" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="saucer" cx="200" cy="440" r="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4EDE4" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </radialGradient>
        <filter id="cupShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="20" stdDeviation="25" floodColor="#1A0F0A" floodOpacity="0.3" />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="cupInside">
          <ellipse cx="200" cy="200" rx="68" ry="14" />
        </clipPath>
      </defs>

      {/* Steam wisps */}
      <g>
        <path d="M180 160 Q170 120, 178 80 Q182 50, 170 20" stroke="url(#steam2)" strokeWidth="3" fill="none" strokeLinecap="round">
          <animate attributeName="d" dur="4s" repeatCount="indefinite"
            values="M180 160 Q170 120, 178 80 Q182 50, 170 20;
                    M180 160 Q190 115, 175 75 Q165 45, 175 15;
                    M180 160 Q170 120, 178 80 Q182 50, 170 20" />
          <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.6;0.2;0.6" />
        </path>
        <path d="M200 155 Q195 110, 205 70 Q210 40, 200 5" stroke="url(#steam1)" strokeWidth="4" fill="none" strokeLinecap="round">
          <animate attributeName="d" dur="5s" repeatCount="indefinite"
            values="M200 155 Q195 110, 205 70 Q210 40, 200 5;
                    M200 155 Q210 105, 195 65 Q188 35, 205 0;
                    M200 155 Q195 110, 205 70 Q210 40, 200 5" />
          <animate attributeName="opacity" dur="5s" repeatCount="indefinite" values="0.7;0.3;0.7" />
        </path>
        <path d="M222 158 Q230 115, 220 78 Q215 50, 228 18" stroke="url(#steam3)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <animate attributeName="d" dur="4.5s" repeatCount="indefinite"
            values="M222 158 Q230 115, 220 78 Q215 50, 228 18;
                    M222 158 Q215 110, 228 72 Q235 42, 222 10;
                    M222 158 Q230 115, 220 78 Q215 50, 228 18" />
          <animate attributeName="opacity" dur="4.5s" repeatCount="indefinite" values="0.5;0.15;0.5" />
        </path>
      </g>

      {/* Saucer */}
      <g filter="url(#cupShadow)">
        <ellipse cx="200" cy="445" rx="130" ry="22" fill="url(#saucer)" />
        <ellipse cx="200" cy="445" rx="130" ry="22" fill="none" stroke="#C4B5A0" strokeWidth="0.5" />
        <ellipse cx="200" cy="442" rx="95" ry="14" fill="none" stroke="#C4B5A0" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* Cup body */}
      <g filter="url(#cupShadow)">
        <path d="M130 210 L140 420 Q140 440, 200 440 Q260 440, 260 420 L270 210 Z" fill="url(#cupBody)" />
        <path d="M130 210 L140 420 Q140 440, 200 440 Q260 440, 260 420 L270 210 Z" fill="none" stroke="#C4B5A0" strokeWidth="0.5" />
      </g>

      {/* Cup rim — top ellipse */}
      <ellipse cx="200" cy="210" rx="72" ry="16" fill="#F4EDE4" stroke="#D4C4B0" strokeWidth="1" />

      {/* Coffee surface */}
      <ellipse cx="200" cy="212" rx="66" ry="13" fill="url(#coffee)" />

      {/* Latte art — rosetta */}
      <g opacity="0.5">
        <path d="M200 206 Q195 210, 190 208 Q185 205, 188 202 Q192 200, 196 203 Z" fill="#D4C4B0" />
        <path d="M200 206 Q205 210, 210 208 Q215 205, 212 202 Q208 200, 204 203 Z" fill="#D4C4B0" />
        <path d="M200 202 Q196 206, 192 204 Q189 201, 192 199 Q196 197, 198 200 Z" fill="#C4B5A0" opacity="0.6" />
        <path d="M200 202 Q204 206, 208 204 Q211 201, 208 199 Q204 197, 202 200 Z" fill="#C4B5A0" opacity="0.6" />
        <ellipse cx="200" cy="200" rx="3" ry="2.5" fill="#C4B5A0" opacity="0.8" />
        <line x1="200" y1="203" x2="200" y2="215" stroke="#C4B5A0" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Cup handle */}
      <path d="M270 240 Q310 245, 315 290 Q318 340, 270 350" fill="none" stroke="url(#cupBody)" strokeWidth="18" strokeLinecap="round" />
      <path d="M270 240 Q310 245, 315 290 Q318 340, 270 350" fill="none" stroke="#C4B5A0" strokeWidth="0.5" />

      {/* Subtle reflection on cup */}
      <path d="M145 230 Q148 320, 155 400" stroke="white" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />

      {/* Small coffee beans scattered on saucer */}
      <g opacity="0.6">
        <ellipse cx="120" cy="440" rx="8" ry="5" fill="#3D2215" transform="rotate(-20 120 440)" />
        <line x1="118" y1="436" x2="122" y2="444" stroke="#2C1810" strokeWidth="0.8" transform="rotate(-20 120 440)" />
        <ellipse cx="285" cy="438" rx="7" ry="4.5" fill="#4A2A1A" transform="rotate(15 285 438)" />
        <line x1="283" y1="434" x2="287" y2="442" stroke="#3D2215" strokeWidth="0.8" transform="rotate(15 285 438)" />
        <ellipse cx="150" cy="450" rx="6" ry="4" fill="#5A3520" transform="rotate(-35 150 450)" />
        <line x1="149" y1="447" x2="151" y2="453" stroke="#3D2215" strokeWidth="0.6" transform="rotate(-35 150 450)" />
      </g>
    </svg>
  );
}

function BlendIllustration({ variant }: { variant: "cherry" | "leaf" | "bean" }) {
  if (variant === "cherry") {
    return (
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: 180 }}>
        <defs>
          <radialGradient id="cherry1" cx="0.4" cy="0.35">
            <stop offset="0%" stopColor="#D4443B" />
            <stop offset="100%" stopColor="#8B2020" />
          </radialGradient>
          <radialGradient id="cherry2" cx="0.45" cy="0.3">
            <stop offset="0%" stopColor="#C93E35" />
            <stop offset="100%" stopColor="#7A1B1B" />
          </radialGradient>
          <linearGradient id="branchG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5A7A3A" />
            <stop offset="100%" stopColor="#3D5A25" />
          </linearGradient>
        </defs>
        {/* Branch */}
        <path d="M30 90 Q60 85, 100 70 Q140 55, 170 60" stroke="#6B4A2A" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M60 80 Q50 55, 70 45 Q85 50, 75 75 Z" fill="url(#branchG)" opacity="0.9" />
        <path d="M60 80 Q68 60, 70 45" stroke="#4A6A2A" strokeWidth="0.8" fill="none" />
        <path d="M120 58 Q130 35, 150 32 Q155 50, 135 62 Z" fill="url(#branchG)" opacity="0.8" />
        <path d="M120 58 Q138 42, 150 32" stroke="#4A6A2A" strokeWidth="0.8" fill="none" />
        {/* Cherries */}
        <circle cx="88" cy="105" r="18" fill="url(#cherry1)" />
        <circle cx="88" cy="105" r="18" fill="none" stroke="#7A1B1B" strokeWidth="0.5" opacity="0.3" />
        <ellipse cx="83" cy="98" rx="4" ry="3" fill="white" opacity="0.2" />
        <circle cx="115" cy="100" r="16" fill="url(#cherry2)" />
        <circle cx="115" cy="100" r="16" fill="none" stroke="#6A1515" strokeWidth="0.5" opacity="0.3" />
        <ellipse cx="110" cy="94" rx="3.5" ry="2.5" fill="white" opacity="0.2" />
        {/* Cherry stems */}
        <path d="M88 87 Q85 78, 90 73" stroke="#6B4A2A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M115 84 Q112 74, 108 68" stroke="#6B4A2A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Small cherry */}
        <circle cx="140" cy="90" r="10" fill="#D4443B" opacity="0.5" />
        <path d="M140 80 Q138 72, 142 65" stroke="#6B4A2A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }

  if (variant === "leaf") {
    return (
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: 180 }}>
        <defs>
          <linearGradient id="leafMain" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A8BE6A" />
            <stop offset="100%" stopColor="#6B8E3A" />
          </linearGradient>
          <linearGradient id="leafDark" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#8BA855" />
            <stop offset="100%" stopColor="#4A6A20" />
          </linearGradient>
        </defs>
        {/* Large leaf */}
        <path d="M100 160 Q40 130, 35 80 Q32 40, 80 15 Q110 30, 105 75 Q102 110, 100 160 Z" fill="url(#leafMain)" opacity="0.85" />
        <path d="M100 160 Q80 110, 80 15" stroke="#5A7A30" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M88 40 Q75 55, 55 65" stroke="#5A7A30" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M92 65 Q78 75, 58 82" stroke="#5A7A30" strokeWidth="0.8" fill="none" opacity="0.4" />
        <path d="M96 90 Q82 98, 62 102" stroke="#5A7A30" strokeWidth="0.8" fill="none" opacity="0.4" />
        {/* Second leaf */}
        <path d="M110 150 Q155 120, 168 75 Q175 40, 145 20 Q120 30, 118 70 Q116 105, 110 150 Z" fill="url(#leafDark)" opacity="0.7" />
        <path d="M110 150 Q130 100, 145 20" stroke="#4A6A20" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M135 38 Q148 48, 160 55" stroke="#4A6A20" strokeWidth="0.7" fill="none" opacity="0.3" />
        <path d="M130 60 Q143 68, 158 72" stroke="#4A6A20" strokeWidth="0.7" fill="none" opacity="0.3" />
        {/* Small buds */}
        <circle cx="72" cy="18" r="5" fill="#C4D48A" opacity="0.6" />
        <circle cx="148" cy="22" r="4" fill="#B8C87A" opacity="0.5" />
        {/* Tiny blossom */}
        <g transform="translate(60, 10)" opacity="0.7">
          <circle cx="0" cy="0" r="3" fill="#FFF8E8" />
          <circle cx="4" cy="-2" r="2.5" fill="#FFF8E8" opacity="0.8" />
          <circle cx="-3" cy="-3" r="2.5" fill="#FFF8E8" opacity="0.8" />
          <circle cx="0" cy="0" r="1.5" fill="#D4A040" />
        </g>
      </svg>
    );
  }

  // bean variant
  return (
    <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: 180 }}>
      <defs>
        <linearGradient id="bean1" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#C4713B" />
          <stop offset="100%" stopColor="#8B4A20" />
        </linearGradient>
        <linearGradient id="bean2" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#A86030" />
          <stop offset="100%" stopColor="#6B3A15" />
        </linearGradient>
        <linearGradient id="bean3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4894A" />
          <stop offset="100%" stopColor="#A86030" />
        </linearGradient>
      </defs>
      {/* Large center bean */}
      <g transform="translate(100, 85) rotate(-15)">
        <ellipse cx="0" cy="0" rx="35" ry="48" fill="url(#bean1)" />
        <path d="M0 -40 Q-8 -10, 0 0 Q8 10, 0 40" stroke="#6B3A15" strokeWidth="2" fill="none" opacity="0.5" />
        <ellipse cx="-10" cy="-15" rx="8" ry="12" fill="white" opacity="0.08" />
      </g>
      {/* Left bean */}
      <g transform="translate(48, 75) rotate(20)">
        <ellipse cx="0" cy="0" rx="24" ry="33" fill="url(#bean2)" />
        <path d="M0 -26 Q-5 -5, 0 0 Q5 8, 0 26" stroke="#4A2A12" strokeWidth="1.5" fill="none" opacity="0.5" />
        <ellipse cx="-6" cy="-10" rx="5" ry="8" fill="white" opacity="0.06" />
      </g>
      {/* Right bean */}
      <g transform="translate(155, 70) rotate(-30)">
        <ellipse cx="0" cy="0" rx="22" ry="30" fill="url(#bean3)" />
        <path d="M0 -24 Q-5 -5, 0 0 Q5 8, 0 24" stroke="#8B4A20" strokeWidth="1.5" fill="none" opacity="0.4" />
        <ellipse cx="-5" cy="-8" rx="5" ry="7" fill="white" opacity="0.07" />
      </g>
      {/* Small scattered beans */}
      <g transform="translate(40, 140) rotate(45)" opacity="0.5">
        <ellipse cx="0" cy="0" rx="12" ry="16" fill="#8B4A20" />
        <path d="M0 -13 Q-3 0, 0 13" stroke="#5A3015" strokeWidth="1" fill="none" opacity="0.4" />
      </g>
      <g transform="translate(160, 130) rotate(-10)" opacity="0.4">
        <ellipse cx="0" cy="0" rx="10" ry="14" fill="#A86030" />
        <path d="M0 -11 Q-2 0, 0 11" stroke="#6B3A15" strokeWidth="0.8" fill="none" opacity="0.4" />
      </g>
      {/* Floating particles */}
      <circle cx="80" cy="25" r="2" fill="#D4894A" opacity="0.3" />
      <circle cx="130" cy="155" r="1.5" fill="#B87333" opacity="0.25" />
      <circle cx="170" cy="30" r="2.5" fill="#C4713B" opacity="0.2" />
    </svg>
  );
}

function RoasterIllustration() {
  return (
    <svg viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="roasterBody" x1="150" y1="150" x2="350" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5A3A20" />
          <stop offset="50%" stopColor="#4A2A15" />
          <stop offset="100%" stopColor="#3D2010" />
        </linearGradient>
        <linearGradient id="drum" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B6A4A" />
          <stop offset="50%" stopColor="#6B4A2A" />
          <stop offset="100%" stopColor="#5A3A20" />
        </linearGradient>
        <radialGradient id="drumFace" cx="0.4" cy="0.35">
          <stop offset="0%" stopColor="#A8854A" />
          <stop offset="60%" stopColor="#7A5A30" />
          <stop offset="100%" stopColor="#5A3A18" />
        </radialGradient>
        <linearGradient id="hopper" x1="200" y1="80" x2="300" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7A5A35" />
          <stop offset="100%" stopColor="#5A3A20" />
        </linearGradient>
        <radialGradient id="gaugeFace" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FAF7F2" />
          <stop offset="80%" stopColor="#E8DDD0" />
          <stop offset="100%" stopColor="#C4B5A0" />
        </radialGradient>
        <linearGradient id="roastSmoke" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#B87333" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D4C4B0" stopOpacity="0" />
        </linearGradient>
        <filter id="roasterShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1A0F0A" floodOpacity="0.4" />
        </filter>
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Smoke from chimney */}
      <g>
        <path d="M310 100 Q320 60, 305 30 Q298 10, 310 -10" stroke="url(#roastSmoke)" strokeWidth="12" fill="none" strokeLinecap="round">
          <animate attributeName="d" dur="6s" repeatCount="indefinite"
            values="M310 100 Q320 60, 305 30 Q298 10, 310 -10;
                    M310 100 Q300 55, 315 25 Q322 5, 310 -15;
                    M310 100 Q320 60, 305 30 Q298 10, 310 -10" />
        </path>
        <path d="M290 110 Q280 70, 290 40 Q295 15, 285 -5" stroke="url(#roastSmoke)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.5">
          <animate attributeName="d" dur="5s" repeatCount="indefinite"
            values="M290 110 Q280 70, 290 40 Q295 15, 285 -5;
                    M290 110 Q300 65, 285 35 Q278 10, 290 -10;
                    M290 110 Q280 70, 290 40 Q295 15, 285 -5" />
        </path>
      </g>

      {/* Chimney */}
      <rect x="280" y="95" width="50" height="70" rx="4" fill="#4A2A15" />
      <rect x="275" y="90" width="60" height="12" rx="3" fill="#5A3A20" />

      {/* Hopper (top funnel) */}
      <path d="M200 130 L180 180 L320 180 L300 130 Z" fill="url(#hopper)" />
      <ellipse cx="250" cy="130" rx="52" ry="10" fill="#8B6A40" />
      <ellipse cx="250" cy="130" rx="52" ry="10" fill="none" stroke="#6B4A2A" strokeWidth="0.5" />
      {/* Beans in hopper */}
      <g opacity="0.6">
        <ellipse cx="235" cy="132" rx="5" ry="3.5" fill="#3D2215" transform="rotate(10 235 132)" />
        <ellipse cx="250" cy="130" rx="4.5" ry="3" fill="#4A2A1A" transform="rotate(-15 250 130)" />
        <ellipse cx="262" cy="133" rx="5" ry="3" fill="#3D2215" transform="rotate(25 262 133)" />
        <ellipse cx="245" cy="136" rx="4" ry="2.8" fill="#5A3520" transform="rotate(-5 245 136)" />
      </g>

      {/* Main body */}
      <g filter="url(#roasterShadow)">
        <rect x="140" y="180" width="220" height="250" rx="12" fill="url(#roasterBody)" />
        {/* Body highlight */}
        <rect x="148" y="188" width="4" height="230" rx="2" fill="white" opacity="0.05" />
      </g>

      {/* Drum window */}
      <circle cx="250" cy="305" r="70" fill="#2C1810" stroke="#8B6A4A" strokeWidth="3" />
      <circle cx="250" cy="305" r="62" fill="url(#drumFace)" />
      {/* Spinning drum interior */}
      <g>
        <circle cx="250" cy="305" r="55" fill="none" stroke="#6B4A2A" strokeWidth="1" opacity="0.3" />
        <g opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" from="0 250 305" to="360 250 305" dur="8s" repeatCount="indefinite" />
          <line x1="250" y1="255" x2="250" y2="355" stroke="#5A3A20" strokeWidth="1.5" />
          <line x1="200" y1="305" x2="300" y2="305" stroke="#5A3A20" strokeWidth="1.5" />
          <line x1="215" y1="270" x2="285" y2="340" stroke="#5A3A20" strokeWidth="1.5" />
          <line x1="285" y1="270" x2="215" y2="340" stroke="#5A3A20" strokeWidth="1.5" />
        </g>
        {/* Tumbling beans inside drum */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 250 305" to="360 250 305" dur="8s" repeatCount="indefinite" />
          <ellipse cx="230" cy="280" rx="6" ry="4" fill="#3D2215" opacity="0.7" />
          <ellipse cx="270" cy="290" rx="5" ry="3.5" fill="#4A2A1A" opacity="0.6" />
          <ellipse cx="245" cy="325" rx="5.5" ry="4" fill="#5A3520" opacity="0.7" />
          <ellipse cx="265" cy="315" rx="4.5" ry="3" fill="#3D2215" opacity="0.5" />
          <ellipse cx="240" cy="300" rx="5" ry="3.5" fill="#4A2A1A" opacity="0.6" />
          <ellipse cx="260" cy="335" rx="4" ry="3" fill="#5A3520" opacity="0.5" />
        </g>
      </g>
      {/* Drum glass reflection */}
      <path d="M210 275 Q220 265, 240 270" stroke="white" strokeWidth="2" fill="none" opacity="0.12" strokeLinecap="round" />

      {/* Temperature gauge */}
      <circle cx="180" cy="220" r="22" fill="url(#gaugeFace)" stroke="#8B6A4A" strokeWidth="2" />
      <circle cx="180" cy="220" r="2" fill="#3D2215" />
      {/* Gauge needle */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="-30 180 220" to="40 180 220" dur="10s" repeatCount="indefinite" />
        <line x1="180" y1="220" x2="180" y2="203" stroke="#C4443B" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x="180" y="237" textAnchor="middle" fontSize="6" fill="#5A3A20" fontFamily="Outfit, sans-serif">TEMP</text>

      {/* Control knobs */}
      <circle cx="320" cy="210" r="12" fill="#6B4A2A" stroke="#8B6A4A" strokeWidth="1.5" />
      <line x1="320" y1="202" x2="320" y2="210" stroke="#A8854A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="320" cy="245" r="10" fill="#5A3A20" stroke="#7A5A35" strokeWidth="1.5" />
      <line x1="320" y1="238" x2="320" y2="245" stroke="#8B6A4A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Legs */}
      <rect x="160" y="430" width="16" height="60" rx="3" fill="#3D2215" />
      <rect x="324" y="430" width="16" height="60" rx="3" fill="#3D2215" />
      <rect x="155" y="485" width="26" height="8" rx="2" fill="#2C1810" />
      <rect x="319" y="485" width="26" height="8" rx="2" fill="#2C1810" />

      {/* Cooling tray */}
      <g transform="translate(0, 20)">
        <ellipse cx="250" cy="510" rx="100" ry="18" fill="#3D2215" stroke="#5A3A20" strokeWidth="1" />
        <ellipse cx="250" cy="506" rx="90" ry="14" fill="#2C1810" />
        {/* Beans in cooling tray */}
        <g opacity="0.7">
          <ellipse cx="225" cy="505" rx="5" ry="3.5" fill="#8B4A20" transform="rotate(30 225 505)" />
          <ellipse cx="245" cy="508" rx="4.5" ry="3" fill="#A86030" transform="rotate(-20 245 508)" />
          <ellipse cx="260" cy="504" rx="5" ry="3" fill="#7A3A18" transform="rotate(45 260 504)" />
          <ellipse cx="240" cy="502" rx="4" ry="2.8" fill="#8B4A20" transform="rotate(10 240 502)" />
          <ellipse cx="270" cy="508" rx="4.5" ry="3" fill="#A86030" transform="rotate(-30 270 508)" />
          <ellipse cx="230" cy="510" rx="4" ry="2.5" fill="#6B3A15" transform="rotate(55 230 510)" />
        </g>
        {/* Stirring arm */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 250 507" to="360 250 507" dur="12s" repeatCount="indefinite" />
          <line x1="250" y1="507" x2="330" y2="507" stroke="#5A3A20" strokeWidth="2" />
          <circle cx="250" cy="507" r="3" fill="#6B4A2A" />
        </g>
      </g>

      {/* Ambient glow around drum */}
      <circle cx="250" cy="305" r="85" fill="none" stroke="#B87333" strokeWidth="0.5" opacity="0.15">
        <animate attributeName="r" dur="4s" repeatCount="indefinite" values="85;90;85" />
        <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.15;0.08;0.15" />
      </circle>
    </svg>
  );
}

function CafeInteriorIllustration() {
  return (
    <svg viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 600 }}>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3D2A1A" />
          <stop offset="100%" stopColor="#2C1D12" />
        </linearGradient>
        <linearGradient id="counter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B4A2A" />
          <stop offset="100%" stopColor="#4A3018" />
        </linearGradient>
        <linearGradient id="windowLight" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#F4EDE4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8DDD0" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="pendantGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F4D48A" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#D4A040" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#D4A040" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shelf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A3A20" />
          <stop offset="100%" stopColor="#4A2A15" />
        </linearGradient>
      </defs>

      {/* Background wall */}
      <rect width="600" height="350" fill="url(#wall)" />

      {/* Brick texture hints */}
      <g opacity="0.06">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 15 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 42 + (row % 2 ? 21 : 0)}
              y={row * 22 + 10}
              width="38"
              height="18"
              rx="1"
              fill="none"
              stroke="#F4EDE4"
              strokeWidth="0.5"
            />
          ))
        )}
      </g>

      {/* Window */}
      <rect x="30" y="20" width="140" height="180" rx="4" fill="#1A2A3A" />
      <rect x="30" y="20" width="140" height="180" rx="4" fill="url(#windowLight)" />
      <line x1="100" y1="20" x2="100" y2="200" stroke="#5A3A20" strokeWidth="3" />
      <line x1="30" y1="110" x2="170" y2="110" stroke="#5A3A20" strokeWidth="3" />
      <rect x="30" y="20" width="140" height="180" rx="4" fill="none" stroke="#5A3A20" strokeWidth="4" />

      {/* Light coming through window */}
      <path d="M30 200 L-20 350 L220 350 L170 200 Z" fill="url(#windowLight)" opacity="0.15" />

      {/* Shelves with items */}
      <g>
        {/* Shelf 1 */}
        <rect x="220" y="50" width="160" height="6" rx="1" fill="url(#shelf)" />
        {/* Bags of coffee */}
        <rect x="235" y="20" width="28" height="30" rx="3" fill="#8B6A4A" />
        <rect x="235" y="18" width="28" height="6" rx="2" fill="#A8854A" />
        <text x="249" y="40" textAnchor="middle" fontSize="5" fill="#F4EDE4" fontFamily="Outfit" opacity="0.6">E&O</text>
        <rect x="270" y="25" width="26" height="25" rx="3" fill="#6B4A2A" />
        <rect x="270" y="23" width="26" height="5" rx="2" fill="#8B6A4A" />
        <rect x="310" y="18" width="30" height="32" rx="3" fill="#7A5A35" />
        <rect x="310" y="16" width="30" height="6" rx="2" fill="#9A7A50" />
        <text x="325" y="38" textAnchor="middle" fontSize="5" fill="#F4EDE4" fontFamily="Outfit" opacity="0.6">E&O</text>
        <rect x="348" y="26" width="22" height="24" rx="3" fill="#5A3A20" />

        {/* Shelf 2 */}
        <rect x="220" y="110" width="160" height="6" rx="1" fill="url(#shelf)" />
        {/* Jars */}
        <rect x="232" y="78" width="22" height="32" rx="2" fill="#D4C4B0" opacity="0.2" stroke="#D4C4B0" strokeWidth="0.5" />
        <ellipse cx="243" cy="78" rx="10" ry="3" fill="#D4C4B0" opacity="0.3" />
        <rect x="262" y="82" width="20" height="28" rx="2" fill="#D4C4B0" opacity="0.15" stroke="#D4C4B0" strokeWidth="0.5" />
        <ellipse cx="272" cy="82" rx="9" ry="3" fill="#D4C4B0" opacity="0.25" />
        {/* Pour over dripper */}
        <path d="M310 95 L320 110 L340 110 L350 95 Z" fill="#F4EDE4" opacity="0.4" />
        <path d="M320 110 L325 105 L335 105 L340 110" fill="#D4C4B0" opacity="0.3" />
        <rect x="326" y="105" width="8" height="5" fill="#3D2215" opacity="0.3" />
        {/* Scale */}
        <rect x="355" y="100" width="20" height="10" rx="2" fill="#2C1810" opacity="0.5" />
      </g>

      {/* Pendant lights */}
      {[200, 350, 500].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x} y2={45 + i * 8} stroke="#5A3A20" strokeWidth="1.5" />
          <path d={`M${x - 15} ${45 + i * 8} Q${x} ${60 + i * 8}, ${x + 15} ${45 + i * 8}`} fill="#8B6A4A" />
          <ellipse cx={x} cy={65 + i * 8} rx="35" ry="35" fill="url(#pendantGlow)" />
          <circle cx={x} cy={50 + i * 8} r="3" fill="#F4D48A" opacity="0.8" />
        </g>
      ))}

      {/* Counter */}
      <rect x="0" y="240" width="600" height="110" fill="url(#counter)" />
      <rect x="0" y="240" width="600" height="4" fill="#8B6A4A" />

      {/* Espresso machine */}
      <g transform="translate(420, 165)">
        {/* Machine body */}
        <rect x="0" y="0" width="80" height="75" rx="5" fill="#2C1D12" stroke="#5A3A20" strokeWidth="1" />
        <rect x="5" y="5" width="70" height="30" rx="3" fill="#1A0F0A" />
        {/* Gauge */}
        <circle cx="40" cy="20" r="10" fill="#FAF7F2" stroke="#8B6A4A" strokeWidth="1" />
        <line x1="40" y1="20" x2="40" y2="13" stroke="#C4443B" strokeWidth="1" strokeLinecap="round" />
        {/* Group heads */}
        <rect x="15" y="40" width="20" height="15" rx="2" fill="#5A3A20" />
        <rect x="45" y="40" width="20" height="15" rx="2" fill="#5A3A20" />
        {/* Portafilters */}
        <path d="M15 55 L10 70 L30 70 L35 55" fill="none" stroke="#8B6A4A" strokeWidth="1.5" />
        <path d="M45 55 L40 70 L60 70 L65 55" fill="none" stroke="#8B6A4A" strokeWidth="1.5" />
        {/* Steam wand */}
        <path d="M75 35 Q85 40, 82 60 L80 75" stroke="#8B6A4A" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Drip tray */}
        <rect x="-5" y="75" width="90" height="6" rx="1" fill="#4A3018" />
      </g>

      {/* Cups on counter */}
      <g transform="translate(80, 225)">
        <path d="M0 0 L3 15 Q8 18, 16 18 Q24 18, 29 15 L32 0 Z" fill="#F4EDE4" />
        <ellipse cx="16" cy="0" rx="17" ry="5" fill="#FAF7F2" stroke="#D4C4B0" strokeWidth="0.5" />
        <ellipse cx="16" cy="1" rx="13" ry="3.5" fill="#3D2215" />
      </g>
      <g transform="translate(130, 228)">
        <path d="M0 0 L2 12 Q6 14, 12 14 Q18 14, 22 12 L24 0 Z" fill="#E8DDD0" />
        <ellipse cx="12" cy="0" rx="13" ry="4" fill="#F4EDE4" stroke="#D4C4B0" strokeWidth="0.5" />
        <ellipse cx="12" cy="1" rx="10" ry="3" fill="#5A3520" />
      </g>

      {/* Chalkboard menu */}
      <g transform="translate(430, 10)">
        <rect x="0" y="0" width="140" height="100" rx="3" fill="#1A1A1A" stroke="#5A3A20" strokeWidth="3" />
        <text x="70" y="25" textAnchor="middle" fontSize="10" fill="#F4EDE4" fontFamily="Cormorant Garamond, serif" fontStyle="italic" opacity="0.7">Today's Roast</text>
        <line x1="20" y1="32" x2="120" y2="32" stroke="#F4EDE4" strokeWidth="0.3" opacity="0.3" />
        <text x="70" y="50" textAnchor="middle" fontSize="9" fill="#D4894A" fontFamily="Cormorant Garamond, serif" opacity="0.8">Ethiopia Yirgacheffe</text>
        <text x="70" y="68" textAnchor="middle" fontSize="7" fill="#F4EDE4" fontFamily="Outfit, sans-serif" opacity="0.4">Blueberry · Jasmine</text>
        <text x="70" y="88" textAnchor="middle" fontSize="8" fill="#B87333" fontFamily="Outfit, sans-serif" opacity="0.6">$5.00</text>
      </g>

      {/* Stool hints at bottom */}
      <circle cx="150" cy="340" r="20" fill="#3D2215" opacity="0.4" />
      <line x1="150" y1="340" x2="150" y2="350" stroke="#3D2215" strokeWidth="3" opacity="0.3" />
      <circle cx="300" cy="338" r="20" fill="#3D2215" opacity="0.3" />
      <line x1="300" y1="338" x2="300" y2="350" stroke="#3D2215" strokeWidth="3" opacity="0.25" />

      {/* Plant in corner */}
      <g transform="translate(540, 200)">
        <rect x="-15" y="20" width="30" height="35" rx="3" fill="#6B4A2A" />
        <path d="M0 20 Q-15 0, -8 -15 Q0 5, 0 20 Z" fill="#6B8E3A" opacity="0.7" />
        <path d="M0 20 Q15 -5, 20 -20 Q5 0, 0 20 Z" fill="#5A7A30" opacity="0.6" />
        <path d="M0 20 Q-20 5, -22 -8 Q-5 5, 0 20 Z" fill="#8BA855" opacity="0.5" />
        <path d="M0 20 Q10 5, 15 -5 Q5 8, 0 20 Z" fill="#6B8E3A" opacity="0.6" />
      </g>
    </svg>
  );
}

const BLENDS = [
  {
    name: "Midnight Velvet",
    origin: "Ethiopia · Yirgacheffe",
    notes: "Dark chocolate, blackberry, cedar",
    roast: "Medium-Dark",
    illustration: "cherry" as const,
    accent: "#C4713B",
  },
  {
    name: "Morning Haze",
    origin: "Colombia · Huila",
    notes: "Honey, citrus blossom, toasted almond",
    roast: "Light",
    illustration: "leaf" as const,
    accent: "#8B9E6B",
  },
  {
    name: "Copper Basin",
    origin: "Guatemala · Antigua",
    notes: "Caramel, dried fig, smoky finish",
    roast: "Medium",
    illustration: "bean" as const,
    accent: "#B87333",
  },
];

const MENU_ITEMS = [
  { name: "Espresso", price: "3.50", desc: "Bold, concentrated, classic" },
  { name: "Cortado", price: "4.50", desc: "Equal parts espresso & steamed milk" },
  { name: "Pour Over", price: "5.00", desc: "Single origin, brewed to order" },
  { name: "Cold Brew", price: "5.50", desc: "18-hour steeped, served on draft" },
  { name: "Lavender Latte", price: "6.00", desc: "House lavender syrup & oat milk" },
  { name: "Affogato", price: "6.50", desc: "Vanilla gelato drowned in espresso" },
];

const TIME_SLOTS = [
  "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

export default function CoffeeLanding() {
  const heroRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", phone: "", date: "", time: "", guests: "2", note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("reservations").insert({
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests),
      note: formData.note || null,
    });
    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
      setFormData({ name: "", phone: "", date: "", time: "", guests: "2", note: "" });
    }
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const grainOpacity = useTransform(scrollYProgress, [0, 0.5], [0.06, 0.12]);

  return (
    <div className="coffee-landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');

        .coffee-landing {
          --espresso: #1A0F0A;
          --roast: #2C1810;
          --copper: #B87333;
          --cream: #F4EDE4;
          --latte: #E8DDD0;
          --foam: #FAF7F2;
          --sage: #8B9E6B;

          font-family: 'Outfit', sans-serif;
          background: var(--foam);
          color: var(--espresso);
          overflow-x: hidden;
          min-height: 100vh;
        }

        .coffee-landing * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .font-display {
          font-family: 'DM Serif Display', serif;
        }

        .font-editorial {
          font-family: 'Cormorant Garamond', serif;
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          mix-blend-mode: overlay;
        }

        .blend-card {
          position: relative;
          background: var(--cream);
          border: 1px solid rgba(26, 15, 10, 0.08);
          border-radius: 16px;
          padding: 0;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
        }

        .blend-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--card-accent, var(--copper));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 2;
        }

        .blend-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(26, 15, 10, 0.1), 0 8px 16px rgba(26, 15, 10, 0.06);
          border-color: rgba(26, 15, 10, 0.12);
        }

        .blend-card:hover::before {
          transform: scaleX(1);
        }

        .blend-card-illustration {
          background: linear-gradient(135deg, rgba(26, 15, 10, 0.03), rgba(26, 15, 10, 0.06));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.5rem 0;
        }

        .blend-card-content {
          padding: 1.5rem 2rem 2rem;
        }

        .menu-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid rgba(26, 15, 10, 0.08);
          transition: all 0.3s ease;
          align-items: baseline;
        }

        .menu-row:hover {
          padding-left: 0.75rem;
          border-color: var(--copper);
        }

        .menu-row:last-child {
          border-bottom: none;
        }

        .hero-ring {
          width: 360px;
          height: 360px;
          border-radius: 50%;
          border: 1px solid rgba(184, 115, 51, 0.2);
          position: absolute;
          animation: ringPulse 6s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.08); opacity: 0.15; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .nav-link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--cream);
          opacity: 0.7;
          transition: opacity 0.3s ease;
          text-decoration: none;
        }

        .nav-link:hover { opacity: 1; }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--copper);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after { width: 100%; }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          background: var(--copper);
          color: var(--foam);
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
        }

        .cta-button:hover {
          background: var(--roast);
          transform: scale(1.03);
          box-shadow: 0 12px 32px rgba(26, 15, 10, 0.2);
        }

        .cta-button svg {
          transition: transform 0.3s ease;
        }

        .cta-button:hover svg {
          transform: translateX(4px);
        }

        .cta-outline {
          background: transparent;
          color: var(--espresso);
          border: 1.5px solid rgba(26, 15, 10, 0.2);
        }

        .cta-outline:hover {
          background: var(--espresso);
          color: var(--foam);
          border-color: var(--espresso);
        }

        .section-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--copper);
        }

        .reserve-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          text-align: left;
        }

        .reserve-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .reserve-field.full {
          grid-column: 1 / -1;
        }

        .reserve-field label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--espresso);
          opacity: 0.5;
        }

        .reserve-field input,
        .reserve-field select,
        .reserve-field textarea {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(26, 15, 10, 0.1);
          border-radius: 12px;
          background: white;
          color: var(--espresso);
          outline: none;
          transition: border-color 0.3s ease;
          resize: none;
        }

        .reserve-field input:focus,
        .reserve-field select:focus,
        .reserve-field textarea:focus {
          border-color: var(--copper);
        }

        .reserve-field input::placeholder,
        .reserve-field textarea::placeholder {
          color: rgba(26, 15, 10, 0.25);
        }

        .reserve-submit {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 1rem;
          margin-top: 0.5rem;
          background: var(--espresso);
          color: var(--cream);
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reserve-submit:hover {
          background: var(--copper);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(26, 15, 10, 0.15);
        }

        .reserve-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .reserve-success {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(139, 158, 107, 0.1);
          border: 1px solid rgba(139, 158, 107, 0.25);
          border-radius: 12px;
          color: #5A7A3A;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }

        .hero-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3rem;
          width: 100%;
        }

        @media (max-width: 768px) {
          .hero-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .hero-illustration {
            order: -1;
            max-width: 280px;
            margin: 0 auto;
          }
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>

      {/* ─── NAVIGATION ─── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1.25rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to bottom, rgba(26, 15, 10, 0.5), transparent)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="font-display" style={{ fontSize: "1.5rem", color: "var(--cream)", letterSpacing: "-0.01em" }}>
          Ember & Oak
        </span>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          <a href="#blends" className="nav-link">Blends</a>
          <a href="#menu" className="nav-link">Menu</a>
          <a href="#reserve" className="nav-link">Reserve</a>
          <a href="#story" className="nav-link">Story</a>
          <a href="#visit" className="nav-link">Visit</a>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #1A0F0A 0%, #2C1810 40%, #3D2215 100%)",
          overflow: "hidden",
        }}
      >
        <motion.div className="grain-overlay" style={{ opacity: grainOpacity }} />

        {/* Decorative rings behind cup */}
        <div style={{ position: "absolute", top: "50%", right: "18%", transform: "translate(50%, -50%)" }}>
          <div className="hero-ring" />
          <div className="hero-ring" style={{ width: 520, height: 520, animationDelay: "2s" }} />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 2, width: "100%" }}
        >
          <div className="hero-layout">
            {/* Left: Text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="section-label"
                style={{ marginBottom: "1.5rem" }}
              >
                Est. 2019 · Single Origin Roasters
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                  color: "var(--cream)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.25rem",
                }}
              >
                Ember
                <br />
                <span style={{ color: "var(--copper)" }}>&</span>{" "}
                <span className="font-editorial" style={{ fontStyle: "italic", fontWeight: 300 }}>
                  Oak
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="font-editorial"
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                  color: "var(--latte)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  marginTop: "1.5rem",
                  opacity: 0.7,
                  maxWidth: 420,
                  lineHeight: 1.5,
                }}
              >
                Where every cup tells the story of its origin — roasted with intention, served with care.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}
              >
                <a href="#blends" className="cta-button">
                  Explore Blends <ArrowRight size={16} />
                </a>
                <a href="#visit" className="cta-button cta-outline" style={{ color: "var(--cream)", borderColor: "rgba(244, 237, 228, 0.2)" }}>
                  Visit Us
                </a>
              </motion.div>
            </div>

            {/* Right: Coffee Cup Illustration */}
            <motion.div
              className="hero-illustration"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <HeroCupIllustration />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, var(--foam))",
          zIndex: 3,
        }} />
      </section>

      {/* ─── BLENDS ─── */}
      <section id="blends" style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <FadeInSection>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Our Roasts</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, marginBottom: "0.75rem" }}>
            Signature Blends
          </h2>
          <p className="font-editorial" style={{ fontSize: "1.25rem", color: "rgba(26, 15, 10, 0.5)", fontStyle: "italic", maxWidth: 500, marginBottom: "3.5rem" }}>
            Sourced from the world's finest growing regions, roasted in small batches at our Portland facility.
          </p>
        </FadeInSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {BLENDS.map((blend, i) => (
            <FadeInSection key={blend.name} delay={i * 0.15}>
              <div className="blend-card" style={{ "--card-accent": blend.accent } as React.CSSProperties}>
                {/* Illustration area */}
                <div className="blend-card-illustration">
                  <BlendIllustration variant={blend.illustration} />
                </div>

                {/* Content area */}
                <div className="blend-card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <h3 className="font-display" style={{ fontSize: "1.75rem" }}>
                      {blend.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "0.35rem 0.75rem",
                        borderRadius: 999,
                        border: `1px solid ${blend.accent}30`,
                        color: blend.accent,
                        flexShrink: 0,
                        marginLeft: "0.75rem",
                      }}
                    >
                      {blend.roast}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--copper)", marginBottom: "0.75rem" }}>
                    {blend.origin}
                  </p>
                  <p className="font-editorial" style={{ fontSize: "1.05rem", color: "rgba(26, 15, 10, 0.55)", fontStyle: "italic", lineHeight: 1.5 }}>
                    {blend.notes}
                  </p>

                  <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: blend.accent, fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Shop This Blend <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section
        id="story"
        style={{
          position: "relative",
          padding: "8rem 2rem",
          background: "var(--espresso)",
          color: "var(--cream)",
          overflow: "hidden",
        }}
      >
        <div className="grain-overlay" style={{ opacity: 0.05 }} />

        <div className="story-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 2 }}>
          <FadeInSection>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>Our Story</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", lineHeight: 1.05, marginBottom: "2rem" }}>
              Born from a love of the{" "}
              <span className="font-editorial" style={{ fontStyle: "italic", color: "var(--copper)", fontWeight: 300 }}>
                craft
              </span>
            </h2>
            <div className="font-editorial" style={{ fontSize: "1.15rem", lineHeight: 1.8, opacity: 0.7 }}>
              <p style={{ marginBottom: "1.25rem" }}>
                What started as a backyard roasting experiment in 2019 has grown into Portland's most intentional coffee experience. We believe every bean carries the fingerprint of its terroir — the altitude, the rainfall, the hands that harvested it.
              </p>
              <p>
                We partner directly with smallholder farms across Ethiopia, Colombia, and Guatemala. No middlemen. No shortcuts. Just honest relationships and extraordinary coffee.
              </p>
            </div>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "3rem" }}>
              {[
                { num: "12", label: "Farm Partners" },
                { num: "4", label: "Countries" },
                { num: "2k+", label: "Cups Daily" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display" style={{ fontSize: "2.5rem", color: "var(--copper)" }}>{stat.num}</div>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5, marginTop: "0.25rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div style={{
              borderRadius: 20,
              overflow: "hidden",
              background: "linear-gradient(145deg, #2C1810, #3D2215)",
              padding: "2rem",
              position: "relative",
            }}>
              <div className="grain-overlay" style={{ opacity: 0.06 }} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <RoasterIllustration />
              </div>
              {/* Ambient glow */}
              <div style={{
                position: "absolute", width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(184,115,51,0.12), transparent 70%)",
                top: "30%", left: "30%", transform: "translate(-50%, -50%)",
              }} />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── MENU ─── */}
      <section id="menu" style={{ padding: "7rem 2rem", maxWidth: 800, margin: "0 auto" }}>
        <FadeInSection>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>The Menu</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, marginBottom: "0.75rem" }}>
              Crafted Drinks
            </h2>
            <p className="font-editorial" style={{ fontSize: "1.15rem", color: "rgba(26, 15, 10, 0.5)", fontStyle: "italic" }}>
              Every drink made to order, never rushed.
            </p>
          </div>
        </FadeInSection>

        <div style={{
          background: "var(--cream)",
          borderRadius: 20,
          padding: "2.5rem 3rem",
          border: "1px solid rgba(26, 15, 10, 0.06)",
        }}>
          {MENU_ITEMS.map((item, i) => (
            <FadeInSection key={item.name} delay={i * 0.08}>
              <div className="menu-row">
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                    <span className="font-display" style={{ fontSize: "1.3rem" }}>{item.name}</span>
                    <span style={{
                      flex: 1,
                      borderBottom: "1px dotted rgba(26, 15, 10, 0.15)",
                      minWidth: 40,
                      alignSelf: "center",
                      marginBottom: 4,
                    }} />
                  </div>
                  <p className="font-editorial" style={{ fontSize: "0.95rem", color: "rgba(26, 15, 10, 0.45)", fontStyle: "italic", marginTop: "0.2rem" }}>
                    {item.desc}
                  </p>
                </div>
                <span className="font-display" style={{ fontSize: "1.2rem", color: "var(--copper)", whiteSpace: "nowrap" }}>
                  ${item.price}
                </span>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ─── RESERVE ─── */}
      <section
        id="reserve"
        style={{
          position: "relative",
          padding: "7rem 2rem",
          background: "var(--espresso)",
          overflow: "hidden",
        }}
      >
        <div className="grain-overlay" style={{ opacity: 0.05 }} />

        <div style={{ maxWidth: 560, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p className="section-label" style={{ marginBottom: "0.75rem" }}>Reserve a Table</p>
              <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1, color: "var(--cream)", marginBottom: "0.75rem" }}>
                Book Your{" "}
                <span className="font-editorial" style={{ fontStyle: "italic", color: "var(--copper)", fontWeight: 300 }}>
                  Moment
                </span>
              </h2>
              <p className="font-editorial" style={{ fontSize: "1.1rem", color: "rgba(244, 237, 228, 0.4)", fontStyle: "italic" }}>
                A quiet corner, a perfect cup — we'll have it ready for you.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <div style={{
              background: "var(--cream)",
              borderRadius: 20,
              padding: "2.5rem 2.5rem",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.3)",
            }}>
              {submitted ? (
                <div className="reserve-success" style={{ padding: "2rem" }}>
                  <Check size={20} />
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Reservation confirmed!</div>
                    <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>We look forward to seeing you.</div>
                  </div>
                </div>
              ) : (
                <form className="reserve-form" onSubmit={handleReserve}>
                  <div className="reserve-field">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="reserve-field">
                    <label>Phone</label>
                    <input
                      type="tel"
                      placeholder="(503) 555-0123"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="reserve-field">
                    <label>Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="reserve-field">
                    <label>Time</label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="" disabled>Select a time</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="reserve-field">
                    <label>Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>

                  <div className="reserve-field">
                    <label>Special Requests</label>
                    <input
                      type="text"
                      placeholder="Anything we should know?"
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="reserve-submit" disabled={submitting}>
                    {submitting ? (
                      <><Loader2 size={16} className="spinner" /> Reserving...</>
                    ) : (
                      <><CalendarDays size={16} /> Reserve a Table</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── VISIT ─── */}
      <section
        id="visit"
        style={{
          position: "relative",
          padding: "6rem 2rem 8rem",
          background: "linear-gradient(to bottom, var(--foam), var(--latte))",
          textAlign: "center",
        }}
      >
        <FadeInSection>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>Come Say Hello</p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1,
              marginBottom: "2.5rem",
              maxWidth: 700,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            We saved you a{" "}
            <span className="font-editorial" style={{ fontStyle: "italic", color: "var(--copper)", fontWeight: 300 }}>
              seat
            </span>
          </h2>
        </FadeInSection>

        {/* Cafe Illustration */}
        <FadeInSection delay={0.1}>
          <div style={{
            maxWidth: 650,
            margin: "0 auto 3rem",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(26, 15, 10, 0.12)",
            border: "1px solid rgba(26, 15, 10, 0.06)",
          }}>
            <CafeInteriorIllustration />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div
            style={{
              display: "inline-flex",
              gap: "3rem",
              background: "white",
              padding: "2rem 3rem",
              borderRadius: 20,
              boxShadow: "0 4px 24px rgba(26, 15, 10, 0.06)",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <MapPin size={18} style={{ color: "var(--copper)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>247 SE Division St</div>
                <div style={{ fontSize: "0.8rem", opacity: 0.5 }}>Portland, OR 97202</div>
              </div>
            </div>
            <div style={{ width: 1, background: "rgba(26, 15, 10, 0.08)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Clock size={18} style={{ color: "var(--copper)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>7:00 AM – 6:00 PM</div>
                <div style={{ fontSize: "0.8rem", opacity: 0.5 }}>Every day of the week</div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.35}>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" className="cta-button">
              Get Directions <ArrowRight size={16} />
            </a>
            <a href="#" className="cta-button cta-outline">
              Order Online
            </a>
          </div>
        </FadeInSection>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          background: "var(--espresso)",
          color: "var(--cream)",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="font-display" style={{ fontSize: "1.5rem", display: "block", marginBottom: "1rem" }}>
            Ember & Oak
          </span>
          <p className="font-editorial" style={{ fontSize: "0.95rem", fontStyle: "italic", opacity: 0.4, marginBottom: "1.5rem" }}>
            Small batch roasters · Portland, Oregon
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
            {["Instagram", "Twitter", "Newsletter"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--cream)",
                  opacity: 0.4,
                  textDecoration: "none",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
              >
                {link}
              </a>
            ))}
          </div>
          <div style={{ fontSize: "0.75rem", opacity: 0.25 }}>
            © 2026 Ember & Oak Coffee Co. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
