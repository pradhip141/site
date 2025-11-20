// --- 1. AUTHENTICATION LOGIC ---
function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');

    // Simple check (In real apps, this happens on a server)
    if (user === "admin" && pass === "1234") {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('app-section').classList.remove('hidden');
        errorMsg.style.display = 'none';
        // Initialize inputs for volume
        updateShapeInputs();
    } else {
        errorMsg.style.display = 'block';
    }
}

function logout() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('app-section').classList.add('hidden');
    // Clear inputs
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// --- 2. CUBE ROOT LOGIC ---
function calculateCubeRoot() {
    const val = parseFloat(document.getElementById('cbrt-input').value);
    if (isNaN(val)) {
        document.getElementById('cbrt-result').innerText = "Please enter a valid number";
    } else {
        // Math.cbrt is the JS function for cube root
        const result = Math.cbrt(val);
        document.getElementById('cbrt-result').innerText = `Result: ${result.toFixed(4)}`;
    }
}

// --- 3. VOLUME LOGIC ---

// Helper to generate input HTML
function createInputHTML(id, placeholder) {
    return `<div class="form-group"><input type="number" id="${id}" placeholder="${placeholder}"></div>`;
}

function updateShapeInputs() {
    const shape = document.getElementById('shape-select').value;
    const container = document.getElementById('input-container');
    
    let html = '';

    if (shape === 'cube') {
        html = createInputHTML('v-side', 'Side Length (a)');
    } else if (shape === 'sphere') {
        html = createInputHTML('v-radius', 'Radius (r)');
    } else if (shape === 'cylinder' || shape === 'cone') {
        html = createInputHTML('v-radius', 'Radius (r)') + 
               createInputHTML('v-height', 'Height (h)');
    }

    container.innerHTML = html;
    document.getElementById('vol-result').innerText = "Volume: -";
}

function calculateVolume() {
    const shape = document.getElementById('shape-select').value;
    let volume = 0;

    // Helper variables
    let r, h, s; 

    try {
        switch (shape) {
            case 'cube':
                s = parseFloat(document.getElementById('v-side').value);
                volume = Math.pow(s, 3); // s^3
                break;
            case 'sphere':
                r = parseFloat(document.getElementById('v-radius').value);
                volume = (4/3) * Math.PI * Math.pow(r, 3); // 4/3 * pi * r^3
                break;
            case 'cylinder':
                r = parseFloat(document.getElementById('v-radius').value);
                h = parseFloat(document.getElementById('v-height').value);
                volume = Math.PI * Math.pow(r, 2) * h; // pi * r^2 * h
                break;
            case 'cone':
                r = parseFloat(document.getElementById('v-radius').value);
                h = parseFloat(document.getElementById('v-height').value);
                volume = (1/3) * Math.PI * Math.pow(r, 2) * h; // 1/3 * pi * r^2 * h
                break;
        }

        if (isNaN(volume)) {
            document.getElementById('vol-result').innerText = "Please fill all fields correctly";
        } else {
            document.getElementById('vol-result').innerText = `Volume: ${volume.toFixed(2)} units³`;
        }

    } catch (e) {
        document.getElementById('vol-result').innerText = "Error in calculation";
    }
}
