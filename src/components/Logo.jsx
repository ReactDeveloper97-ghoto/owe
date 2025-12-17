import React from "react";
import { useThemeStore } from "../store/themeStore";
import { Link } from 'react-router'

const NexaLogo = ({ darkColor, width = 220, height = 90 }) => {
  const { theme } = useThemeStore();

  // Colors based on theme
  const orbitColor = theme === "dark" ? "#00BFFF" : "#007698"; // Electric Blue / Deep Blue
  const electronColor = theme === "dark" ? "#00BFFF" : "#007698";
  const nucleusColor = theme === "dark" ? "#FFFFFF" : "#007698";
  const textColor =
    theme === "dark"
      ? darkColor == "white"
        ? "#fff"
        : darkColor == "black"
          ? "#000"
          : "#E0E0E0"
      : "#007698"; // Softer white in dark mode
  const sloganColor = theme === "dark" ? "#00BFFF" : "#0A74DA";

  return (

    <svg
      width={width}
      height={height}
      viewBox="0 0 260 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Italianno&family=Outfit:wght@100..900&family=Playwrite+NZ+Guides&display=swap');
        </style>
      </defs>

      {/* ATOMIC SHAPE */}
      <g transform="translate(40,50)">

        {/* ✅ OUTER O SHAPED SHELL (ADDED) */}
        <ellipse
          rx="30"
          ry="30"
          stroke={textColor}
          strokeWidth="2.5"
          fill="none"
          opacity="0.96"
        />

        {/* 3 Elliptical Orbits */}
        <ellipse
          rx="24"
          ry="10"
          stroke={orbitColor}
          strokeWidth="2"
          fill="none"
        />
        <ellipse
          rx="24"
          ry="10"
          transform="rotate(60)"
          stroke={orbitColor}
          strokeWidth="2"
          fill="none"
        />
        <ellipse
          rx="24"
          ry="10"
          transform="rotate(-60)"
          stroke={orbitColor}
          strokeWidth="2"
          fill="none"
        />

        {/* ELECTRONS */}
        <circle r="3" fill={electronColor}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </circle>

        <circle r="3" fill={electronColor}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="120 0 0"
            to="480 0 0"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </circle>

        <circle r="3" fill={electronColor}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="240 0 0"
            to="600 0 0"
            dur="5.5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Nucleus */}
        <circle cx="0" cy="0" r="4" fill={nucleusColor} />
      </g>

      {/* NAME */}
      <text
        x="75"
        y="60"
        fontSize="58"
        fontWeight="700"
        fontFamily="Italianno, cursive"
        font-optical-sizing='auto'
        fontStyle='normal'
        fill={textColor}
      >
        WE
      </text>

      {/* SLOGAN */}
      <text
        x="70"
        y="85"
        fontSize="13"
        fontFamily="Poppins, Helvetica"
        fill={sloganColor}
      >
        Our World of Education
      </text>
    </svg>

  );
};

export default NexaLogo;
