# js-text-to-Speech

## Deskripsi
Proyek ini adalah implementasi sederhana dari Text-to-Speech (TTS) menggunakan JavaScript. Aplikasi ini memungkinkan pengguna untuk mengonversi teks menjadi suara.

## Prepiew

![test](test.png)

## Importan!!
isi ke file css

```bash
:root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --accent: #ec4899;
    --glass: rgba(255, 255, 255, 0.08);
    --text-light: #f8fafc;
    --text-dark: #1e1b4b;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', system-ui, sans-serif;
    background: linear-gradient(160deg, var(--primary), var(--secondary));
    color: var(--text-light);
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 1rem;
}

.container {
    background: var(--glass);
    backdrop-filter: blur(16px) saturate(200%);
    border-radius: 1.5rem;
    padding: 2.5rem;
    width: min(95%, 640px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transform: scale(1);
    transition: transform 0.3s ease;
}

h1 {
    font-size: 2.4rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 2.5rem;
    background: linear-gradient(to right, #fff, #e0e7ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
}

h1::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: var(--accent);
    border-radius: 2px;
}

.section {
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

textarea {
    width: 100%;
    height: 140px;
    padding: 1.2rem;
    border: none;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.9);
    color: var(--text-dark);
    font-size: 1rem;
    resize: vertical;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

textarea:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    background: white;
}

.voice-select {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.9);
    color: var(--text-dark);
    font-size: 1rem;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-chevron-down' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3e%3cpath d='M6 9l6 6l6 -6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.5rem;
}

.button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--glass);
    color: var(--text-light);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.btn:hover::before {
    opacity: 1;
}

.btn-primary {
    background: var(--accent);
    color: white;
    border: none;
}

.btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.audio-player {
    width: 100%;
    margin-top: 1.5rem;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
}

.download-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    background: var(--accent);
    color: white;
    text-decoration: none;
    transition: transform 0.2s ease;
}

.download-link:hover {
    transform: translateY(-2px);
}

.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 0.5rem;
}

.recording {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.5); }
    70% { box-shadow: 0 0 0 10px rgba(236, 72, 153, 0); }
    100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
}

.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-weight: 500;
    backdrop-filter: blur(10px);
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from { transform: translate(-50%, 100%); opacity: 0; }
    to { transform: translate(-50%, 0); opacity: 1; }
}

@media (max-width: 480px) {
    .container {
        padding: 1.5rem;
        border-radius: 1rem;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    .btn {
        width: 100%;
        justify-content: center;
    }
    
    .button-group {
        flex-direction: column;
    }
}
```
