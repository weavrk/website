#!/bin/bash

echo "🔄 Killing any existing processes on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
 
echo "🚀 Starting development server on port 3000..."
PORT=3000 npm start 