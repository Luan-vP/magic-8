# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Magic Clarity is a React-based cognitive distortion analyzer web application that helps users identify and analyze cognitive distortions in their thinking patterns. The project uses React 19.1.0 with TypeScript and Vite as the build tool.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## Architecture

The application has two main components:

1. **App.tsx** - Currently shows the default Vite template (needs to be replaced with the actual app)
2. **CognitiveDistortionAnalyzer** (`src/cognitive-distortion-analyzer.tsx`) - The core functionality component that:
   - Analyzes text for cognitive distortions in real-time with 500ms debounce
   - Provides interactive highlighting of three distortion types:
     - Absolute thinking (red)
     - Catastrophic thinking (orange) 
     - Overgeneralization (yellow)
   - Shows clarifying questions via tooltips
   - Uses ContentEditable interface with syntax highlighting

## Key Files

- `src/main.tsx` - Application entry point
- `src/cognitive-distortion-analyzer.tsx` - Main analyzer component with mock NLP processing
- `src/prompts.tsx` - Contains sophisticated prompt templates based on Meta-Model from "The Structure of Magic" for future LLM integration
- `src/App.tsx` - Currently default Vite template, needs integration with analyzer

## Technology Stack

- React 19.1.0 with TypeScript
- Vite 7.0.0 for build tooling
- ESLint for code quality
- Modern ES2022/ES2023 targets
- No testing framework currently configured

## Current Status

The project is in early development:
- Core analyzer component is built but not integrated into main app
- Uses mock data instead of actual NLP processing
- Comments indicate planned WebLLM integration for local inference
- No testing infrastructure set up yet

## Development Notes

- The cognitive distortion analyzer uses a ContentEditable div with custom highlighting
- Text processing is debounced by 500ms to avoid excessive API calls
- The prompts.tsx file contains NLP patterns for deletion, distortion, and generalization detection
- Styling is done with hardcoded utility classes in the component