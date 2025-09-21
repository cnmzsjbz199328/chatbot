const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up development environment...');

// Kill existing node processes
if (process.platform === 'win32') {
  spawn('taskkill', ['/F', '/IM', 'node.exe', '/T'], { stdio: 'inherit' });
} else {
  spawn('pkill', ['-f', 'next'], { stdio: 'inherit' });
}

// Remove .next directory
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  console.log('🗑️  Removing .next directory...');
  fs.rmSync(nextDir, { recursive: true, force: true });
}

console.log('✅ Cleanup complete!');

// Wait a moment before starting
setTimeout(() => {
  console.log('🚀 Starting development server...');
}, 2000);
