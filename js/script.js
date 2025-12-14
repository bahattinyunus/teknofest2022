// Main Script for AKITA Web Interface

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 10) {
                nav.classList.add('shadow-lg', 'bg-white/95');
                nav.classList.remove('bg-white/90');
            } else {
                nav.classList.remove('shadow-lg', 'bg-white/95');
                nav.classList.add('bg-white/90');
            }
        }
    });

    // --- Dashboard Logic (Only runs if elements exist) ---
    const logContainer = document.getElementById('log-container');
    const latDisplay = document.getElementById('lat-display');
    const longDisplay = document.getElementById('long-display');

    if (logContainer) {
        // Simulation Data
        const logs = [
            "Analysing soil composition...",
            "Weed detected: Amaranthus (Confidence: 98%)",
            "Targeting system engaged.",
            "Spraying mechanism active.",
            "Obstacle avoidance: Path clear.",
            "Updating topographical map.",
            "Battery check: Optimal.",
            "Server sync: Complete."
        ];

        // Random Log Generator
        setInterval(() => {
            if (Math.random() > 0.6) {
                const randomLog = logs[Math.floor(Math.random() * logs.length)];
                addLog(randomLog);
            }
        }, 3500);

        // Keyboard Controls
        document.addEventListener('keydown', (e) => {
            let action = '';
            switch (e.key) {
                case 'ArrowUp': action = 'Moving FORWARD'; break;
                case 'ArrowDown': action = 'Moving BACKWARD'; break;
                case 'ArrowLeft': action = 'Turning LEFT'; break;
                case 'ArrowRight': action = 'Turning RIGHT'; break;
                case ' ': action = 'EMERGENCY STOP'; break;
            }

            if (action) {
                addLog(`CMD: ${action}`, action === 'EMERGENCY STOP' ? 'text-red-500' : 'text-blue-400');

                // Simulate coordinate change on move
                if (action.includes('Moving') && latDisplay && longDisplay) {
                    updateCoordinates();
                }
            }
        });

        function addLog(message, colorClass = 'text-green-400') {
            const time = new Date().toLocaleTimeString();
            const p = document.createElement('p');
            p.className = `${colorClass} font-mono text-sm`;
            p.innerText = `[${time}] ${message}`;
            logContainer.appendChild(p);
            logContainer.scrollTop = logContainer.scrollHeight;
        }

        function updateCoordinates() {
            // Tiny random movement logic
            let lat = 40.9873 + (Math.random() - 0.5) * 0.0001;
            let long = 39.7729 + (Math.random() - 0.5) * 0.0001;

            // Assuming these IDs exist in control.html
            if (latDisplay) latDisplay.innerText = lat.toFixed(6);
            if (longDisplay) longDisplay.innerText = long.toFixed(6);
        }

        // Initial Log
        addLog("System initialized.", "text-white");
        addLog("Connected to AKITA-ROBOT-V1.", "text-white");
    }
});
